import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext); 

  // Initialize Notyf
  const notyf = new Notyf();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); 

      if (response.ok) { 
        localStorage.setItem('token', data.access); 
        console.log('Token stored:', data.access);
        setUser({ email }); 
        notyf.success('Login successful!'); 
      } else {
        const errorMessage = data.message || 'Login failed'; 
        console.error('Login failed:', errorMessage);
        notyf.error(errorMessage); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      notyf.error('An error occurred while logging in.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleLogin}>
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
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
