# =============================================================================
# train_sentiment.py  --  Text Sentiment Classifier: Training Script
# =============================================================================
# PURPOSE OF THIS FILE:
#   This script teaches a machine learning model to read a sentence and decide
#   whether it expresses a POSITIVE or NEGATIVE sentiment.
#
#   The two big challenges with text ML (versus number ML like house prices):
#     1. Models only understand NUMBERS, not words.
#        We need to convert each sentence into a row of numbers first.
#        That conversion tool is called a VECTORIZER.
#
#     2. We must SAVE both the trained model AND the vectorizer.
#        At prediction time, new text must go through the exact same
#        conversion the training data used -- otherwise the numbers mean
#        something completely different and predictions are garbage.
#
#   Steps:
#     Load CSV -> Vectorize text -> Split -> Train -> Evaluate -> Save both
# =============================================================================

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# -----------------------------------------------------------------------------
# STEP 1: Load the dataset
# -----------------------------------------------------------------------------
# WHY: Every supervised ML model needs labelled examples to learn from.
# Our CSV has two columns:
#   - text      : a short product or movie review sentence
#   - sentiment : the correct label ("positive" or "negative")
#
# We will train the model to learn which kinds of words and phrases
# tend to appear in positive reviews vs negative ones.
# -----------------------------------------------------------------------------
df = pd.read_csv("sentiment_data.csv")

print("=" * 65)
print("  SENTIMENT CLASSIFIER -- MODEL TRAINING")
print("=" * 65)
print(f"\n[DATA] Dataset loaded: {len(df)} rows")
print(f"\nClass distribution:")
print(df["sentiment"].value_counts().to_string())
print(f"\nSample rows:")
print(df.head(6).to_string(index=False))

# -----------------------------------------------------------------------------
# STEP 2: Separate features (X) from labels (y)
# -----------------------------------------------------------------------------
# WHY: Same principle as any supervised ML --
#   X (features) = what we KNOW  => the raw review text
#   y (labels)   = what we WANT  => "positive" or "negative"
# -----------------------------------------------------------------------------
X = df["text"]
y = df["sentiment"]

# -----------------------------------------------------------------------------
# STEP 3: Split into train/test sets
# -----------------------------------------------------------------------------
# WHY: We hold out 20% of the data as a TEST SET -- rows the model never sees
# during training. Evaluating on these unseen rows tells us how the model
# would perform on completely new reviews from real users.
#
# If we evaluated on training data, the model could simply memorise every
# sentence and score 100% -- that tells us nothing useful.
#
# stratify=y keeps the positive/negative ratio equal in BOTH splits,
# so neither split is accidentally all-positive or all-negative.
# -----------------------------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=7    # seed chosen to give a balanced positive/negative test set
)

print(f"\n[SPLIT] Train/Test Split (80/20):")
print(f"        Training rows : {len(X_train)}")
print(f"        Testing  rows : {len(X_test)}")

# -----------------------------------------------------------------------------
# STEP 4: Convert text into numbers using TF-IDF Vectorization
# -----------------------------------------------------------------------------
# WHY CAN'T MODELS READ RAW TEXT?
#   Machine learning models are mathematical functions. They can only operate
#   on numbers. The word "amazing" is meaningless to them -- it must be
#   represented as a number (or a vector of numbers) first.
#
# WHAT DOES TFIDF DO?
#   TF-IDF stands for Term Frequency - Inverse Document Frequency.
#   It converts each sentence into a VECTOR (a row of numbers), where
#   each position represents one word from the vocabulary.
#
#   Step A -- Build a VOCABULARY from all training sentences:
#     e.g. {"amazing": 0, "terrible": 1, "love": 2, "broke": 3, ...}
#
#   Step B -- For each sentence, assign a score to each vocabulary word:
#     - 0.0  if the word does NOT appear in that sentence
#     - A positive score based on two things:
#         TF  (Term Frequency)  = how often this word appears in THIS sentence
#         IDF (Inverse Doc Freq) = a penalty for words that appear in MANY
#                                  sentences ("the", "is", "a") -- those words
#                                  carry little meaning, so they get low scores
#
#   Example result:
#     "This product is amazing" might produce a vector like:
#       [0.0, 0.0, 0.87, 0.0, 0.45, 0.0, ...]
#     where 0.87 is the score for "amazing" and 0.45 for "product".
#
# WHY FIT ON TRAINING DATA ONLY?
#   vectorizer.fit_transform(X_train) builds the vocabulary and converts.
#   vectorizer.transform(X_test) converts WITHOUT rebuilding vocabulary.
#
#   We never fit on test data -- that would be "data leakage": the model
#   would indirectly know something about the test set before evaluation.
# -----------------------------------------------------------------------------
vectorizer = TfidfVectorizer(
    lowercase=True,         # treat "Great" and "great" as the same word
    stop_words="english",   # remove very common words: "the", "is", "a", etc.
    max_features=500        # keep only the 500 most informative words
)

# fit_transform: BUILD vocabulary from training text, THEN convert to numbers
X_train_vec = vectorizer.fit_transform(X_train)

# transform ONLY: convert test text using the ALREADY-BUILT vocabulary
# (no fitting -- the vocabulary is locked after training)
X_test_vec = vectorizer.transform(X_test)

vocab_size = len(vectorizer.vocabulary_)
print(f"\n[VECTORIZE] TF-IDF vocabulary size: {vocab_size} unique words")
print(f"            Each sentence is now a vector of {vocab_size} numbers")
print(f"            Training matrix shape: {X_train_vec.shape}")
print(f"            (rows = sentences, columns = vocabulary words)")

# -----------------------------------------------------------------------------
# STEP 5: Train the classifier
# -----------------------------------------------------------------------------
# WHY LOGISTIC REGRESSION?
#   Despite the name, Logistic Regression is a CLASSIFICATION algorithm.
#   It learns one weight per vocabulary word, indicating how strongly that
#   word pushes the prediction toward positive or negative.
#
#   Words like "amazing", "love", "perfect" get HIGH positive weights.
#   Words like "terrible", "broke", "disappointed" get HIGH negative weights.
#
#   For a new sentence:
#     score = sum(word_weight * tfidf_score  for each word in vocabulary)
#   Then it applies the sigmoid function to get a probability:
#     P(positive) = 1 / (1 + exp(-score))
#
#   If P(positive) > 0.5 --> prediction = "positive"
#   Otherwise            --> prediction = "negative"
#
# max_iter=1000: allow enough iterations for the solver to find good weights.
# -----------------------------------------------------------------------------
model = LogisticRegression(max_iter=1000, random_state=42)

print(f"\n[TRAIN] Training LogisticRegression classifier...")
model.fit(X_train_vec, y_train)
print(f"[TRAIN] Training complete.")

# -----------------------------------------------------------------------------
# STEP 6: Inspect what the model learned -- top predictive words
# -----------------------------------------------------------------------------
# WHY: We can read exactly which words the model found most predictive.
# model.coef_[0] holds a weight for every vocabulary word.
# High positive weight = strong predictor of POSITIVE sentiment.
# High negative weight = strong predictor of NEGATIVE sentiment.
# This is a great sanity check -- if "love" and "amazing" top the positive
# list and "terrible" and "broke" top the negative list, the model is
# learning sensible real-world patterns.
# -----------------------------------------------------------------------------
feature_names = vectorizer.get_feature_names_out()
coef = model.coef_[0]
top_n = 8

top_pos_idx = np.argsort(coef)[-top_n:][::-1]
top_neg_idx = np.argsort(coef)[:top_n]

print("\n" + "=" * 65)
print("  WHAT THE MODEL LEARNED -- TOP PREDICTIVE WORDS")
print("=" * 65)
print(f"\n  Top {top_n} words -> POSITIVE sentiment (highest weights):")
for idx in top_pos_idx:
    print(f"    {feature_names[idx]:<22}  weight: {coef[idx]:+.4f}")

print(f"\n  Top {top_n} words -> NEGATIVE sentiment (lowest weights):")
for idx in top_neg_idx:
    print(f"    {feature_names[idx]:<22}  weight: {coef[idx]:+.4f}")

# -----------------------------------------------------------------------------
# STEP 7: Evaluate on the test set
# -----------------------------------------------------------------------------
# WHAT IS ACCURACY?
#   Accuracy = (correct predictions) / (total predictions)
#
#   Example: if 9 out of 10 test sentences are classified correctly,
#   accuracy = 0.90 = 90%.
#
#   Accuracy is appropriate here because our dataset is BALANCED
#   (roughly equal positive and negative samples). In imbalanced datasets
#   (e.g. 95% one class), accuracy alone can be misleading.
#
# WHAT IS THE CLASSIFICATION REPORT?
#   precision : of all sentences predicted positive, how many actually were?
#   recall    : of all actually-positive sentences, how many did we catch?
#   F1-score  : the harmonic mean of precision and recall (single balance metric)
#   support   : how many test rows belong to each class
# -----------------------------------------------------------------------------
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print("\n" + "=" * 65)
print("  MODEL EVALUATION ON TEST SET (unseen data)")
print("=" * 65)
print(f"\n  Accuracy: {accuracy:.4f}  ({accuracy*100:.1f}% of test reviews classified correctly)")
print(f"\n  Full Classification Report:")
print(classification_report(y_test, y_pred, zero_division=0))

# -----------------------------------------------------------------------------
# STEP 8: Show sample predictions with confidence scores
# -----------------------------------------------------------------------------
# WHY SHOW CONFIDENCE?
#   model.predict() gives "positive" or "negative".
#   model.predict_proba() gives the underlying probability, e.g.:
#     [0.07, 0.93] means 93% confident it is positive.
#
#   Confidence helps users understand how certain the model is.
#   A 51% positive prediction is much less reliable than a 97% one.
#   The Flask app will show this confidence score to the user.
# -----------------------------------------------------------------------------
probas = model.predict_proba(X_test_vec)
pos_idx = list(model.classes_).index("positive")

print("=" * 65)
print("  SAMPLE PREDICTIONS ON TEST SET")
print("=" * 65)
print(f"\n  {'Actual':<12} {'Predicted':<12} {'Confidence':<12}  Review text")
print("  " + "-" * 72)
for i, (text, actual, pred) in enumerate(zip(X_test.values, y_test.values, y_pred)):
    prob_positive = probas[i][pos_idx]
    conf = prob_positive if pred == "positive" else 1 - prob_positive
    match_str = "  OK" if actual == pred else "  WRONG"
    short = (text[:52] + "...") if len(text) > 52 else text
    print(f"  {actual:<12} {pred:<12} {conf*100:>5.1f}%       {short}{match_str}")

# -----------------------------------------------------------------------------
# STEP 9: Save BOTH the model AND the vectorizer
# -----------------------------------------------------------------------------
# WHY SAVE BOTH?
#   The model and vectorizer are a MATCHED PAIR.
#
#   At prediction time in Flask, when a user types a new sentence:
#     Step 1: vectorizer.transform([new_text])
#             --> converts text using the SAME vocabulary from training
#     Step 2: model.predict(transformed_text)
#             --> applies trained weights to produce a sentiment label
#
#   If you created a NEW vectorizer at prediction time, it would build a
#   DIFFERENT vocabulary. The numbers would mean different things. The
#   model's weights (calibrated for the training vocabulary) would produce
#   completely wrong predictions -- even though the model itself is correct.
#
#   Analogy: the vectorizer is a CODEBOOK. If you encode a message with
#   Code A but try to decode it with Code B, you get nonsense.
#   You MUST use the same codebook to encode AND decode.
# -----------------------------------------------------------------------------
joblib.dump(model,      "sentiment_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("\n" + "=" * 65)
print("[SAVED] sentiment_model.pkl  -- trained LogisticRegression")
print("[SAVED] vectorizer.pkl       -- fitted TF-IDF vectorizer")
print("\n  Both files are required to run the Flask app.")
print("  The vectorizer converts text; the model predicts sentiment.")
print("=" * 65)
print("\n  Run 'python sentiment_app.py' to start the web app.")
print("=" * 65)
