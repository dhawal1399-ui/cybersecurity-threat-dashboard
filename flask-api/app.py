from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained ML model (for demo, we'll use a simple rule-based function)
def predict_threat(ip_or_url):
    if "malicious" in ip_or_url:  # Dummy rule: If "malicious" is in URL/IP, classify as malicious
        return {"score": 0.9, "status": "malicious"}
    else:
        return {"score": 0.1, "status": "safe"}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    ip_or_url = data.get("input")
    if not ip_or_url:
        return jsonify({"error": "Invalid input"}), 400

    prediction = predict_threat(ip_or_url)
    return jsonify(prediction)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
