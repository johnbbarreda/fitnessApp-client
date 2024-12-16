import React, { useEffect } from 'react';
import { Notyf } from 'notyf'; // Import Notyf
import 'notyf/notyf.min.css'; // Import Notyf CSS

const ErrorHandler = ({ error }) => {
  useEffect(() => {
    if (error) {
      const notyf = new Notyf(); // Initialize Notyf
      notyf.error(error.message); // Show error notification
    }
  }, [error]);

  return null; // This component doesn't render anything visible
};

export default ErrorHandler;
