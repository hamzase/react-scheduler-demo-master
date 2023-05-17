import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Welcome() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Send a GET request to the backend to log the user out
    fetch('http://localhost:8083/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Logout was successful, navigate back to the login page
          navigate('/');
        } else {
          // Logout was unsuccessful, display an error message
          console.log('Logout error:', data.message);
        }
      });
  };

  return (
    <div>
      <h1>Welcome,</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Welcome;
