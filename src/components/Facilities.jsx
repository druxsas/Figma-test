import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import bgFacilities from '../assets/images/bg-facilities.jpg';
import './Facilities.css';

const Facilities = () => {
  return (
    <section id="benefits" className="facilities-section" style={{ backgroundImage: `url(${bgFacilities})`, scrollMarginTop: '80px' }}>
      <div className="facilities-container">
        <div className="facilities-content-card standard-card">
          <h2 className="facilities-title">
            More than a Gym.<br />
            Your second Home.
          </h2>
          <p className="facilities-description">
            A place where fitness meets comfort. Experience a welcoming community,
            personalized support, and state-of-the-art facilities designed to make you feel at
            home while achieving your goals.
          </p>
          <a href="#book-visit" className="action-button">
            BOOK A VISIT
            <ChevronRightIcon className="action-button-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
