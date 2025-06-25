import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logoRA from '../assets/images/logo_RA.svg';
import './NavBar.css';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to handle window resize changes
  const handleResize = () => {
    // If window is larger than 900px (desktop view) and menu is open, close it
    if (window.innerWidth > 900 && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Control navbar visibility based on scroll direction
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // If at the top, always show the navbar
    if (currentScrollY < 50) {
      setVisible(true);
    } else {
      // Determine if scrolling down or up
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setVisible(false);
        
        // If mobile menu is open, close it
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }
    }
    
    // Update last scroll position
    setLastScrollY(currentScrollY);
  };

  // Custom smooth scroll function for menu links
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - 80; // Offset for fixed navbar
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds for smoother scroll
    let startTime = null;

    // Smoother easing function (ease-in-out)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeInOutCubic(progress);
      const newPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, newPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Click handler for links
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  // Add event listeners when component mounts
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <a 
            href="#hero" 
            className="logo-link"
            onClick={(e) => handleLinkClick(e, 'hero')}
          >
            <img src={logoRA} alt="Logo" className="logo-icon" />
            <span className="logo-text">RA_GYM</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? 
              <XMarkIcon className="menu-icon" /> : 
              <Bars3Icon className="menu-icon" />
            }
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links-desktop">
          <a 
            href="#membership" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'membership')}
          >
            Membership
          </a>
          <a 
            href="#plans" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'plans')}
          >
            Plans
          </a>
          <a 
            href="#benefits" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'benefits')}
          >
            Benefits
          </a>
          <a 
            href="#benefits" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'benefits')}
          >
            Visit Us
          </a>
          <a 
            href="#get-in-touch" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'get-in-touch')}
          >
            Get in Touch
          </a>
        </div>

        {/* Desktop Action Buttons */}
        <div className="nav-buttons-desktop">
          <button className="btn-new-members smooth-hover-btn" data-component-name="NavBar">New Members</button>
          <button className="btn-login smooth-hover-btn-outline" data-component-name="NavBar">Login</button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`.trim()}>
          <div className="mobile-nav-links">
            <a 
              href="#membership" 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, 'membership')}
            >
              Membership
            </a>
            <a 
              href="#plans" 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, 'plans')}
            >
              Plans
            </a>
            <a 
              href="#benefits" 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, 'benefits')}
            >
              Benefits
            </a>
            <a 
              href="#benefits" 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, 'benefits')}
            >
              Visit Us
            </a>
            <a 
              href="#get-in-touch" 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, 'get-in-touch')}
            >
              Get in Touch
            </a>
          </div>
          <div className="mobile-nav-buttons">
            <button className="btn-new-members smooth-hover-btn" data-component-name="NavBar">New Members</button>
            <button className="btn-login smooth-hover-btn-outline" data-component-name="NavBar">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
