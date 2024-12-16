import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import UserContext from '../context/UserContext'; 

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      <h1>Welcome to the Fitness Tracker</h1>
      <p>Track your workouts and progress!</p>

      {/* Show login and register links only if the user is not logged in */}
      {!user ? (
        <div className="mt-4">
          <p>Please log in or register to start tracking your workouts:</p>
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      ) : (
        // Show links for logged-in users
        <div className="mt-4">
          <p>Welcome back! Here are your options:</p>
          <Link to="/workouts" className="btn btn-info me-2">My Workouts</Link>
          <Link to="/add-workout" className="btn btn-success">Add Workout</Link>
          <Link to="/logout" className="btn btn-danger">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
