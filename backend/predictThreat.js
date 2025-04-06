const axios = require('axios');

axios.post('http://127.0.0.1:5000/predict', {
    input: 'malicious.com'
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log('✅ Prediction Response:', response.data);
    })
    .catch(error => {
        console.error('❌ Error:', error.response?.data || error.message);
    });
