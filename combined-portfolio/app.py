# =============================================================================
# app.py  --  Combined ML Project Portfolio
# =============================================================================
# This application combines all three machine learning tasks into a single
# responsive Flask website. It loads all three models once at startup to keep
# predictions extremely fast and handles routes for each demo independently.
# =============================================================================

import os
import uuid
import logging
import numpy as np
import pandas as pd
import joblib
from flask import Flask, request, render_template, url_for
from PIL import Image

# Suppress TensorFlow INFO messages in console
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# Configure structured logging so Render's log panel shows clear messages
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

# ── Flask Application Setup ──────────────────────────────────────────────────
app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(app.root_path, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =============================================================================
# MODEL 1: House Price Predictor (California Housing)
# =============================================================================
# Loads the trained Random Forest regressor and the fitted StandardScaler.
# We also import feature engineering utilities from house_model_utils.py.
# =============================================================================
from house_model_utils import FEATURE_COLS, ALL_FEATURE_COLS, engineer_features

HOUSE_MODEL_PATH = os.path.join(app.root_path, "models", "advanced_house_model.pkl")
house_model = None
house_scaler = None
house_model_name = "Unavailable"

try:
    if os.path.exists(HOUSE_MODEL_PATH):
        house_bundle = joblib.load(HOUSE_MODEL_PATH)
        house_model = house_bundle["model"]
        house_scaler = house_bundle["scaler"]
        house_model_name = type(house_model).__name__
        logger.info(f"[LOADED] House model: {house_model_name}")
    else:
        logger.warning(f"[WARNING] House model not found at {HOUSE_MODEL_PATH}")
except Exception as e:
    logger.error(f"[ERROR] Failed to load house model: {e}", exc_info=True)


# =============================================================================
# MODEL 2: Sentiment Classifier (Logistic Regression)
# =============================================================================
# Loads the TF-IDF Vectorizer and the Logistic Regression classifier.
# =============================================================================
SENTIMENT_MODEL_PATH = os.path.join(app.root_path, "models", "sentiment_model.pkl")
VECTORIZER_PATH = os.path.join(app.root_path, "models", "vectorizer.pkl")
sentiment_model = None
sentiment_vectorizer = None

try:
    if os.path.exists(SENTIMENT_MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        sentiment_model = joblib.load(SENTIMENT_MODEL_PATH)
        sentiment_vectorizer = joblib.load(VECTORIZER_PATH)
        logger.info("[LOADED] Sentiment model and vectorizer loaded successfully")
    else:
        logger.warning("[WARNING] Sentiment model or vectorizer not found in models/")
except Exception as e:
    logger.error(f"[ERROR] Failed to load sentiment model: {e}", exc_info=True)


# =============================================================================
# MODEL 3: Image Classifier (Convolutional Neural Network)
# =============================================================================
# Lazy-load TensorFlow to avoid slowing down Flask startup unnecessarily.
# Loads the Keras convolutional neural network.
# =============================================================================
IMAGE_MODEL_PATH = os.path.join(app.root_path, "models", "image_model.keras")
image_model = None
CLASS_LABELS = {0: "Airplane", 1: "Automobile"}
IMAGE_SIZE = 32

def load_image_model():
    global image_model
    if image_model is not None:
        return True
    try:
        if os.path.exists(IMAGE_MODEL_PATH):
            logger.info("[IMAGE] TensorFlow import starting — this may take 10-30 seconds...")
            import tensorflow as tf
            from tensorflow import keras
            image_model = keras.models.load_model(IMAGE_MODEL_PATH)
            logger.info("[LOADED] Image CNN model loaded successfully")
            return True
        else:
            logger.warning(f"[WARNING] Image model not found at {IMAGE_MODEL_PATH}")
            return False
    except Exception as e:
        logger.error(f"[ERROR] Failed to load image model: {e}", exc_info=True)
        return False


# =============================================================================
# ── ROUTE 1: Home Landing Page ───────────────────────────────────────────────
# =============================================================================
@app.route("/")
def home():
    return render_template("home.html")


# =============================================================================
# ── ROUTE 2: House Price Predictor Route (California Housing) ────────────────
# =============================================================================
@app.route("/house-price", methods=["GET", "POST"])
def house_price():
    prediction = None
    error = None

    # Sensible default values (median CA census block parameters)
    defaults = {
        "MedInc":     "3.87",
        "HouseAge":   "28.0",
        "AveRooms":   "5.43",
        "AveBedrms":  "1.10",
        "Population": "1425",
        "AveOccup":   "2.88",
        "Latitude":   "35.63",
        "Longitude":  "-119.57",
    }

    if request.method == "POST":
        if house_model is None or house_scaler is None:
            error = "House prediction model is not loaded."
        else:
            try:
                logger.info("[HOUSE] Prediction request received")
                # 1. Parse form inputs
                raw = {}
                for col in FEATURE_COLS:
                    raw[col] = float(request.form.get(col, 0))

                # 2. Build single-row DataFrame and perform feature engineering
                input_df = pd.DataFrame([raw])
                input_df = engineer_features(input_df)

                # 3. Apply the fitted StandardScaler
                X = input_df[ALL_FEATURE_COLS].values
                X_scaled = house_scaler.transform(X)

                # 4. Infer using our trained model
                pred_100k = house_model.predict(X_scaled)[0]
                pred_100k = max(0.5, pred_100k)   # Floor prediction at $50,000
                pred_usd = pred_100k * 100_000
                logger.info(f"[HOUSE] Prediction successful: ${pred_usd:,.0f}")

                prediction = {
                    "dollars": f"${pred_usd:,.0f}",
                    "lakhs": f"{pred_usd / 100_000:.2f} ($100k units)",
                    "model": house_model_name,
                    "raw": pred_100k,
                }
                defaults = {col: request.form.get(col, defaults[col]) for col in FEATURE_COLS}

            except ValueError as e:
                error = f"Invalid input: {e}. Please ensure all entries are numbers."
                logger.warning(f"[HOUSE] ValueError: {e}")
            except Exception as e:
                logger.error(f"[HOUSE] Unexpected prediction error: {e}", exc_info=True)
                error = f"Prediction error: {str(e)}"

    return render_template(
        "house_price.html",
        prediction=prediction,
        error=error,
        defaults=defaults,
        model_name=house_model_name
    )


# =============================================================================
# ── ROUTE 3: Sentiment Classifier Route ──────────────────────────────────────
# =============================================================================
@app.route("/sentiment", methods=["GET", "POST"])
def sentiment():
    prediction = None
    confidence = None
    user_text = ""
    error = None

    if request.method == "POST":
        user_text = request.form.get("user_text", "").strip()

        if not user_text:
            error = "Please enter a sentence to analyze."
        elif sentiment_model is None or sentiment_vectorizer is None:
            error = "Sentiment classification model is not loaded."
        else:
            try:
                logger.info(f"[SENTIMENT] Classifying text of length {len(user_text)}")
                # 1. Transform input text using the vocabulary learned during training
                text_vector = sentiment_vectorizer.transform([user_text])

                # 2. Infer label and probabilities
                raw_label = sentiment_model.predict(text_vector)[0]
                probas = sentiment_model.predict_proba(text_vector)[0]

                pos_class_index = list(sentiment_model.classes_).index("positive")
                prob_positive = probas[pos_class_index]
                prob_negative = 1 - prob_positive

                prediction = "Positive" if raw_label == "positive" else "Negative"
                conf_score = prob_positive if raw_label == "positive" else prob_negative
                confidence = round(conf_score * 100, 1)
                logger.info(f"[SENTIMENT] Result: {prediction} ({confidence}%)")

            except Exception as e:
                logger.error(f"[SENTIMENT] Classification error: {e}", exc_info=True)
                error = f"Classification error: {str(e)}"

    return render_template(
        "sentiment.html",
        prediction=prediction,
        confidence=confidence,
        user_text=user_text,
        error=error
    )


# =============================================================================
# ── ROUTE 4: Image Classifier Route ──────────────────────────────────────────
# =============================================================================
def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((IMAGE_SIZE, IMAGE_SIZE), Image.LANCZOS)
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route("/image-classifier", methods=["GET", "POST"])
def image_classifier():
    prediction = None
    confidence = None
    image_url = None
    error = None

    # Do NOT load the TensorFlow model on every GET request.
    # Only attempt to load it when the user actually submits an image (POST).
    # This prevents the gunicorn worker from timing out during normal page loads.
    model_loaded = (image_model is not None)  # Quick check — no I/O

    if request.method == "POST":
        if "image" not in request.files:
            error = "No file uploaded."
        else:
            file = request.files["image"]

            if file.filename == "":
                error = "No image selected. Please choose a file."
            elif not allowed_file(file.filename):
                error = "Unsupported image format. Please upload PNG, JPG, JPEG, BMP or WEBP."
            else:
                # Lazy-load TensorFlow only when a POST with an image arrives.
                # This defers the 10-30s TF import cost to the FIRST prediction,
                # instead of blocking every server startup or page load.
                if not model_loaded:
                    logger.info("[IMAGE] First POST received — triggering lazy model load")
                    model_loaded = load_image_model()

                if not model_loaded:
                    error = "CNN Classifier model could not be loaded. Check server logs."
                else:
                    try:
                        logger.info(f"[IMAGE] Processing uploaded file: {file.filename}")
                        # Save uploaded file with unique filename to prevent namespace collision
                        ext = file.filename.rsplit(".", 1)[1].lower()
                        filename = f"{uuid.uuid4().hex}.{ext}"
                        save_path = os.path.join(UPLOAD_FOLDER, filename)
                        file.save(save_path)

                        image_url = url_for("static", filename=f"uploads/{filename}")

                        # Preprocess and predict
                        img_input = preprocess_image(save_path)
                        raw_output = image_model.predict(img_input, verbose=0)[0][0]

                        pred_class = 1 if raw_output > 0.5 else 0
                        prediction = CLASS_LABELS[pred_class]

                        # Confidence represents certainty in predicted class
                        conf_score = float(raw_output) if pred_class == 1 else float(1 - raw_output)
                        confidence = round(conf_score * 100, 1)
                        logger.info(f"[IMAGE] Prediction: {prediction} ({confidence}%)")

                    except Exception as e:
                        logger.error(f"[IMAGE] Prediction error: {e}", exc_info=True)
                        error = f"Prediction error: {str(e)}"

    return render_template(
        "image_classifier.html",
        prediction=prediction,
        confidence=confidence,
        image_url=image_url,
        error=error
    )


# ── Run Development Server ───────────────────────────────────────────────────
if __name__ == "__main__":
    # Do NOT pre-warm the image model here — let it load lazily on first POST.
    # Pre-warming would block Flask startup for 10-30s on every dev restart.
    logger.info("[START] Combined ML Portfolio starting on http://127.0.0.1:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
