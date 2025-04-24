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
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)  # Enable CORS for all /api/ endpoints

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
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({'error': 'Missing "query" in request body'}), 400
        query = data.get('query', '')
        if not isinstance(query, str) or not query.strip():
            return jsonify({'error': 'Query must be a non-empty string'}), 400

        # Preprocess the query
        processed_query = preprocess_text(query)

        # Transform the query using the TF-IDF vectorizer
        try:
            query_vector = tfidf_vectorizer.transform([processed_query])
        except Exception as e:
            return jsonify({'error': f'Vectorizer error: {str(e)}'}), 500

        # Predict the category
        try:
            predicted_category = model.predict(query_vector)[0]
            predicted_category_name = category_mapping[predicted_category]
        except Exception as e:
            return jsonify({'error': f'Model prediction error: {str(e)}'}), 500

        # Return the prediction as a JSON response
        return jsonify({'category': predicted_category_name})
    except Exception as e:
        return jsonify({'error': f'Unexpected server error: {str(e)}'}), 500

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == '__main__':
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')
    app.run(debug=True)
