import React from 'react';
import EditWorkout from './EditWorkout'; 
import DeleteWorkout from './DeleteWorkout'; 

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  
  const handleEdit = () => {
    onEdit(workout); 
  };

  return (
    <div className="workout-card card mb-3"> 
      <div className="card-body">
        <h5 className="card-title">{workout.name}</h5>
        <p className="card-text">Duration: {workout.duration} minutes</p>
        <p className="card-text">Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</p>
        <p className="card-text">Status: {workout.status}</p>
        
        {/* Edit button */}
        <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
        
        {/* Delete button */}
        <DeleteWorkout 
          workoutId={workout._id} 
          onDeleteSuccess={onDelete} 
        />
      </div>
    </div>
  );
};

export default WorkoutCard;
