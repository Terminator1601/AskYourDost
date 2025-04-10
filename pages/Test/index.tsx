import React from 'react';
import axios from 'axios';

const callApiWithToken = async () => {
    try {
        // Retrieve the token from a secure source, e.g., localStorage or a context
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NDMwNDcyLCJpYXQiOjE3Mzk0Mjk1NzIsImp0aSI6ImZhY2Q4YjM5ZWJlZDRhZWI5OThjZDZhMTdhNmY5Y2NiIiwidXNlcl9pZCI6IjNmMjBjYWZlLTMyNDctNDE1MS1iNzg1LTliMjQ0MTk4NDkzNiJ9.iUfTDDC9HDz3M9nqZeyChurfA4tRRkUcDBy2nBaIUvE" // Example: Replace with your actual method of retrieving the token

        if (!token) {
            console.error('Token is missing');
            return;
        }

        const response = await axios.get('http://localhost:8000/api/v1/auth/verify-email/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleStripeCheckout = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/checkout-stripe/', {
             // Replace with your actual price ID
        }, {
            headers: {
                'Content-Type': 'application/json',
                'price': 'price_1Qs0sgP0AiJhsRtLzMjCe1oq',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NTI1NDQxLCJpYXQiOjE3Mzk1MjQ1NDEsImp0aSI6ImMzMGVmOTQxNDVmMzQ1MjA5MjJlNGRmYTk5MzYwZjdhIiwidXNlcl9pZCI6IjkwY2MxMGQ4LTkxOTctNGNmMi1iNDc3LThhOTAwNzM1ZTg1NCIsIm9yZ2FuaXphdGlvbl9pZCI6Ijc1ZjdhNDMxLWQ1YzEtNDAzNS05ZDZkLTAwZTZkOWViYTA1OCJ9.2cX25ZwrhVeA8W1jq9Xn9V8cDbgTT19Vd9yCtg9aDlM` // Replace with your actual token
            },
            // timeout: 5000 // Set timeout to 5000ms (5 seconds)
        });

        console.log('Stripe Checkout Session:', response.data);
        window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
    }
};

const YourComponent = () => {
    return (
        <div>
            <button onClick={callApiWithToken}>Verify Email</button>
            <button onClick={handleStripeCheckout}>Checkout with Stripe</button>
        </div>
    );
};

export default YourComponent;
