import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const Logout = () => {
  const { setUser } = useContext(UserContext); 
  const notyf = new Notyf();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setUser(null); // Clear user context
    notyf.success('Logged out successfully!'); 
    navigate('/login'); 
  };

  React.useEffect(() => {
    handleLogout(); 
  }, []);

  return null; 
};

export default Logout;
