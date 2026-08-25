# =============================================================================
# app.py  --  House Price Predictor (Advanced Model: California Housing)
# =============================================================================
# This Flask app uses the advanced model (advanced_house_model.pkl)
# trained on the real California Housing dataset (20,640 rows).
#
# The model expects 8 input features (the same 8 columns from the dataset),
# then internally adds 2 derived features (via house_model_utils.engineer_features)
# before scaling and predicting.
#
# PREPROCESSING RULE:
#   New inputs MUST go through the SAME feature engineering + StandardScaler
#   as training. We load both the trained model AND the fitted scaler from
#   the saved bundle, and import engineer_features from house_model_utils.
# =============================================================================

import numpy as np
import pandas as pd
from flask import Flask, request, render_template
import joblib
import os

from house_model_utils import FEATURE_COLS, ALL_FEATURE_COLS, engineer_features

# ── Load the model bundle ─────────────────────────────────────────────────────
MODEL_PATH = "advanced_house_model.pkl"
model  = None
scaler = None
model_name = "Unknown"

try:
    bundle     = joblib.load(MODEL_PATH)
    model      = bundle["model"]
    scaler     = bundle["scaler"]
    model_name = type(model).__name__
    print(f"[OK] Model loaded: {model_name}")
    print(f"     Input features: {ALL_FEATURE_COLS}")
except FileNotFoundError:
    print(f"[ERROR] {MODEL_PATH} not found. Run train_advanced.py first.")
except Exception as e:
    print(f"[ERROR] Failed to load model: {e}")

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None
    error      = None

    # Sensible default values shown in the form (median California block values)
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
        if model is None:
            error = "Model not loaded. Run python train_advanced.py first."
        else:
            try:
                # ── Parse form inputs ─────────────────────────────────────────
                raw = {}
                for col in FEATURE_COLS:
                    raw[col] = float(request.form.get(col, 0))

                # ── Feature engineering (IDENTICAL to training) ───────────────
                # Build a single-row DataFrame with the 8 raw features,
                # then call engineer_features() to add bedrooms_per_room and
                # income_per_room -- the same 2 derived columns added during training.
                input_df = pd.DataFrame([raw])
                input_df = engineer_features(input_df)

                # ── Scale (using the SAME scaler fitted on training data) ──────
                X = input_df[ALL_FEATURE_COLS].values
                X_scaled = scaler.transform(X)

                # ── Predict ───────────────────────────────────────────────────
                # Model output is in units of $100,000 (same as training target)
                pred_100k  = model.predict(X_scaled)[0]
                pred_100k  = max(0.5, pred_100k)   # floor at $50k (sanity check)
                pred_usd   = pred_100k * 100_000    # convert to dollars

                prediction = {
                    "dollars":   f"${pred_usd:,.0f}",
                    "lakhs":     f"{pred_usd / 100_000:.2f} ($100k units)",
                    "model":     model_name,
                    "raw":       pred_100k,
                }
                defaults = {col: request.form.get(col, defaults[col]) for col in FEATURE_COLS}

            except ValueError as e:
                error = f"Invalid input: {e}. Please enter numeric values for all fields."
            except Exception as e:
                error = f"Prediction error: {str(e)}"

    return render_template(
        "index.html",
        prediction=prediction,
        error=error,
        defaults=defaults,
        model_name=model_name,
    )


if __name__ == "__main__":
    if model is None:
        print("\n[ERROR] Cannot start: model not loaded. Run train_advanced.py first.\n")
    else:
        print(f"\n[START] Flask server at http://127.0.0.1:5000")
        print(f"        Model: {model_name} from {MODEL_PATH}\n")
        app.run(debug=True, host="0.0.0.0", port=5000)
