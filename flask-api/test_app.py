import pytest
import requests

BASE_URL = "http://localhost:5001"

def test_predict_safe():
    response = requests.post(f"{BASE_URL}/predict", json={"input": "google.com"})
    data = response.json()
    assert response.status_code == 200
    assert "score" in data
    assert "status" in data
    assert data["status"] == "safe"

def test_predict_malicious():
    response = requests.post(f"{BASE_URL}/predict", json={"input": "malicious-site.com"})
    data = response.json()
    assert response.status_code == 200
    assert data["status"] == "malicious"
