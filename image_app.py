# =============================================================================
# image_app.py  --  Image Classifier: Flask Web Application
# =============================================================================
# PURPOSE:
#   This is the INFERENCE phase. We load the trained CNN model and use it
#   to classify new images uploaded by the user through a web form.
#
#   The CRITICAL rule for image ML:
#     Every new image MUST be preprocessed IDENTICALLY to how training
#     images were preprocessed -- same size, same normalisation.
#     If training images were 32x32 and normalised to [0,1], then every
#     image at inference time must ALSO be resized to 32x32 and divided
#     by 255. If the preprocessing differs even slightly, the model's
#     learned weights become meaningless (they were calibrated for a
#     specific input format).
#
# FLOW:
#   User uploads image -> Flask saves it -> PIL opens it -> resize to 32x32
#   -> convert to RGB -> normalize /255 -> model.predict() -> show result
# =============================================================================

import os
import uuid
import numpy as np
from flask import Flask, request, render_template, url_for
from PIL import Image

# Suppress TensorFlow INFO messages in the console
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import tensorflow as tf
from tensorflow import keras

# -----------------------------------------------------------------------------
# CONFIGURATION
# -----------------------------------------------------------------------------
IMAGE_SIZE   = 32           # Must match the size used during training exactly
MODEL_PATH   = "image_model.keras"
UPLOAD_FOLDER = os.path.join("static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}

# Class labels -- must match how labels were assigned during training:
#   model output > 0.5  => class 1 => Automobile
#   model output <= 0.5 => class 0 => Airplane
CLASS_LABELS = {0: "Airplane", 1: "Automobile"}

# -----------------------------------------------------------------------------
# STEP 1: Initialise Flask and ensure upload folder exists
# -----------------------------------------------------------------------------
app = Flask(__name__)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -----------------------------------------------------------------------------
# STEP 2: Load the trained model at startup
# -----------------------------------------------------------------------------
# WHY AT STARTUP (not inside the route)?
#   Loading a Keras model takes ~0.5 seconds. If we loaded it inside the
#   route function, every single request would pay that cost. Loading once
#   at startup means all predictions are instant.
# -----------------------------------------------------------------------------
try:
    model = keras.models.load_model(MODEL_PATH)
    print(f"[OK] Model loaded from '{MODEL_PATH}'")
    print(f"     Input shape expected: {model.input_shape}")
    print(f"     Classes: 0=Airplane, 1=Automobile")
except Exception as e:
    print(f"[ERROR] Could not load model: {e}")
    print("        Run 'python train_image.py' first.")
    model = None

# -----------------------------------------------------------------------------
# HELPER: Check that an uploaded file has an allowed image extension
# -----------------------------------------------------------------------------
def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# -----------------------------------------------------------------------------
# HELPER: Preprocess an image for the CNN
# -----------------------------------------------------------------------------
def preprocess_image(image_path):
    """
    Convert a saved image file into the exact same format the model
    was trained on. This is the single most important function in the
    Flask app -- getting this wrong invalidates all predictions.

    Steps:
    1. Open the image with PIL (handles PNG, JPEG, etc.)
    2. Convert to RGB -- removes alpha channel (transparency) that some
       PNGs have. The model was trained on 3-channel (RGB) images only.
    3. Resize to IMAGE_SIZE x IMAGE_SIZE (32x32) using LANCZOS resampling.
       LANCZOS is a high-quality downsampling filter that preserves
       visual information better than simpler methods like nearest-neighbour.
    4. Convert to a NumPy array of float32 values.
    5. Divide by 255.0 -- normalises pixel values from [0, 255] to [0.0, 1.0].
       This is IDENTICAL to what we did in train_image.py Step 4.
    6. Add a batch dimension: shape (32, 32, 3) -> (1, 32, 32, 3)
       Keras expects (batch_size, height, width, channels). Even for a
       single image, we must wrap it in a list of size 1.
    """
    img = Image.open(image_path)

    # Convert to RGB -- critical if the user uploads a PNG with transparency
    # (RGBA has 4 channels; our model only understands 3-channel RGB)
    img = img.convert("RGB")

    # Resize to the exact size the model was trained on
    img = img.resize((IMAGE_SIZE, IMAGE_SIZE), Image.LANCZOS)

    # Convert PIL Image -> NumPy array, then to float32
    img_array = np.array(img, dtype=np.float32)

    # Normalise: the model was trained on [0, 1] inputs, not [0, 255]
    img_array = img_array / 255.0

    # Add batch dimension: (32, 32, 3) -> (1, 32, 32, 3)
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

# -----------------------------------------------------------------------------
# STEP 3: Define the home route (handles GET and POST)
# -----------------------------------------------------------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    prediction  = None   # e.g. "Airplane" or "Automobile"
    confidence  = None   # e.g. 94.5 (percent)
    image_url   = None   # URL to display the uploaded image back to the user
    error       = None

    if request.method == "POST":

        # Check that a file was actually submitted
        if "image" not in request.files:
            error = "No file part in request."
        else:
            file = request.files["image"]

            if file.filename == "":
                error = "No file selected. Please choose an image."
            elif not allowed_file(file.filename):
                error = "Unsupported file type. Please upload PNG, JPG, JPEG, GIF, BMP, or WEBP."
            elif model is None:
                error = "Model not loaded. Run train_image.py first."
            else:
                try:
                    # -----------------------------------------------------------
                    # Save the uploaded file to static/uploads/ with a unique name
                    # We use uuid to prevent filename collisions between users.
                    # Saving to static/ lets Flask serve the image back to the
                    # browser using url_for('static', filename=...).
                    # -----------------------------------------------------------
                    ext      = file.filename.rsplit(".", 1)[1].lower()
                    filename = f"{uuid.uuid4().hex}.{ext}"
                    save_path = os.path.join(UPLOAD_FOLDER, filename)
                    file.save(save_path)

                    # URL the browser can use to display the image
                    image_url = url_for("static", filename=f"uploads/{filename}")

                    # -----------------------------------------------------------
                    # Preprocess: resize, convert to RGB, normalise
                    # WHY THE SAME STEPS AS TRAINING?
                    #   The CNN's weights were learned assuming inputs in the
                    #   range [0, 1] and shape (1, 32, 32, 3). If we fed it
                    #   a 1920x1080 raw image, the network would receive inputs
                    #   thousands of times larger than expected -- all its
                    #   learned thresholds become meaningless.
                    # -----------------------------------------------------------
                    img_input = preprocess_image(save_path)

                    # -----------------------------------------------------------
                    # Predict using the loaded CNN model
                    #
                    # model.predict() returns a value between 0 and 1.
                    # This is the PROBABILITY that the image is class 1 (Automobile).
                    #
                    # sigmoid output interpretation:
                    #   0.95  = 95% confident it's an Automobile
                    #   0.03  = 97% confident it's an Airplane (1 - 0.03)
                    #   0.50  = model has no idea (50/50)
                    # -----------------------------------------------------------
                    raw_output = model.predict(img_input, verbose=0)[0][0]

                    pred_class = 1 if raw_output > 0.5 else 0
                    prediction = CLASS_LABELS[pred_class]

                    # Confidence = probability of the PREDICTED class
                    conf_score = float(raw_output) if pred_class == 1 else float(1 - raw_output)
                    confidence = round(conf_score * 100, 1)

                except Exception as e:
                    error = f"Prediction error: {str(e)}"

    return render_template(
        "image.html",
        prediction=prediction,
        confidence=confidence,
        image_url=image_url,
        error=error
    )

# -----------------------------------------------------------------------------
# STEP 4: Run the development server on port 5002
# (port 5000 = house price app, port 5001 = sentiment app)
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    if model is None:
        print("\n[ERROR] Cannot start: model not loaded. Run train_image.py first.\n")
    else:
        print("\n[START] Flask server at http://127.0.0.1:5002")
        print("        Upload images from the sample_images/ folder to test.\n")
        app.run(debug=True, host="0.0.0.0", port=5002)
