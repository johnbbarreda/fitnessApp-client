import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext'; // Import UserContext
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout'; 
import Logout from './pages/Logout'; 
import NavigationBar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for token on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Optionally set more user data if available
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* Provide user context */}
      <Router>
        <NavigationBar />
        <div className="app-container">
          <Routes>
            {/* Redirect logged-in users away from login and register pages */}
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            
            {/* Redirect non-logged-in users away from workouts, add-workout, and logout pages */}
            <Route path="/workouts" element={user ? <Workouts /> : <Navigate to="/" />} />
            <Route path="/add-workout" element={user ? <AddWorkout /> : <Navigate to="/" />} />
            <Route path="/logout" element={user ? <Logout /> : <Navigate to="/" />} />

            {/* Public route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
