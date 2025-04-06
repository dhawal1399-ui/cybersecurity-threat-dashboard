from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Simple rule-based system to predict maliciousness (example)
def predict_threat(ip_or_url):
    if "malicious" in ip_or_url:  # Dummy rule: If "malicious" is in the URL/IP, classify as malicious
        return {"score": 0.9, "status": "malicious"}
    else:
        return {"score": 0.1, "status": "safe"}

# from flask import Flask, request, jsonify

# app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_value = data.get('input', '')

    result = {
        "input": input_value,
        "status": "malicious" if "malicious" in input_value else "safe",
        "score": 0.9 if "malicious" in input_value else 0.1
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)






