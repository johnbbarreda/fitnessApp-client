import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const AddWorkout = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const { user } = useContext(UserContext); 
  const notyf = new Notyf();

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (!user) {
      notyf.error('You must be logged in to add a workout.');
      return;
    }

    const token = localStorage.getItem('token'); 
    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, duration }),
      });

      const data = await response.json();
      console.log('Add Workout Response:', data);

      if (response.ok) {
        notyf.success('Workout added successfully!');
        setName('');
        setDuration('');
      } else {
        notyf.error(data.message || 'Failed to add workout.');
      }
    } catch (error) {
      console.error('Error adding workout:', error);
      notyf.error('An error occurred while adding the workout.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add Workout</h2>
      <Form onSubmit={handleAddWorkout}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Workout Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter workout name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formBasicDuration">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter duration" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Add Workout
        </Button>
      </Form>
    </Container>
  );
};

export default AddWorkout;
