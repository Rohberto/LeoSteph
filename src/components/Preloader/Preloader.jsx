import React, { useEffect } from 'react';
import { logo } from "../../constant/images/index";
import './preloader.css';

const Preloader = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = 0; // Fade out
        setTimeout(() => preloader.style.display = 'none', 500); // Hide after fade-out
      }
    }, 5000); // Duration of 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="preloader">
      <img src={logo} alt="Logo" className="preloader-logo" />
    </div>
  );
};

export default Preloader;
