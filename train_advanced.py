# =============================================================================
# train_advanced.py  --  Advanced House Price Model Training
# =============================================================================
# OVERVIEW OF THIS SCRIPT:
#
#   1. Load California Housing data (20,640 rows)
#   2. Feature engineering -- add 2 derived columns
#   3. Train/test split (80/20)
#   4. Scale features (StandardScaler)
#   5. Compare 3 models using 5-fold cross-validation
#   6. Tune the winner with RandomizedSearchCV
#   7. Print feature importances
#   8. Save best model
#
# ESTIMATED RUNTIME: 8-15 minutes (depending on CPU speed)
# All steps use n_jobs=-1 (all available CPU cores) to maximise speed.
# =============================================================================

import time
import warnings
import numpy as np
import pandas as pd
import joblib

from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import (
    train_test_split, cross_val_score, RandomizedSearchCV
)
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

from house_model_utils import FEATURE_COLS, ALL_FEATURE_COLS, engineer_features

warnings.filterwarnings("ignore")

START_TIME = time.time()

print("=" * 68)
print("  ADVANCED HOUSE PRICE MODEL -- TRAINING PIPELINE")
print("=" * 68)

# =============================================================================
# STEP 1: Load data and apply feature engineering
# =============================================================================
print("\n[STEP 1] Loading California Housing dataset...")
housing = fetch_california_housing(as_frame=True)
df = housing.frame.copy()
TARGET = "MedHouseVal"

print(f"         {len(df):,} rows loaded. Features: {list(df.columns[:-1])}")

# Apply feature engineering (adds 2 derived columns, defined in house_model_utils)
# WHY HERE? We engineer features BEFORE splitting into train/test. That is fine
# for deterministic transformations (ratios, sums) that don't "learn" from data.
# Only data-dependent transformations like StandardScaler MUST be fit on
# training data only (covered below).
df = engineer_features(df)

print(f"         After engineering: {len(ALL_FEATURE_COLS)} features "
      f"({len(FEATURE_COLS)} original + 2 derived)")
print(f"         Derived: bedrooms_per_room, income_per_room")

X = df[ALL_FEATURE_COLS].values
y = df[TARGET].values

# =============================================================================
# STEP 2: Train / test split (80% / 20%)
# =============================================================================
# WHY SPLIT AT ALL?
#   We need to measure how the model performs on DATA IT HAS NEVER SEEN.
#   If we evaluated on the training data, the model could score 100% just
#   by memorising all 20,640 answers -- this is called OVERFITTING and is
#   useless for real-world predictions.
#
#   The TEST SET is data the model never touches during training. Its score
#   represents what we'd expect from the model on new, unseen houses.
#
#   random_state=42 ensures the split is reproducible -- run this script
#   10 times and you always get the same train/test split.
# =============================================================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"\n[STEP 2] Train/Test Split:")
print(f"         Train: {len(X_train):,} rows  |  Test: {len(X_test):,} rows")

# =============================================================================
# STEP 3: Feature scaling with StandardScaler
# =============================================================================
# WHY SCALE?
#   California Housing features have very different scales:
#     MedInc    : 0.5 to 15
#     Population: 3 to 35,682
#
#   For Linear Regression, this is catastrophic -- the optimizer treats
#   Population as 35,682x more "important" than MedInc just because its
#   numbers are bigger.
#
#   StandardScaler transforms each feature to have:
#     mean = 0
#     standard deviation = 1
#   So every feature is on the same scale and the model can compare them fairly.
#
#   CRITICAL RULE -- FIT ONLY ON TRAINING DATA:
#   We call scaler.fit_transform(X_train) -- this LEARNS the mean/std from
#   the training set, then applies the transformation.
#   We call scaler.transform(X_test) -- this applies the SAME transformation
#   (same mean/std from training) without re-learning.
#
#   If we fit on X_test too, we would be "leaking" test information into
#   the training process -- a subtle but serious mistake called DATA LEAKAGE
#   that gives falsely optimistic test scores.
# =============================================================================
scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)
print(f"\n[STEP 3] Features scaled with StandardScaler")
print(f"         (fit on training data only -- no data leakage)")

# =============================================================================
# STEP 4: Define 3 models for comparison
# =============================================================================
# MODEL DESCRIPTIONS:
#
# 1. LinearRegression
#    The simplest model: fits a straight line/plane to the data.
#    Fast, interpretable, but assumes a LINEAR relationship between features
#    and target. House prices are non-linear (location, income interact in
#    complex ways), so this model will underperform but serves as a BASELINE.
#
# 2. RandomForestRegressor
#    An ENSEMBLE of many decision trees (default: 100 trees).
#    Each tree learns from a random subset of the data and features.
#    The final prediction is the AVERAGE of all trees' predictions.
#    "Wisdom of crowds" -- individual trees overfit, but their average doesn't.
#    Handles non-linearity and feature interactions automatically.
#    Robust to outliers. One of the most reliable models in practice.
#
# 3. GradientBoostingRegressor
#    Another ensemble of trees, but built SEQUENTIALLY.
#    Each new tree focuses on correcting the MISTAKES of all previous trees.
#    Typically achieves the highest accuracy on tabular data.
#    Slower to train than Random Forest (sequential = can't parallelise trees).
#    More sensitive to hyperparameters (needs careful tuning).
#    The family behind XGBoost, LightGBM -- the dominant models in Kaggle.
# =============================================================================
models = {
    "LinearRegression":         LinearRegression(),
    "RandomForestRegressor":    RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
    "GradientBoostingRegressor":GradientBoostingRegressor(n_estimators=100, random_state=42),
}

# =============================================================================
# STEP 5: 5-fold Cross-Validation for all 3 models
# =============================================================================
# WHAT IS CROSS-VALIDATION (CV)?
#
#   A single 80/20 train/test split has a problem: what if by random chance,
#   the test set happened to contain only "easy" or "hard" examples? The score
#   would not represent the model's true ability.
#
#   5-fold cross-validation solves this by:
#   1. Split the training data into 5 equal "folds" (blocks)
#   2. Train the model 5 times, each time using 4 folds for training and
#      the remaining 1 fold for validation
#   3. Report the AVERAGE of all 5 validation scores
#
#   This gives a much more stable and trustworthy accuracy estimate because
#   every training sample gets to be in the validation set exactly once.
#
#   WHY NOT ALWAYS USE CV?
#   CV trains the model k times (5 here), so it is k-times slower.
#   For large datasets or slow models, CV can take hours. We use it here
#   to demonstrate best practice -- in production, you balance this trade-off.
#
#   SCORING METRICS:
#   R2  (R-squared): How much of the price variation does the model explain?
#       R2=1.0 = perfect  |  R2=0.0 = no better than always predicting the mean
#       Negative R2 = the model is WORSE than a constant baseline
#
#   MAE (Mean Absolute Error): On average, how far off is each prediction?
#       MAE is in the same units as the target (here: $100,000 units)
#       MAE=0.35 means the typical prediction error is $35,000 -- very concrete!
# =============================================================================
print("\n" + "=" * 68)
print("  STEP 5: 5-FOLD CROSS-VALIDATION COMPARISON")
print("=" * 68)
print("\n  Training and evaluating 3 models -- this may take a few minutes...\n")

cv_results = {}
test_results = {}

for name, model in models.items():
    t0 = time.time()
    print(f"  [{name}]")

    # CV on SCALED training data (5 folds)
    cv_r2  = cross_val_score(model, X_train_sc, y_train, cv=5,
                              scoring="r2", n_jobs=-1)
    cv_mae = cross_val_score(model, X_train_sc, y_train, cv=5,
                              scoring="neg_mean_absolute_error", n_jobs=-1)

    # Train on full training set and evaluate on hold-out test set
    model.fit(X_train_sc, y_train)
    y_pred = model.predict(X_test_sc)
    test_r2  = r2_score(y_test, y_pred)
    test_mae = mean_absolute_error(y_test, y_pred)

    elapsed = time.time() - t0
    cv_results[name]   = {"cv_r2": cv_r2.mean(), "cv_mae": -cv_mae.mean()}
    test_results[name] = {"test_r2": test_r2, "test_mae": test_mae}

    print(f"    CV R2  : {cv_r2.mean():.4f} (+/- {cv_r2.std():.4f})")
    print(f"    CV MAE : {-cv_mae.mean():.4f} (${-cv_mae.mean()*100:.0f}k avg error)")
    print(f"    Test R2: {test_r2:.4f}   Test MAE: {test_mae:.4f}")
    print(f"    Time   : {elapsed:.1f}s\n")

# Print comparison table
print("\n" + "=" * 68)
print("  MODEL COMPARISON TABLE")
print("=" * 68)
print(f"  {'Model':<30} {'CV R2':>8} {'CV MAE':>9} {'Test R2':>9} {'Test MAE':>10}")
print("  " + "-" * 66)
for name in models:
    cv  = cv_results[name]
    tst = test_results[name]
    print(f"  {name:<30} {cv['cv_r2']:>8.4f} {cv['cv_mae']:>9.4f} "
          f"{tst['test_r2']:>9.4f} {tst['test_mae']:>10.4f}")
print("  " + "-" * 66)

# Pick the winner based on CV R2
winner_name = max(cv_results, key=lambda m: cv_results[m]["cv_r2"])
winner_model = models[winner_name]
print(f"\n  Winner: {winner_name}  (highest cross-validated R2)")

# =============================================================================
# STEP 6: Hyperparameter Tuning with RandomizedSearchCV
# =============================================================================
# WHAT IS A HYPERPARAMETER?
#
#   A model has two types of "settings":
#
#   PARAMETERS (learned from data):
#     In Linear Regression: the slope and intercept values
#     In Random Forest: the exact split conditions inside each tree
#     These are LEARNED automatically by model.fit() and cannot be set manually.
#
#   HYPERPARAMETERS (set BY YOU before training):
#     These control HOW the model trains. They are not learned from data --
#     you choose them, and the model uses them as fixed rules during training.
#
#   EXAMPLES for GradientBoostingRegressor or RandomForestRegressor:
#
#   n_estimators (default: 100)
#     How many trees to build. More trees = better accuracy up to a point,
#     but also slower training. Too few = underfitting. Too many = diminishing
#     returns and wasted compute.
#     Try: [50, 100, 200, 300]
#
#   max_depth (default: 3 for GBM, None for RF)
#     Maximum depth of each tree. Deeper trees learn more complex patterns
#     but are more likely to overfit (memorise noise in training data).
#     Shallower trees are simpler (more bias, less variance).
#     Try: [3, 5, 7, 9]
#
#   learning_rate (GBM only, default: 0.1)
#     How much each new tree corrects the previous error. Lower = more trees
#     needed for the same accuracy, but more stable. Higher = fewer trees but
#     risk of overshooting. Often the single most important GBM hyperparameter.
#     Try: [0.01, 0.05, 0.1, 0.2]
#
#   min_samples_split (default: 2)
#     A node in a tree will only split if it has at least this many samples.
#     Higher = less complex trees = less overfitting.
#     Try: [2, 5, 10, 20]
#
# WHY RandomizedSearchCV (not GridSearchCV)?
#   GridSearchCV tries EVERY combination: 4 n_estimators * 4 max_depth *
#   4 learning_rate * 4 min_samples_split = 256 combinations * 5 folds =
#   1,280 model fits. That takes hours.
#
#   RandomizedSearchCV samples N RANDOM combinations from the parameter space.
#   With n_iter=15 (15 combos * 5 folds = 75 fits), we cover a wide search
#   in a fraction of the time. Research shows that random search finds equally
#   good hyperparameters as grid search for most problems (Bergstra & Bengio 2012).
# =============================================================================
print("\n" + "=" * 68)
print(f"  STEP 6: HYPERPARAMETER TUNING ({winner_name})")
print("=" * 68)

if "GradientBoosting" in winner_name:
    param_dist = {
        "n_estimators":    [100, 150, 200, 250, 300],
        "max_depth":       [3, 4, 5, 6],
        "learning_rate":   [0.05, 0.08, 0.1, 0.15, 0.2],
        "min_samples_split": [2, 5, 10],
        "subsample":       [0.8, 0.9, 1.0],
    }
    tuned_base = GradientBoostingRegressor(random_state=42)
else:
    param_dist = {
        "n_estimators":    [100, 150, 200, 250, 300],
        "max_depth":       [None, 10, 20, 30],
        "min_samples_split": [2, 5, 10],
        "min_samples_leaf":  [1, 2, 4],
        "max_features":    ["sqrt", "log2", 0.5],
    }
    tuned_base = RandomForestRegressor(random_state=42, n_jobs=-1)

print(f"\n  Running RandomizedSearchCV:")
print(f"    n_iter = 15 combinations sampled")
print(f"    cv     = 5 folds")
print(f"    n_jobs = -1 (all CPU cores)")
print(f"    This may take 5-10 minutes...\n")

search = RandomizedSearchCV(
    estimator  = tuned_base,
    param_distributions = param_dist,
    n_iter     = 15,
    cv         = 5,
    scoring    = "r2",
    n_jobs     = -1,
    random_state = 42,
    verbose    = 1,
    refit      = True   # refit best model on full training data
)

t0 = time.time()
search.fit(X_train_sc, y_train)
tuning_time = time.time() - t0

best_model = search.best_estimator_
y_pred_tuned = best_model.predict(X_test_sc)
tuned_r2  = r2_score(y_test, y_pred_tuned)
tuned_mae = mean_absolute_error(y_test, y_pred_tuned)

print(f"\n  Tuning complete in {tuning_time:.1f}s")
print(f"\n  BEST HYPERPARAMETERS FOUND:")
for param, val in search.best_params_.items():
    print(f"    {param:<22} = {val}")

print(f"\n  BEFORE tuning: R2 = {test_results[winner_name]['test_r2']:.4f}  "
      f"MAE = {test_results[winner_name]['test_mae']:.4f}")
print(f"  AFTER  tuning: R2 = {tuned_r2:.4f}  MAE = {tuned_mae:.4f}")
improvement_r2 = (tuned_r2 - test_results[winner_name]["test_r2"]) * 100
print(f"  R2 improvement: +{improvement_r2:.2f} percentage points")

# =============================================================================
# STEP 7: Feature Importance
# =============================================================================
# WHAT IS FEATURE IMPORTANCE?
#
#   Tree-based models (Random Forest, Gradient Boosting) can report how much
#   each feature CONTRIBUTED to reducing prediction error across all trees.
#
#   Specifically, at each split in a tree, the model measures how much the
#   split reduces the prediction error (variance) for that branch.
#   Feature importance = the total error reduction attributed to that feature,
#   averaged across all trees and normalised to sum to 1.
#
#   A feature with importance 0.35 contributed 35% of total error reduction.
#   A feature with importance 0.01 barely helped -- might be droppable.
#
# WHY SHOW THIS IN A PORTFOLIO?
#   1. INTERPRETABILITY: It proves the model learned something sensible.
#      If "Latitude" has high importance, that makes geographic sense.
#      If "AveBedrms" has near-zero importance, you might reconsider including it.
#   2. BUSINESS VALUE: Non-technical stakeholders can understand "Income and
#      Location drive price" better than any mathematical formula.
#   3. MODEL DEBUGGING: If a feature you expected to be important scores near
#      zero, something might be wrong with how that feature was encoded.
#   4. FEATURE SELECTION: Low-importance features can be dropped to simplify
#      and speed up the model without hurting accuracy.
# =============================================================================
print("\n" + "=" * 68)
print("  STEP 7: FEATURE IMPORTANCE ANALYSIS")
print("=" * 68)

importances = best_model.feature_importances_
sorted_idx  = np.argsort(importances)[::-1]

print(f"\n  Feature importances from {winner_name} (after tuning):")
print(f"  (higher = more important for predicting house price)\n")
print(f"  {'Feature':<22} {'Importance':>11}  {'Bar'}")
print("  " + "-" * 58)
for i in sorted_idx:
    bar = "#" * int(importances[i] * 60)
    print(f"  {ALL_FEATURE_COLS[i]:<22} {importances[i]:>10.4f}  {bar}")

top_feature = ALL_FEATURE_COLS[sorted_idx[0]]
print(f"\n  Most important feature: '{top_feature}' ({importances[sorted_idx[0]]:.1%})")
print(f"  This confirms the EDA finding that {top_feature} correlates most")
print(f"  strongly with house prices in the California Housing dataset.")

# =============================================================================
# STEP 8: Save the final model + scaler
# =============================================================================
# WHY SAVE BOTH MODEL AND SCALER?
#   When the Flask app receives a new house's features, it must apply the
#   EXACT SAME scaling as training (subtract the training mean, divide by
#   training std). The scaler object stores these values.
#
#   We save them as a dictionary bundle:
#   {
#     "model": best_model,       <- the trained GBM/RF model
#     "scaler": scaler,          <- the fitted StandardScaler
#   }
#   The Flask app loads this bundle and uses both objects.
# =============================================================================
bundle = {"model": best_model, "scaler": scaler}
joblib.dump(bundle, "advanced_house_model.pkl")
print(f"\n[SAVED] advanced_house_model.pkl  (model + scaler)")

# =============================================================================
# FINAL SUMMARY
# =============================================================================
total_time = time.time() - START_TIME
print("\n" + "=" * 68)
print("  FINAL SUMMARY")
print("=" * 68)
print(f"""
  Dataset         : California Housing (20,640 rows, 8 features + 2 derived)
  Models compared : LinearRegression, RandomForest, GradientBoosting
  Evaluation      : 5-fold cross-validation + held-out test set

  Final model     : {winner_name} (hyperparameter-tuned)
  Test R2         : {tuned_r2:.4f}   (model explains {tuned_r2*100:.1f}% of price variance)
  Test MAE        : {tuned_mae:.4f}  (typical prediction error: ${tuned_mae*100:.0f}k)

  Total runtime   : {total_time/60:.1f} minutes
  Model saved to  : advanced_house_model.pkl

  Next step: python app.py  (the Flask app will load the new model)
""")
