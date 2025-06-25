import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: 'Signature Classes',
      description: 'Novus et infinitus cursus, solum pro Equinox. Conceptus ad individuum. Sustentatur ab communitate.',
      cta: 'Join now',
      backgroundImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1875&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Personal Training',
      description: 'Novus et infinitus cursus, solum pro Equinox. Conceptus ad individuum. Sustentatur ab communitate.',
      cta: 'Join now',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1770&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Cross Training',
      description: 'Novus et infinitus cursus, solum pro Equinox. Conceptus ad individuum. Sustentatur ab communitate.',
      cta: 'Join now',
      backgroundImage: 'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?q=80&w=1770&auto=format&fit=crop'
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="plans" className="carousel-section" style={{ scrollMarginTop: '80px' }}>
      <div className="carousel-container">
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="carousel-slide"
              style={{ backgroundImage: `url(${slide.backgroundImage})`, width: '100vw' }}
            >
              <div className="carousel-card-container">
                <div className="carousel-card standard-card">
                  <h2 className="carousel-title">{slide.title}</h2>
                  <p className="carousel-description">{slide.description}</p>
                  <a href="#membership" className="action-button">
                    JOIN NOW!
                    <ChevronRightIcon className="action-button-arrow" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carousel-controls">
          <button onClick={prevSlide} className="carousel-arrow carousel-arrow-left">
            <ChevronLeftIcon className="arrow-icon" />
          </button>
          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          
          <button onClick={nextSlide} className="carousel-arrow carousel-arrow-right">
            <ChevronRightIcon className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
