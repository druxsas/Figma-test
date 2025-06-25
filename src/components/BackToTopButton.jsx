import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import './BackToTopButton.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when scrolled past the Hero section (100vh)
      if (scrollTop > windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect if we're near the footer to move the button up
      // Subtly increase the distance so the button activates a bit earlier
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      if (distanceFromBottom <= 180) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Use the browser's native smooth scroll for maximum naturalness
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? 'visible' : ''} ${isNearFooter ? 'near-footer' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="back-to-top-icon" />
    </button>
  );
};

export default BackToTopButton;
