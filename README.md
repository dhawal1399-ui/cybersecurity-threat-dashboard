<<<<<<< HEAD
# cybersecurity-threat-dashboard
=======
# Cybersecurity Threat Management Dashboard

## 🚀 Overview
This is a **Cybersecurity Threat Management Dashboard** that provides real-time threat detection and management. It includes an **ML-based threat prediction system**, RESTful APIs, authentication, and a modern UI.

## 📌 Features
- **User Authentication** (JWT-based login & registration)
- **Threat Data CRUD Operations**
- **Search & Filter Threats**
- **ML-based Threat Prediction API**
- **Real-time Alerts with WebSockets**
- **Modern UI using React & Material-UI**
- **Containerized with Docker**
- **Unit Testing for APIs**

## 🛠️ Tech Stack
### **Frontend:**
- React
- Redux
- Material-UI

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- Flask (for ML-based Threat Prediction API)

### **Other Tools & Integrations:**
- WebSockets (for real-time updates)
- Docker (for containerization)
- Jest & Supertest (for unit testing)

## 📦 Installation
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/yourusername/cybersecurity-dashboard.git
cd cybersecurity-dashboard
```

### **2️⃣ Backend Setup (Node.js & Express)**
```sh
cd backend
npm install
npm start
```

### **3️⃣ ML API Setup (Flask & Python)**
```sh
cd ml-api
pip install -r requirements.txt
python app.py
```

### **4️⃣ Frontend Setup (React & Redux)**
```sh
cd frontend
npm install
npm start
```

## 🔥 API Endpoints
### **Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### **Threat Management**
- `GET /api/threats` - Fetch all threats
- `POST /api/threats` - Add a new threat
- `PUT /api/threats/:id` - Update a threat
- `DELETE /api/threats/:id` - Remove a threat

### **ML Prediction API**
- `POST /predict` - Predict threat status from input (IP/URL)
```json
{
  "input": "malicious-site.com"
}
```
Response:
```json
{
  "score": 0.9,
  "status": "malicious"
}
```

## 🐳 Docker Setup
To run the entire application with Docker:
```sh
docker-compose up --build
```

## 🧪 Running Tests
To run backend tests:
```sh
cd backend
npm test
```
To test the ML API:
```sh
cd ml-api
pytest
```

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

## 📜 License
This project is licensed under the **MIT License**.

>>>>>>> 49d18a15 (Initial commit - Cybersecurity Threat Management Dashboard)
