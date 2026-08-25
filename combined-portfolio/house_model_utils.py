# =============================================================================
# house_model_utils.py  --  Shared utilities for the advanced house price model
# =============================================================================
# WHY A SHARED UTILITIES FILE?
#
#   Both train_advanced.py and app.py need to do IDENTICAL feature engineering.
#   If we copy-paste the code into both files and later decide to change a
#   feature formula, we would have to remember to update it in two places.
#   This is a classic source of bugs.
#
#   Instead, we define the feature engineering ONCE here and import it
#   everywhere. This is the "Don't Repeat Yourself" (DRY) principle --
#   a core software engineering best practice.
#
#   This file is intentionally small. Its only job is to define:
#     1. FEATURE_COLS  -- the exact input column order the model expects
#     2. engineer_features()  -- the function that adds derived columns
# =============================================================================

import numpy as np
import pandas as pd

# =============================================================================
# FEATURE COLUMN ORDER
# =============================================================================
# This list MUST match the column order used during training.
# If you reorder or rename anything here, the saved model will give wrong
# predictions because the model learned: "column 0 = MedInc", "column 1 =
# HouseAge", etc. -- position matters in numpy arrays.
# =============================================================================
FEATURE_COLS = [
    "MedInc",       # Median income ($10,000 units) -- strongest predictor
    "HouseAge",     # Median house age (years)
    "AveRooms",     # Average rooms per household
    "AveBedrms",    # Average bedrooms per household
    "Population",   # Total block population
    "AveOccup",     # Average persons per household
    "Latitude",     # Geographic latitude
    "Longitude",    # Geographic longitude
]

# After feature engineering, these two columns are appended at the end:
ENGINEERED_COLS = [
    "bedrooms_per_room",   # AveBedrms / AveRooms  (room quality ratio)
    "income_per_room",     # MedInc    / AveRooms  (affordability index)
]

ALL_FEATURE_COLS = FEATURE_COLS + ENGINEERED_COLS   # 10 total features


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Add two derived features to a DataFrame that already contains FEATURE_COLS.

    WHY DERIVED FEATURES?
    -----------------------
    Raw features like AveRooms and AveBedrms exist independently, but their
    RELATIONSHIP is often more informative than either column alone.

    Example: bedrooms_per_room
      House A: AveRooms=8,  AveBedrms=4  -> bedrooms_per_room = 0.50
      House B: AveRooms=4,  AveBedrms=4  -> bedrooms_per_room = 1.00

      House B has the same number of bedrooms but HALF the other rooms
      (living room, kitchen, bathrooms). This ratio captures "spaciousness"
      in a way neither raw column can on its own.

    Example: income_per_room
      Block A: MedInc=5,  AveRooms=10  -> income_per_room = 0.50 (big but affordable)
      Block B: MedInc=5,  AveRooms=3   -> income_per_room = 1.67 (small and expensive)

      This captures housing affordability -- a key driver of house prices.

    A Linear Regression model CANNOT discover these interactions automatically.
    By computing the ratio and giving it as a new column, we "pre-compute" the
    interaction for the model. Tree-based models CAN discover interactions
    naturally, but providing them as explicit features still helps by giving
    the tree a more direct split point to find.
    """
    df = df.copy()   # never modify the original DataFrame in-place

    # Avoid division by zero if AveRooms = 0 (shouldn't happen but safe coding)
    safe_rooms = df["AveRooms"].replace(0, np.nan)

    df["bedrooms_per_room"] = df["AveBedrms"] / safe_rooms
    df["income_per_room"]   = df["MedInc"]    / safe_rooms

    # Fill any NaN that arose from division (rare edge case)
    df["bedrooms_per_room"] = df["bedrooms_per_room"].fillna(df["bedrooms_per_room"].median())
    df["income_per_room"]   = df["income_per_room"].fillna(df["income_per_room"].median())

    return df
