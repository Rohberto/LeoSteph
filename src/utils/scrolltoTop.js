import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    console.log("yes");
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
