# =============================================================================
# eda.py  --  Exploratory Data Analysis: California Housing Dataset
# =============================================================================
# WHAT IS EDA AND WHY DO IT FIRST?
#
#   EDA = Exploratory Data Analysis. Before training any model, a data
#   scientist spends time UNDERSTANDING the data. This includes:
#
#   1. What are the features? What do they represent?
#   2. What is the range/distribution of each column?
#   3. Are there missing values? (missing = model gets corrupted inputs)
#   4. Which features correlate with the target? (correlation = potential signal)
#   5. Are there outliers that could mislead the model?
#
#   WHY BEFORE TRAINING?
#   Imagine baking without tasting the ingredients. EDA is the "tasting" step.
#   Without EDA you might: train on columns with missing data (error), feed
#   a model unscaled features where one column is 0-15 and another is 0-35000
#   (causes the model to treat the big number as more important), or miss that
#   two features are perfectly correlated (redundant = wasted capacity).
#
#   Professional ML pipelines always start with EDA. It is also where
#   you spot opportunities for FEATURE ENGINEERING (creating new, better
#   features from existing ones -- covered in train_advanced.py).
# =============================================================================

import os
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")   # non-interactive backend -- renders to file, not screen
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns

from sklearn.datasets import fetch_california_housing

# ── Output folder for charts ──────────────────────────────────────────────────
os.makedirs("eda_charts", exist_ok=True)

print("=" * 68)
print("  EXPLORATORY DATA ANALYSIS -- CALIFORNIA HOUSING DATASET")
print("=" * 68)

# =============================================================================
# STEP 1: Load the California Housing dataset
# =============================================================================
# WHY USE A REAL DATASET?
#   Our original project used a hand-crafted 25-row CSV. That is fine for
#   learning the code flow, but the model learned almost nothing -- 25 rows
#   is far too few for a regression problem with 4 features.
#
#   The California Housing dataset has 20,640 rows collected from the 1990
#   US Census. Each row = one "block group" (roughly 400-600 households).
#   It is the standard benchmark dataset for regression tasks in scikit-learn.
#
# FEATURES (8 columns):
#   MedInc      -- Median income of households in the block (unit: $10,000)
#   HouseAge    -- Median age of houses in the block (years)
#   AveRooms    -- Average rooms per household
#   AveBedrms   -- Average bedrooms per household
#   Population  -- Total population of the block
#   AveOccup    -- Average number of persons per household
#   Latitude    -- Geographic latitude of the block centroid
#   Longitude   -- Geographic longitude of the block centroid
#
# TARGET:
#   MedHouseVal -- Median house value in the block (unit: $100,000)
#                  So a value of 2.5 = $250,000
# =============================================================================
print("\n[LOAD] Fetching California Housing dataset from scikit-learn...")
housing = fetch_california_housing(as_frame=True)

df      = housing.frame          # pandas DataFrame with features + target
target  = "MedHouseVal"

print(f"[LOAD] Dataset shape: {df.shape}  ({df.shape[0]:,} rows, {df.shape[1]} columns)")
print(f"       Features: {list(df.columns[:-1])}")
print(f"       Target  : {target}")

# =============================================================================
# STEP 2: Summary statistics
# =============================================================================
# WHY .describe()?
#   .describe() shows: count, mean, std (standard deviation), min, max,
#   and the 25th/50th/75th percentiles for every numeric column.
#
#   What to look for:
#   - min/max that seem impossible (data entry errors)
#   - Large standard deviation relative to mean (highly spread data needs scaling)
#   - Count < total rows (missing values -- though California Housing has none)
# =============================================================================
print("\n" + "=" * 68)
print("  STEP 2: SUMMARY STATISTICS (.describe())")
print("=" * 68)
pd.set_option("display.float_format", "{:.3f}".format)
pd.set_option("display.max_columns", 10)
print(df.describe().to_string())

# =============================================================================
# STEP 3: Check for missing values
# =============================================================================
# WHY CHECK?
#   Many real datasets have NaN (not-a-number) values where data was not
#   collected. If you train a model on data with NaN, sklearn raises an error.
#   You must either: drop those rows, fill them with a sensible value
#   (imputation), or use a model that handles NaN natively.
#
#   California Housing is a clean dataset with no missing values -- but
#   always check! In industry, missing data is the rule, not the exception.
# =============================================================================
print("\n" + "=" * 68)
print("  STEP 3: MISSING VALUE CHECK")
print("=" * 68)
missing = df.isnull().sum()
pct_missing = (df.isnull().sum() / len(df) * 100).round(2)
missing_df = pd.DataFrame({"Missing Count": missing, "Missing %": pct_missing})
print(missing_df.to_string())
if missing.sum() == 0:
    print("\n  No missing values found. Dataset is clean.")
else:
    print(f"\n  WARNING: {missing.sum()} total missing values found!")

# =============================================================================
# STEP 4: Correlation analysis
# =============================================================================
# WHAT IS CORRELATION?
#   Correlation measures the LINEAR relationship between two columns.
#   Values range from -1 to +1:
#     +1 = perfect positive relationship (one goes up, other goes up exactly)
#      0 = no linear relationship
#     -1 = perfect negative relationship (one goes up, other goes down exactly)
#
# WHY DOES IT MATTER FOR ML?
#   Features with HIGH correlation to the TARGET are strong candidates for
#   prediction. Features with LOW correlation might not help the model much.
#
#   IMPORTANT CAVEAT: correlation measures ONLY linear relationships.
#   A feature can have 0 linear correlation but a strong non-linear relationship
#   (e.g. U-shaped). Tree-based models (Random Forest, Gradient Boosting) can
#   exploit these non-linear patterns even when correlation looks low.
# =============================================================================
print("\n" + "=" * 68)
print("  STEP 4: FEATURE CORRELATIONS WITH TARGET")
print("=" * 68)
corr_with_target = df.corr(numeric_only=True)[target].drop(target).sort_values(
    key=abs, ascending=False
)
print(f"\n  Feature correlations with {target} (strongest first):\n")
for feat, corr_val in corr_with_target.items():
    bar = "#" * int(abs(corr_val) * 30)
    direction = "+" if corr_val > 0 else "-"
    print(f"  {feat:<15} {corr_val:+.4f}  {direction}{bar}")

print(f"\n  MedInc is the STRONGEST predictor (r={corr_with_target['MedInc']:.3f})")
print(f"  Latitude/Longitude capture LOCATION effects -- very important!")

# =============================================================================
# STEP 5: Save Chart 1 -- Target variable (price) distribution
# =============================================================================
# WHY PLOT THE TARGET DISTRIBUTION?
#   The shape of the target variable tells you a lot:
#   - NORMAL (bell-shaped): the model can learn it easily
#   - RIGHT-SKEWED (long tail): expensive houses are rare outliers that will
#     dominate the model's error metric. You might log-transform the target.
#   - HARD CUTOFF at a specific value: California Housing caps values at
#     $500,001 (shown as 5.0001) because the census clipped outliers.
#     This "pile" at the right edge is visible in the histogram.
# =============================================================================
fig, ax = plt.subplots(figsize=(9, 5))
ax.hist(df[target], bins=60, color="#6c63ff", edgecolor="none", alpha=0.85)
ax.axvline(df[target].median(), color="#f9a826", linewidth=2,
           linestyle="--", label=f"Median = ${df[target].median()*100:.0f}k")
ax.set_facecolor("#0f1220")
fig.patch.set_facecolor("#07090f")
ax.tick_params(colors="#8a94b2")
ax.xaxis.label.set_color("#8a94b2")
ax.yaxis.label.set_color("#8a94b2")
ax.title.set_color("#eef0ff")
for spine in ax.spines.values():
    spine.set_edgecolor("#1e2240")
ax.set_xlabel("Median House Value ($100,000 units)", fontsize=11)
ax.set_ylabel("Number of Block Groups", fontsize=11)
ax.set_title("California Housing: Price Distribution", fontsize=14, fontweight="bold")
ax.legend(facecolor="#1a1f35", labelcolor="#eef0ff", framealpha=0.8)
plt.tight_layout()
plt.savefig("eda_charts/price_distribution.png", dpi=130, bbox_inches="tight",
            facecolor="#07090f")
plt.close()
print("\n[CHART 1] Saved: eda_charts/price_distribution.png")

# =============================================================================
# STEP 6: Save Chart 2 -- Correlation heatmap
# =============================================================================
# A HEATMAP shows the correlation between ALL pairs of columns at once.
# Bright (red/warm) = strong positive correlation
# Dark (blue/cool)  = strong negative correlation
# Near-white        = little to no correlation
#
# Look for: any feature strongly correlated with MedHouseVal (target row).
# Also look for pairs of FEATURES that are highly correlated with each other
# ("multicollinearity") -- these are redundant and can cause issues in
# linear models (though tree-based models handle it fine).
# =============================================================================
fig, ax = plt.subplots(figsize=(10, 8))
corr_matrix = df.corr(numeric_only=True)
mask = np.zeros_like(corr_matrix, dtype=bool)
mask[np.triu_indices_from(mask, k=1)] = True   # hide upper triangle (redundant)

sns.heatmap(
    corr_matrix,
    mask=mask,
    annot=True,
    fmt=".2f",
    cmap="coolwarm",
    center=0,
    square=True,
    linewidths=0.5,
    linecolor="#1a1f35",
    ax=ax,
    annot_kws={"size": 9},
    cbar_kws={"shrink": 0.8}
)
ax.set_facecolor("#0f1220")
fig.patch.set_facecolor("#07090f")
ax.tick_params(colors="#8a94b2", labelsize=9)
ax.set_title("Feature Correlation Heatmap", fontsize=13, fontweight="bold",
             color="#eef0ff", pad=15)
plt.tight_layout()
plt.savefig("eda_charts/correlation_heatmap.png", dpi=130, bbox_inches="tight",
            facecolor="#07090f")
plt.close()
print("[CHART 2] Saved: eda_charts/correlation_heatmap.png")

# =============================================================================
# STEP 7: Save Chart 3 -- Income vs Price scatter (strongest predictor)
# =============================================================================
# A scatter plot reveals the SHAPE of the relationship between a feature
# and the target. Linear = good for Linear Regression. Curved/complex =
# needs a tree-based model.
#
# On this chart you should see:
# - A clear upward trend (higher income => higher house price)
# - Significant spread (income alone doesn't explain everything -- location
#   and other features also matter)
# - The hard ceiling at 5.0 ($500,000) -- the census data cap mentioned above
# =============================================================================
fig, ax = plt.subplots(figsize=(9, 5))
sample = df.sample(3000, random_state=42)   # plot 3,000 random points (faster)
ax.scatter(sample["MedInc"], sample[target],
           alpha=0.25, s=8, color="#6c63ff")
ax.set_facecolor("#0f1220")
fig.patch.set_facecolor("#07090f")
ax.tick_params(colors="#8a94b2")
ax.xaxis.label.set_color("#8a94b2")
ax.yaxis.label.set_color("#8a94b2")
ax.title.set_color("#eef0ff")
for spine in ax.spines.values():
    spine.set_edgecolor("#1e2240")
ax.set_xlabel("Median Income (units of $10,000)", fontsize=11)
ax.set_ylabel("Median House Value ($100,000 units)", fontsize=11)
ax.set_title("Strongest Predictor: Median Income vs House Price\n"
             "(r = {:.3f})".format(df["MedInc"].corr(df[target])),
             fontsize=13, fontweight="bold")
plt.tight_layout()
plt.savefig("eda_charts/income_vs_price.png", dpi=130, bbox_inches="tight",
            facecolor="#07090f")
plt.close()
print("[CHART 3] Saved: eda_charts/income_vs_price.png")

# =============================================================================
# STEP 8: EDA summary -- key findings
# =============================================================================
print("\n" + "=" * 68)
print("  EDA SUMMARY -- KEY FINDINGS")
print("=" * 68)
print(f"""
  Dataset    : {len(df):,} rows, {len(df.columns)-1} features, 1 target
  Missing    : 0 values -- dataset is completely clean
  Target     : MedHouseVal ranges from ${df[target].min()*100:.0f}k to ${df[target].max()*100:.0f}k
               Median: ${df[target].median()*100:.0f}k  |  Mean: ${df[target].mean()*100:.0f}k

  Top predictors (by correlation):
    1. MedInc    r={df['MedInc'].corr(df[target]):+.3f}  Income drives price most strongly
    2. Latitude  r={df['Latitude'].corr(df[target]):+.3f}  Location matters (north/south)
    3. Longitude r={df['Longitude'].corr(df[target]):+.3f}  Location matters (east/west)

  Notable observations:
    - AveRooms and AveBedrms are correlated with each other
    - Population and AveOccup together describe neighbourhood density
    - Hard ceiling at 5.0 ($500k) -- census data was capped
    - Non-linear patterns visible => tree models will outperform linear

  Derived features to engineer:
    - bedrooms_per_room  = AveBedrms / AveRooms  (room quality: lower=more spacious)
    - income_per_room    = MedInc / AveRooms     (affordability index)

  Charts saved to: eda_charts/
    price_distribution.png
    correlation_heatmap.png
    income_vs_price.png

  Next step: python train_advanced.py
""")
