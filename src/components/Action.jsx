import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import bgMembership from '../assets/images/bg-membership.jpg';
import './Action.css';

function Action() {
  return (
    <section id="membership" className="action-section" style={{ backgroundImage: `url(${bgMembership})`, scrollMarginTop: '80px' }}>
      <div className="action-overlay"></div>
      <div className="action-container">
        <div className="action-content standard-card">
          <h2 className="action-title">
            One Membership.<br />
            Limitless Potential.
          </h2>
          <p className="action-description">
            Unlimited Signature Classes, precision-backed Personal Training, and exclusive
            amenities to recover and regenerate.
          </p>
          <a href="#membership" className="cta-link">
            EXPLORE MEMBERSHIP
            <ChevronRightIcon className="cta-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Action;
