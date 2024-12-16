import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import your CSS file here
import UserContext, { UserProvider } from './context/UserContext'; // Import UserContext
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
  const [user, setUser] = useState(null); // Manage user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <App />
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
