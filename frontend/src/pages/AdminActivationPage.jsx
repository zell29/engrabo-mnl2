import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../server';

const AdminActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/admin/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
            // Set a success state and display a success message or redirect the user
          })
          .catch((err) => {
            // Check for different types of errors and set appropriate messages
            const message =
              err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'An error occurred during account activation.';
            setError(message);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default AdminActivationPage;
