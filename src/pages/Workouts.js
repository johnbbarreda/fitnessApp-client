import React, { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../context/UserContext';
import ErrorHandler from '../components/ErrorHandler'; 
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import EditWorkout from '../components/EditWorkout'; 

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]); 
  const { user } = useContext(UserContext);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [error, setError] = useState(null);

  // Initialize Notyf
  const notyf = new Notyf();

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You need to log in to view your workouts.');
      return;
    }

    try {
      const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error fetching workouts: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched workouts:', data); 

      if (Array.isArray(data.workouts)) {
        setWorkouts(data.workouts); 
      } else {
        throw new Error('Fetched data is not an array.');
      }
    } catch (err) {
      console.error('Failed to fetch workouts:', err.message);
      setError(err); 
    }
  };

  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
    setShowPopup(true); 
  };

  // Handle successful deletion of a workout
  const handleDelete = (id) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id)); 
  };

  const handleSave = async (updatedWorkout) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${selectedWorkout._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedWorkout),
      });
      setShowPopup(false); 
      fetchWorkouts(); 
      notyf.success('Workout updated successfully!');
    } catch (error) {
      console.error('Failed to save workout:', error.message);
      notyf.error('Failed to save workout.');
    }
  };

  return (
    <>
      {error && <ErrorHandler error={error} />} 
      
      <div className="container">
        <h2>Your Workouts</h2>

        <div className="row"> 
          {workouts.map(workout => (
            <div className="col-md-4" key={workout._id}> 
              <WorkoutCard 
                workout={workout} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        {selectedWorkout && (
          <EditWorkout 
            show={showPopup} 
            onHide={() => setShowPopup(false)} 
            workoutData={selectedWorkout} 
            onSave={handleSave} 
          />
        )}
      </div>
    </>
  );
};

export default Workouts;
