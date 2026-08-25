# =============================================================================
# train_image.py  --  Image Classifier: Training Script
# =============================================================================
# DATASET CHOICE: CIFAR-10 (Airplane vs Automobile)
#
# WHY CIFAR-10?
#   - Built directly into Keras: `keras.datasets.cifar10.load_data()`
#     No separate download script needed. It downloads automatically (~170 MB)
#     and caches locally. Perfect for beginners.
#   - Images are already 32x32 pixels -- tiny, so a small CNN trains in
#     minutes on a laptop CPU. Larger images (e.g. 224x224) would take hours.
#   - We use only 2 of the 10 classes (Airplane=0, Automobile=1) so the
#     problem stays simple: binary classification (yes/no for each class).
#
# WHY AIRPLANE vs AUTOMOBILE?
#   These two classes look very different (one has wings, one has wheels).
#   A small CNN can learn to tell them apart easily, giving satisfying accuracy
#   even with only 1000 training images and 5-7 epochs.
#   If we used "cat vs dog", accuracy would be lower because those shapes
#   are more similar -- not a great beginner experience.
#
# TRAINING FLOW:
#   Load data -> Filter 2 classes -> Subset for speed -> Normalize ->
#   Build CNN -> Train -> Evaluate -> Save model -> Save sample images
# =============================================================================

import os
import numpy as np

# TensorFlow/Keras: the deep learning framework we use to build and train CNNs
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Pillow: Python image library, used to save sample images for testing
from PIL import Image

# Suppress TensorFlow's verbose startup messages (INFO and WARNING)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

print("=" * 65)
print("  IMAGE CLASSIFIER -- TRAINING (CIFAR-10: Airplane vs Automobile)")
print("=" * 65)
print(f"\n  TensorFlow version: {tf.__version__}")

# =============================================================================
# STEP 1: Load the CIFAR-10 dataset
# =============================================================================
# WHY: Keras has CIFAR-10 built in. The first call downloads it (~170 MB) and
# caches it in ~/.keras/datasets/. Subsequent runs load from cache instantly.
#
# The dataset returns:
#   X_train: shape (50000, 32, 32, 3)  -- 50,000 colour images
#   y_train: shape (50000, 1)          -- integer label for each image (0-9)
#   X_test : shape (10000, 32, 32, 3)
#   y_test : shape (10000, 1)
#
# The "3" in shape means RGB: 3 colour channels (Red, Green, Blue).
# Each pixel value is an integer from 0 to 255.
# =============================================================================
print("\n[DATA] Loading CIFAR-10 dataset (downloads on first run)...")
(X_train_all, y_train_all), (X_test_all, y_test_all) = keras.datasets.cifar10.load_data()
print(f"[DATA] Full dataset -- Train: {X_train_all.shape}, Test: {X_test_all.shape}")

# Class names in CIFAR-10 (index = class number)
CIFAR10_NAMES = ["airplane", "automobile", "bird", "cat", "deer",
                 "dog", "frog", "horse", "ship", "truck"]

# The two classes we care about: airplane (0) and automobile (1)
CLASS_A_IDX  = 0   # airplane
CLASS_B_IDX  = 1   # automobile
CLASS_LABELS = {0: "Airplane", 1: "Automobile"}

# =============================================================================
# STEP 2: Filter to keep only our 2 chosen classes
# =============================================================================
# WHY: CIFAR-10 has 10 classes but we only want 2. We select rows where
# the label is 0 (airplane) OR 1 (automobile), and remap them:
#   original label 0 (airplane)    -> our label 0
#   original label 1 (automobile)  -> our label 1
# This keeps the problem simple and training fast.
# =============================================================================
def filter_two_classes(X, y, class_a, class_b):
    """Keep only rows belonging to class_a or class_b, remap to 0/1."""
    y_flat = y.flatten()
    mask = (y_flat == class_a) | (y_flat == class_b)
    X_out = X[mask]
    y_out = (y_flat[mask] == class_b).astype(np.int32)
    # y_out is 0 for class_a, 1 for class_b
    return X_out, y_out

X_train_2cls, y_train_2cls = filter_two_classes(
    X_train_all, y_train_all, CLASS_A_IDX, CLASS_B_IDX
)
X_test_2cls, y_test_2cls = filter_two_classes(
    X_test_all, y_test_all, CLASS_A_IDX, CLASS_B_IDX
)
print(f"\n[FILTER] Kept 2 classes -- Train: {X_train_2cls.shape}, Test: {X_test_2cls.shape}")

# =============================================================================
# STEP 3: Take a subset for fast CPU training
# =============================================================================
# WHY: The full filtered set has ~10,000 training images per class.
# Training all of them on a CPU would take 30+ minutes per epoch.
# We take 400 per class (800 total) for training and 150 per class (300) for
# testing. This trains in under 5 minutes while still being enough to learn.
#
# In real projects, you would use ALL the data (or add more data with
# augmentation). Subsampling is just to keep this beginner-friendly and fast.
# =============================================================================
N_TRAIN_PER_CLASS = 400   # 400 airplanes + 400 automobiles = 800 training
N_TEST_PER_CLASS  = 150   # 150 + 150 = 300 test images

def balanced_subset(X, y, n_per_class):
    """Pick equal numbers of class-0 and class-1 samples."""
    idx0 = np.where(y == 0)[0][:n_per_class]
    idx1 = np.where(y == 1)[0][:n_per_class]
    idx  = np.concatenate([idx0, idx1])
    np.random.shuffle(idx)
    return X[idx], y[idx]

np.random.seed(42)
X_train, y_train = balanced_subset(X_train_2cls, y_train_2cls, N_TRAIN_PER_CLASS)
X_test,  y_test  = balanced_subset(X_test_2cls,  y_test_2cls,  N_TEST_PER_CLASS)

print(f"[SUBSET] Training: {len(X_train)} images | Test: {len(X_test)} images")
print(f"         {np.sum(y_train==0)} airplanes + {np.sum(y_train==1)} automobiles (train)")

# =============================================================================
# STEP 4: Normalize pixel values from [0, 255] to [0.0, 1.0]
# =============================================================================
# WHY NORMALIZE?
#   Raw pixel values are integers from 0 (black) to 255 (brightest).
#   Neural networks learn much faster and more stably when inputs are
#   SMALL numbers close to zero (e.g. 0.0 to 1.0).
#
#   Reason: the network initialises its weights as small random numbers.
#   If inputs are 0-255 and weights are 0.01, the product (weight * input)
#   is already huge before any learning even starts -- the gradients
#   that guide learning become very large and unstable (a problem called
#   "exploding gradients").
#
#   Dividing by 255.0 maps every pixel to the range [0, 1] while
#   preserving the relative brightness relationships between pixels.
#   This is the simplest and most common normalisation for images.
# =============================================================================
X_train = X_train.astype("float32") / 255.0
X_test  = X_test.astype("float32")  / 255.0

print(f"\n[NORM] Pixel values normalised: [0, 255] -> [0.0, 1.0]")
print(f"       Input shape: {X_train.shape}  (samples, height, width, channels)")

# =============================================================================
# STEP 5: Build the Convolutional Neural Network (CNN)
# =============================================================================
# WHY A CNN (not a regular Dense network)?
#   A regular "Dense" (fully connected) layer treats every pixel independently.
#   It has no idea that adjacent pixels form edges, corners, and shapes.
#
#   A CONVOLUTIONAL LAYER slides a small filter (e.g. 3x3 pixels) across
#   the image. At each position it asks: "does this patch of 9 pixels look
#   like the pattern this filter is looking for?"
#
#   The FIRST conv layer learns low-level features: edges, colour gradients.
#   The SECOND conv layer looks at the OUTPUT of layer 1 -- it learns to
#   recognise shapes made of edges (corners, curves, textures).
#   Deeper layers learn higher-level concepts: "wheel shape", "wing shape".
#
#   Crucially, a filter learned to detect a horizontal edge ANYWHERE in the
#   image -- this property is called "translational invariance" and is why
#   CNNs are so good at images.
#
# ARCHITECTURE:
#   Input: (32, 32, 3) image
#     |
#   Conv2D(32 filters, 3x3) + ReLU  <- learns 32 basic feature detectors
#     |
#   MaxPooling2D(2x2)               <- halves the spatial size: 32x32 -> 16x16
#     |
#   Conv2D(64 filters, 3x3) + ReLU  <- learns 64 higher-level features
#     |
#   MaxPooling2D(2x2)               <- 16x16 -> 8x8
#     |
#   Flatten()                       <- convert 2D feature maps to 1D vector
#     |
#   Dense(64) + ReLU                <- combine all features
#     |
#   Dense(1) + Sigmoid              <- output: probability it is an Automobile
#                                      > 0.5 = Automobile, <= 0.5 = Airplane
#
# WHAT IS MaxPooling?
#   Takes the MAXIMUM value from each 2x2 window. This:
#   1. Reduces spatial size (fewer numbers to process = faster training)
#   2. Makes the network slightly robust to small positional shifts
#      (a wheel shifted 1 pixel is still detected as a wheel)
#
# WHAT IS ReLU?
#   Rectified Linear Unit: f(x) = max(0, x)
#   It's the "activation function" -- introduces non-linearity so the
#   network can learn complex patterns (a purely linear network can only
#   learn linear relationships, no matter how deep it is).
# =============================================================================
IMAGE_SIZE = 32   # CIFAR-10 images are 32x32 pixels

model = keras.Sequential([
    # --- Block 1: First convolutional block ---
    # 32 filters, each 3x3 pixels. 'same' padding keeps output the same size.
    layers.Conv2D(32, (3, 3), activation="relu", padding="same",
                  input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3),
                  name="conv1"),
    # MaxPool: each 2x2 region -> 1 value (the max). Output: 16x16x32
    layers.MaxPooling2D((2, 2), name="pool1"),

    # --- Block 2: Second convolutional block ---
    # 64 filters now. The network looks for more complex patterns.
    layers.Conv2D(64, (3, 3), activation="relu", padding="same", name="conv2"),
    # MaxPool again. Output: 8x8x64
    layers.MaxPooling2D((2, 2), name="pool2"),

    # --- Transition to classification ---
    # Flatten converts 8x8x64 = 4096 values into a 1D vector of 4096 numbers
    layers.Flatten(name="flatten"),

    # Dropout randomly sets 30% of neurons to 0 during training.
    # WHY: forces the network to not rely on any single neuron -- a form of
    # regularisation that reduces overfitting (memorising training data).
    layers.Dropout(0.3, name="dropout"),

    # Dense layer: 64 neurons, each connected to all 4096 flattened values
    layers.Dense(64, activation="relu", name="dense1"),

    # Output: 1 neuron with Sigmoid activation -> probability of "Automobile"
    # Sigmoid maps any value to [0, 1] so it can be read as a probability.
    layers.Dense(1, activation="sigmoid", name="output")
], name="airplane_vs_automobile_cnn")

model.summary()

# =============================================================================
# STEP 6: Compile the model
# =============================================================================
# WHY COMPILE?
#   Before training, we must specify:
#
#   optimizer='adam'
#     Adam is an algorithm that adjusts the model's weights after each
#     batch of images. It uses calculus (gradient descent) to figure out
#     which direction to nudge each weight to reduce the error.
#     Adam is the most popular optimiser because it adapts its learning
#     rate automatically -- beginner-friendly and works well by default.
#
#   loss='binary_crossentropy'
#     The LOSS function measures how wrong the model's predictions are.
#     Binary crossentropy is the standard loss for 2-class problems.
#     It penalises confident wrong predictions very heavily (e.g. 99%
#     confident the wrong class) and less for uncertain ones.
#     Training = minimising this loss over all training images.
#
#   metrics=['accuracy']
#     Accuracy = (correct predictions / total predictions).
#     This is what gets printed after each epoch so you can see progress.
# =============================================================================
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

# =============================================================================
# STEP 7: Train the model
# =============================================================================
# WHAT IS AN EPOCH?
#   One EPOCH = the model has seen EVERY training image exactly once.
#   After seeing all images, it updates its weights, then starts the next epoch.
#
#   With 800 training images and batch_size=32:
#     800 / 32 = 25 BATCHES per epoch
#     Each batch: model sees 32 images, computes predictions, computes error,
#     updates weights using Adam. Then next batch, and so on.
#
#   WHY MULTIPLE EPOCHS?
#     After 1 pass through the data, the model has only partially learned.
#     Like a student reading a textbook once vs. rereading it 7 times --
#     more passes means more refined understanding.
#
#   WHAT IS "val_accuracy" IN THE OUTPUT?
#     After each epoch, Keras evaluates the model on the TEST set (we pass
#     it as "validation_data"). This tells us accuracy on images the model
#     has NEVER seen during training -- the true measure of learning.
#
#   WHAT SHOULD YOU EXPECT TO SEE?
#     Early epochs: accuracy ~55-65% (barely better than guessing)
#     Later epochs: accuracy climbs to ~85-95% (the model is learning!)
#     If accuracy stays at 50%, the model has not learned anything.
# =============================================================================
EPOCHS     = 8
BATCH_SIZE = 32

print(f"\n[TRAIN] Starting training: {EPOCHS} epochs, batch size {BATCH_SIZE}")
print(f"        {len(X_train)} training images | {len(X_test)} validation images")
print(f"        Classes: 0=Airplane, 1=Automobile\n")

history = model.fit(
    X_train, y_train,
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    validation_data=(X_test, y_test),
    verbose=1    # prints one line per epoch
)

# =============================================================================
# STEP 8: Evaluate on the test set
# =============================================================================
# WHY EVALUATE SEPARATELY?
#   model.fit() already shows val_accuracy after each epoch, but it is
#   computed mid-training. This final evaluate() call is the clean, official
#   measurement on the full test set after all training is done.
# =============================================================================
print("\n" + "=" * 65)
print("  FINAL EVALUATION ON TEST SET")
print("=" * 65)
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\n  Test Accuracy : {test_acc*100:.2f}%")
print(f"  Test Loss     : {test_loss:.4f}")

# Show a few individual predictions
print("\n  Sample Predictions (first 8 test images):")
print(f"  {'True Label':<15} {'Predicted':<15} {'Confidence'}")
print("  " + "-" * 48)
preds = model.predict(X_test[:8], verbose=0).flatten()
for i in range(8):
    pred_class = 1 if preds[i] > 0.5 else 0
    conf = preds[i] if pred_class == 1 else 1 - preds[i]
    true_name = CLASS_LABELS[y_test[i]]
    pred_name = CLASS_LABELS[pred_class]
    match = "OK" if pred_class == y_test[i] else "WRONG"
    print(f"  {true_name:<15} {pred_name:<15} {conf*100:.1f}%   [{match}]")

# =============================================================================
# STEP 9: Save the trained model
# =============================================================================
# WHY SAVE?
#   Training took minutes. We don't want to retrain every time the Flask app
#   restarts. Saving to disk means we "freeze" the learned weights and can
#   reload them instantly.
#
# FORMAT: .keras (modern Keras native format, TF 2.12+)
#         If you see an error, change to model.save("image_model.h5")
# =============================================================================
MODEL_PATH = "image_model.keras"
model.save(MODEL_PATH)
print(f"\n[SAVED] Model saved to '{MODEL_PATH}'")

# =============================================================================
# STEP 10: Save sample test images for manual testing in the Flask app
# =============================================================================
# We save a few test images as PNG files so the user can immediately
# upload them to the web app to verify predictions.
# =============================================================================
os.makedirs("sample_images", exist_ok=True)
# Denormalise back to [0, 255] for saving as image files
X_test_uint8 = (X_test * 255).astype(np.uint8)
saved = 0
for i in range(len(X_test)):
    if saved >= 4:
        break
    label_name = CLASS_LABELS[y_test[i]]
    # Save 2 airplanes and 2 automobiles
    if (label_name == "Airplane"    and saved < 2) or \
       (label_name == "Automobile"  and saved >= 2):
        img_path = f"sample_images/{label_name}_{saved}.png"
        Image.fromarray(X_test_uint8[i]).save(img_path)
        saved += 1

# Save at least one of each
for label_idx, label_name in CLASS_LABELS.items():
    for i in range(len(X_test)):
        if y_test[i] == label_idx:
            img_path = f"sample_images/sample_{label_name}.png"
            Image.fromarray(X_test_uint8[i]).save(img_path)
            print(f"[SAMPLE] Saved {img_path}  <-- upload this to the web app!")
            break

print("\n" + "=" * 65)
print("  Training complete! Run 'python image_app.py' to start")
print("  the web app, then upload images from sample_images/ to test.")
print("=" * 65)
