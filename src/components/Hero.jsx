import React, { useEffect, useRef } from 'react';
import bgHero from '../assets/images/bg-hero.jpg';
import './Hero.css';

const Hero = () => {
  const parallaxRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // The parallax effect moves the image slower than the scroll
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" style={{ scrollMarginTop: '80px' }}>
      <div className="parallax-bg" ref={parallaxRef} style={{ backgroundImage: `url(${bgHero})` }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">RECTANGLE'S HOT SALE</h1>
        <p className="hero-subtitle">JOIN TODAY AND GET $0 INITIATION. OFFERS ENDS THIS WEEK!</p>
        <button className="hero-button smooth-hover-btn">JOIN NOW!</button>
      </div>
    </section>
  );
};

export default Hero;
