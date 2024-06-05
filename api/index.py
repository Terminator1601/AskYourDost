# from flask_cors import CORS
# from flask import Flask, request, jsonify
# import pickle
# from sklearn.feature_extraction.text import TfidfVectorizer
# import nltk
# import string
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer

# app = Flask(__name__)
# CORS(app)


# # Load the trained model
# with open('./ML model/svm_model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

# # Load the TF-IDF vectorizer
# with open('./ML model/tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
#     tfidf_vectorizer = pickle.load(vectorizer_file)

# # Preprocessing functions
# nltk.download('stopwords')
# nltk.download('punkt')
# nltk.download('wordnet')

# stop_words = set(stopwords.words('english'))
# lemmatizer = WordNetLemmatizer()


# def preprocess_text(text):
#     tokens = word_tokenize(text.lower())
#     tokens = [token for token in tokens if token not in string.punctuation]
#     tokens = [token for token in tokens if token not in stop_words]
#     tokens = [lemmatizer.lemmatize(token) for token in tokens]
#     return " ".join(tokens)

# # Endpoint for handling search queries


# @app.route("/api/healthchecker", methods=["GET"])
# def healthchecker():
#     return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     if not data or 'query' not in data:
#         return jsonify({'error': 'Invalid input'}), 400

#     search_term = data['query']

#     # Mock prediction logic for demonstration
#     prediction_result = f"Predicted result for {search_term}"

#     return jsonify({'prediction': prediction_result}), 200


# if __name__ == "__main__":
#     app.run(port=3000)
















##########################################################################################################################












# import os
# from flask_cors import CORS
# from flask import Flask, request, jsonify
# import pickle
# from sklearn.feature_extraction.text import TfidfVectorizer
# import nltk
# import string
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer

# app = Flask(__name__)
# CORS(app)

# # Load the trained model
# with open('../ML model/ML_model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

# # Load the TF-IDF vectorizer
# with open('../ML model/vectorizer.pkl', 'rb') as vectorizer_file:
#     tfidf_vectorizer = pickle.load(vectorizer_file)

# # Preprocessing functions
# nltk.download('stopwords')
# nltk.download('punkt')
# nltk.download('wordnet')

# stop_words = set(stopwords.words('english'))
# lemmatizer = WordNetLemmatizer()


# def preprocess_text(text):
#     tokens = word_tokenize(text.lower())
#     tokens = [token for token in tokens if token not in string.punctuation]
#     tokens = [token for token in tokens if token not in stop_words]
#     tokens = [lemmatizer.lemmatize(token) for token in tokens]
#     return " ".join(tokens)

# # Endpoint for handling search queries


# @app.route("/api/healthchecker", methods=["GET"])
# def healthchecker():
#     return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


# @app.route('/api/predict', methods=['POST'])
# def predict():
#     try:
#         # Get the text data from the POST request
#         data = request.json
#         text = data['text']

#         # Preprocess the text data
#         preprocessed_text = preprocess_text(text)

#         # Vectorize the preprocessed text data
#         text_vector = tfidf_vectorizer.transform([preprocessed_text])

#         # Predict using the trained model
#         prediction = model.predict(text_vector)

#         # Return the predicted category
#         predicted_category = prediction[0]  # Assuming the model returns a single category
#         return jsonify({"category": predicted_category})
#     except Exception as e:
#         return jsonify({"error": str(e)})


# if __name__ == "__main__":
#     app.run(port=3000)















###############################################################################################################################




from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS extension
import pickle
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and TF-IDF vectorizer
with open('./ML model/ML_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
with open('./ML model/vectorizer.pkl', 'rb') as vectorizer_file:
    tfidf_vectorizer = pickle.load(vectorizer_file)

# Preprocessing function
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    tokens = word_tokenize(text)
    tokens = [token.lower() for token in tokens]
    tokens = [token for token in tokens if token not in string.punctuation]
    tokens = [token for token in tokens if token not in stop_words]
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return " ".join(tokens)

# Define the category mapping
category_mapping = {0: 'Hotel', 1: 'Restaurant', 2: 'Gym', 3: 'Coaching', 4: 'Spa', 5: 'Consultant'}

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    query = data.get('query', '')

    # Preprocess the query
    processed_query = preprocess_text(query)

    # Transform the query using the TF-IDF vectorizer
    query_vector = tfidf_vectorizer.transform([processed_query])

    # Predict the category
    predicted_category = model.predict(query_vector)[0]
    predicted_category_name = category_mapping[predicted_category]

    # Return the prediction as a JSON response
    return jsonify({'category': predicted_category_name})

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == '__main__':
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')
    app.run(debug=True)
