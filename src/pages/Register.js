import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize Notyf
  const notyf = new Notyf();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Registration Response:', data); 

      if (response.ok) {
        localStorage.setItem('token', data.access); 
        console.log('Token stored:', data.access); 
        notyf.success('Registration successful!'); 

        // Redirect to the Login page after successful registration
        navigate('/login'); // Use navigate to redirect

        // Clear input fields
        setEmail('');
        setPassword('');
      } else {
        notyf.error(data.message || 'Registration failed.'); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
      notyf.error('An error occurred while registering.'); 
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
