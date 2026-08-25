# =============================================================================
# train_model.py  --  House Price Predictor: Training Script
# =============================================================================
# PURPOSE OF THIS FILE:
#   Machine learning works in two phases:
#     1. TRAINING  -- the model "learns" patterns from historical data
#     2. INFERENCE -- the trained model predicts prices for new houses
#
#   This script handles Phase 1. It reads our CSV, teaches a Linear Regression
#   model the relationship between house features and price, evaluates how well
#   it learned, and then saves ("pickles") the trained model to disk so the
#   Flask web app can reuse it without retraining every time a user visits.
# =============================================================================

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# -----------------------------------------------------------------------------
# STEP 1: Load the dataset
# -----------------------------------------------------------------------------
# WHY: The model learns from examples. Think of it like a student reading a
# textbook -- the CSV is the textbook. Each row = one past house sale.
# pandas reads it into a "DataFrame", which is like an in-memory spreadsheet.
# -----------------------------------------------------------------------------
df = pd.read_csv("house_data.csv")

print("=" * 60)
print("  HOUSE PRICE PREDICTOR -- MODEL TRAINING")
print("=" * 60)
print(f"\n[DATA] Dataset loaded: {len(df)} rows, {len(df.columns)} columns")
print(f"\nFirst 5 rows of data:\n{df.head()}")

# -----------------------------------------------------------------------------
# STEP 2: Separate features (X) from the target (y)
# -----------------------------------------------------------------------------
# WHY: In supervised ML, we always separate:
#   - X (features/inputs)  -> the things we KNOW about a house
#   - y (target/output)    -> the thing we WANT TO PREDICT (price)
#
# The model will learn the function:  price = f(size, bedrooms, age, distance)
# During training, it sees BOTH X and y to figure out the relationship.
# During prediction, it only receives X and must output y on its own.
# -----------------------------------------------------------------------------
feature_columns = ["size_sqft", "bedrooms", "age_years", "distance_city_km"]
target_column   = "price_lakhs"

X = df[feature_columns]   # Shape: (25 rows x 4 features)
y = df[target_column]     # Shape: (25 rows x 1 target)

print(f"\n[OK] Features (X) selected: {feature_columns}")
print(f"[OK] Target  (y) selected : '{target_column}'")

# -----------------------------------------------------------------------------
# STEP 3: Split into Training set and Test set  (the "train/test split")
# -----------------------------------------------------------------------------
# WHY: If we trained AND evaluated the model on the same data, it would be
# like letting a student see the answer key before the exam -- the score would
# look great but tell us nothing about how it performs on UNSEEN houses.
#
# The 80/20 split means:
#   - 80% (20 rows) -> training set   (model learns from these)
#   - 20%  (5 rows) -> test set       (model is evaluated on these)
#
# random_state=42 ensures the split is reproducible -- every run picks the
# same rows for train vs. test, so results are consistent.
# -----------------------------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 20% goes to test
    random_state=42     # "seed" for reproducibility
)

print(f"\n[SPLIT] Train/Test Split (80/20):")
print(f"        Training rows : {len(X_train)}")
print(f"        Testing  rows : {len(X_test)}")

# -----------------------------------------------------------------------------
# STEP 4: Create and train the model  (model.fit)
# -----------------------------------------------------------------------------
# WHY -- Linear Regression explained in plain English:
#   It tries to fit a straight-line equation of the form:
#
#   price = (w1 x size) + (w2 x bedrooms) + (w3 x age) + (w4 x distance) + b
#
#   where w1, w2, w3, w4 are "weights" (how much each feature matters)
#   and b is the "bias" (base price when all features are zero).
#
# model.fit(X_train, y_train) is where the LEARNING happens.
#   Internally, scikit-learn uses a mathematical technique called
#   "Ordinary Least Squares" (OLS) to find the best weights that
#   minimise the difference between predicted prices and actual prices
#   across all training rows. After .fit() returns, the model "knows"
#   the weights -- it has been trained.
# -----------------------------------------------------------------------------
model = LinearRegression()   # Create a blank model with no knowledge yet

print("\n[TRAIN] Training model on training data...")
model.fit(X_train, y_train)  # <-- This is where learning happens!
print("[TRAIN] Training complete.")

# -----------------------------------------------------------------------------
# STEP 5: Inspect what the model learned -- the weights (coefficients)
# -----------------------------------------------------------------------------
# WHY: The weights tell us how the model "thinks" each feature affects price.
#   A positive weight -> feature increases price (e.g. bigger house = pricier)
#   A negative weight -> feature decreases price (e.g. older house = cheaper)
#   The magnitude tells us importance (larger absolute value = bigger impact).
#
# This is one of Linear Regression's big advantages: it's interpretable.
# Unlike a black-box neural network, you can read exactly what it learned.
# -----------------------------------------------------------------------------
print("\n" + "=" * 60)
print("  LEARNED MODEL WEIGHTS (Coefficients)")
print("=" * 60)
print(f"\n{'Feature':<25} {'Weight':>12}  Interpretation")
print("-" * 60)
for feature, weight in zip(feature_columns, model.coef_):
    direction = "^ increases price" if weight > 0 else "v decreases price"
    print(f"  {feature:<23} {weight:>+10.4f}  {direction}")
print(f"\n  {'Bias (intercept)':<23} {model.intercept_:>+10.4f}  base price offset")

# -----------------------------------------------------------------------------
# STEP 6: Evaluate the model on UNSEEN test data
# -----------------------------------------------------------------------------
# WHY: We now ask the model to predict prices for the 5 test houses it has
# NEVER seen during training. We compare those predictions to the real prices.
#
# Metrics explained:
#   MAE (Mean Absolute Error)
#     -> Average error in lakhs. MAE of 3 means predictions are off by Rs.3L on average.
#     -> Lower is better. Units are the same as the target (lakhs).
#
#   R-squared (Coefficient of Determination)
#     -> How much of the price variation is explained by our features.
#     -> Range: 0 (model learns nothing) to 1.0 (perfect predictions).
#     -> R2 = 0.90 means our features explain 90% of price variation.
# -----------------------------------------------------------------------------
y_pred = model.predict(X_test)   # Ask the model to predict for test houses

mae = mean_absolute_error(y_test, y_pred)
r2  = r2_score(y_test, y_pred)

print("\n" + "=" * 60)
print("  MODEL EVALUATION ON TEST SET (unseen data)")
print("=" * 60)
print(f"\n  MAE  (Mean Absolute Error) : Rs. {mae:.2f} Lakhs")
print(f"  R2   (Coefficient of Det.) :      {r2:.4f}  ({r2*100:.1f}% variance explained)")

print("\n  Predicted vs Actual Prices (test set):")
print(f"  {'Actual (Rs.L)':<15} {'Predicted (Rs.L)':<20} {'Error (Rs.L)'}")
print("  " + "-" * 48)
for actual, predicted in zip(y_test, y_pred):
    error = predicted - actual
    print(f"  {actual:<15.1f} {predicted:<20.2f} {error:+.2f}")

# -----------------------------------------------------------------------------
# STEP 7: Save the trained model to disk
# -----------------------------------------------------------------------------
# WHY: Training a model can take seconds (for small data like ours) to hours
# (for large datasets). Once trained, we "pickle" it -- serialize the Python
# object (with all its learned weights) into a binary .pkl file.
#
# The Flask web app will load this file at startup using joblib.load().
# This means users get instant predictions without triggering a full
# retrain every time someone fills in the form.
#
# joblib is preferred over Python's built-in pickle for scikit-learn models
# because it handles large NumPy arrays more efficiently.
# -----------------------------------------------------------------------------
model_filename = "house_price_model.pkl"
joblib.dump(model, model_filename)
print(f"\n[SAVED] Model saved to '{model_filename}'")
print("        (Flask app will load this file for predictions)\n")
print("=" * 60)
print("  Training complete! Run 'python app.py' to start the web app.")
print("=" * 60)
