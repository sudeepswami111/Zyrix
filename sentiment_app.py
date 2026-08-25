# =============================================================================
# sentiment_app.py  --  Sentiment Classifier: Flask Web Application
# =============================================================================
# PURPOSE OF THIS FILE:
#   This is the INFERENCE phase -- we load the already-trained model and
#   vectorizer and use them to classify sentiment for new text the user types.
#
#   The flow for every prediction:
#     1. User types a sentence in the web form
#     2. Flask receives it via a POST request
#     3. We convert the text using the SAVED vectorizer (same vocabulary
#        that was used during training -- this is critical)
#     4. We feed the converted numbers into the SAVED model
#     5. The model returns "positive" or "negative" + a confidence score
#     6. Flask renders the result back to the user
#
#   No retraining happens here. The model's learned weights are frozen
#   inside sentiment_model.pkl; the vocabulary is frozen in vectorizer.pkl.
# =============================================================================

from flask import Flask, request, render_template
import joblib
import pandas as pd

# -----------------------------------------------------------------------------
# STEP 1: Initialise the Flask application
# -----------------------------------------------------------------------------
# WHY: Flask(__name__) creates a web application object and tells Flask
# where to look for templates (the templates/ folder) and static files.
# -----------------------------------------------------------------------------
app = Flask(__name__)

# -----------------------------------------------------------------------------
# STEP 2: Load both the model AND the vectorizer at startup
# -----------------------------------------------------------------------------
# WHY LOAD BOTH?
#   At prediction time, a user's raw text must be converted to numbers
#   using the EXACT SAME vocabulary that was built during training.
#   That vocabulary lives in vectorizer.pkl.
#   Only after conversion can the model.pkl make a prediction.
#
# WHY LOAD AT STARTUP (not inside the route function)?
#   Loading .pkl files takes a small amount of time. Loading them once
#   at startup means every prediction request is instant -- we are not
#   re-loading from disk on every single user request.
# -----------------------------------------------------------------------------
try:
    model      = joblib.load("sentiment_model.pkl")
    vectorizer = joblib.load("vectorizer.pkl")
    print("[OK] sentiment_model.pkl loaded successfully")
    print("[OK] vectorizer.pkl       loaded successfully")
    print(f"     Vocabulary size: {len(vectorizer.vocabulary_)} words")
    print(f"     Model classes  : {list(model.classes_)}")
except FileNotFoundError as e:
    print(f"[ERROR] Missing file: {e}")
    print("        Run 'python train_sentiment.py' first.")
    model = None
    vectorizer = None

# -----------------------------------------------------------------------------
# STEP 3: Define the home route
# -----------------------------------------------------------------------------
# WHY GET AND POST?
#   GET  -> User visits the page -> show the empty text box form
#   POST -> User submits text    -> classify sentiment, show result
#
# @app.route("/") registers this function to handle requests at the homepage.
# -----------------------------------------------------------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    prediction  = None   # "Positive" or "Negative"
    confidence  = None   # e.g. 94.2 (percent)
    user_text   = ""     # echoed back to the user so they see what they typed
    error       = None   # any validation/runtime error message

    if request.method == "POST":
        # -----------------------------------------------------------------------
        # STEP 4: Get the text the user typed
        # -----------------------------------------------------------------------
        # WHY STRIP? Users sometimes accidentally add spaces at the start/end.
        # .strip() removes leading and trailing whitespace.
        # -----------------------------------------------------------------------
        user_text = request.form.get("user_text", "").strip()

        if not user_text:
            error = "Please enter a sentence before clicking Analyze."
        elif model is None or vectorizer is None:
            error = "Model not loaded. Run train_sentiment.py first."
        else:
            try:
                # ---------------------------------------------------------------
                # STEP 5: Transform the input text using the SAVED vectorizer
                # ---------------------------------------------------------------
                # WHY THE SAME VECTORIZER?
                #   The model was trained on vectors produced by THIS specific
                #   vectorizer with THIS specific vocabulary. Column 0 in the
                #   training matrix meant word "abandon"; column 1 meant "able",
                #   etc. The model's weights are calibrated to that exact mapping.
                #
                #   If we created a new TfidfVectorizer() here, it would build a
                #   DIFFERENT vocabulary from just this one sentence -- the column
                #   meanings would be completely different, and the model would
                #   produce nonsense predictions.
                #
                # vectorizer.transform([user_text]):
                #   - [user_text] is a list with one element (transform expects a list)
                #   - Returns a sparse matrix of shape (1, vocab_size)
                #   - Does NOT change the vocabulary (no .fit, only .transform)
                # ---------------------------------------------------------------
                text_vector = vectorizer.transform([user_text])

                # ---------------------------------------------------------------
                # STEP 6: Predict sentiment + get confidence score
                # ---------------------------------------------------------------
                # model.predict() returns the class label: "positive" or "negative"
                # model.predict_proba() returns the probability for EACH class.
                #   model.classes_ tells us the order: usually ["negative", "positive"]
                #   So predict_proba[0][1] = probability of being "positive"
                #       predict_proba[0][0] = probability of being "negative"
                #
                # Confidence = probability of the PREDICTED class (whichever it is).
                # ---------------------------------------------------------------
                raw_label = model.predict(text_vector)[0]        # "positive" or "negative"
                probas    = model.predict_proba(text_vector)[0]  # array of 2 probabilities

                pos_class_index = list(model.classes_).index("positive")
                prob_positive   = probas[pos_class_index]
                prob_negative   = 1 - prob_positive

                # Format for display
                prediction = "Positive" if raw_label == "positive" else "Negative"
                conf_score = prob_positive if raw_label == "positive" else prob_negative
                confidence = round(conf_score * 100, 1)

            except Exception as e:
                error = f"Prediction error: {str(e)}"

    # ---------------------------------------------------------------------------
    # STEP 7: Render the HTML template with results
    # ---------------------------------------------------------------------------
    # render_template() loads templates/sentiment.html and injects our variables.
    # Jinja2 will replace {{ prediction }}, {{ confidence }}, etc. with their values.
    # ---------------------------------------------------------------------------
    return render_template(
        "sentiment.html",
        prediction=prediction,
        confidence=confidence,
        user_text=user_text,
        error=error
    )


# -----------------------------------------------------------------------------
# STEP 8: Run the development server
# -----------------------------------------------------------------------------
# debug=True   -> auto-restarts on code changes; shows detailed error pages
# host="0.0.0.0"-> accessible from other devices on your local network
# port=5001    -> using 5001 to avoid conflict with the house price app on 5000
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    if model is None or vectorizer is None:
        print("\n[ERROR] Cannot start: model or vectorizer not loaded.")
        print("        Run 'python train_sentiment.py' first.\n")
    else:
        print("\n[START] Flask server starting at http://127.0.0.1:5001")
        print("        Press Ctrl+C to stop.\n")
        app.run(debug=True, host="0.0.0.0", port=5001)
