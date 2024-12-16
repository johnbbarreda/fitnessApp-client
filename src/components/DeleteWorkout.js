import React from 'react';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const DeleteWorkout = ({ workoutId, onDeleteSuccess }) => {
  const notyf = new Notyf();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workoutId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to delete workout');
        }

        onDeleteSuccess(workoutId); 
        notyf.success('Workout deleted successfully!');
      } catch (error) {
        console.error('Failed to delete workout:', error.message);
        notyf.error('Failed to delete workout.');
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteWorkout;
