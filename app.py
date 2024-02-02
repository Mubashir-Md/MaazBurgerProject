from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load the trained model and TF-IDF vectorizer
textclf = joblib.load('Notebook_And_Models/model.pkl')
tfidf_vectorizer = joblib.load('Notebook_And_Models/vectorizer.pkl')

# Burger function to calculate burger score based on polarity score
def Burger(input):
    burger = 0
    if input >= 0.8 or input == 1:
        burger += 3
    elif input <= 0.3:
        burger += 0
    elif input > 0.5 and input < 0.8:
        burger += 2
    return burger
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        text = request.form['text']
        prediction = textclf.predict([text])[0]
        polarity_score = textclf.decision_function([text])[0]
        print(polarity_score)
        burger_score = Burger(polarity_score)
        return jsonify({'prediction': prediction, 'burger_score': burger_score})

if __name__ == '__main__':
    app.run(debug=True)
