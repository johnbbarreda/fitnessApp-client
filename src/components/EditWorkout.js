import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const EditWorkout = ({ show, onHide, workoutData, onSave }) => {
  const [formData, setFormData] = React.useState(workoutData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call the save function passed as a prop
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group controlId="formWorkoutDuration">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control 
              type="text" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group controlId="formWorkoutDateAdded">
            <Form.Label>Date Added</Form.Label>
            <p>{new Date(workoutData.dateAdded).toLocaleDateString()}</p> {/* Display date added */}
          </Form.Group>

          <Form.Group controlId="formWorkoutStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              type="text" 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkout;
