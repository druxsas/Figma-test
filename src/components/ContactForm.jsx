import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import bgFormImage from '../assets/images/bg-form.jpg';
import './ContactForm.css';

const ContactFormContent = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    consent: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: ''
  });

  const [formValid, setFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validate field by field
  const validateField = (name, value) => {
    let errorMsg = '';
    
    switch(name) {
      case 'firstName':
      case 'lastName':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMsg = 'Only letters are allowed';
        }
        break;
      case 'address':
        if (!/^[A-Za-z0-9\s,.#-]+$/.test(value)) {
          errorMsg = 'Enter a valid address';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Invalid email';
        }
        break;
      case 'phoneNumber':
        // Only allow numbers (digits)
        if (!/^\d+$/.test(value)) {
          errorMsg = 'Only numbers are allowed';
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    if (type !== 'checkbox') {
      const errorMsg = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: errorMsg
      }));
    }
  };
  
  // Check general validity of the form
  useEffect(() => {
    const isFormFilled = Object.keys(formData).every(key => {
      if (key === 'consent') return formData[key] === true;
      return formData[key].trim() !== '';
    });
    
    const hasNoErrors = Object.values(errors).every(error => error === '');
    
    setFormValid(isFormFilled && hasNoErrors);
  }, [formData, errors]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      setSubmitStatus({ success: false, message: 'reCAPTCHA not available right now' });
      return;
    }
    
    setSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Execute reCAPTCHA with action
      const token = await executeRecaptcha('submit_form');
    
    // EmailJS configuration
    // Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/
    const serviceId = 'service_opky32e'; // Your EmailJS Service ID
    const templateId = 'template_jydyj3k'; // Your EmailJS Template ID
    const userId = 'VysixR6Uj_xzhROOc'; // Your EmailJS Public Key

      // Send email with reCAPTCHA token included
      await emailjs.send(
        serviceId,
        templateId,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          'g-recaptcha-response': token, // Include reCAPTCHA token
        },
        userId // Your EmailJS User ID / Public Key
      );
      
      // Success
      setSubmitStatus({ success: true, message: 'Message sent successfully! We will contact you soon.' });
      
      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        consent: false
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus({ success: false, message: 'Failed to send message. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="get-in-touch" className="contact-section" style={{ scrollMarginTop: '80px' }}>
      <div className="contact-background" style={{ backgroundImage: `url(${bgFormImage})` }}></div>
      <div className="contact-overlay"></div>
      <div className="contact-container">
        <div className="contact-form-container">
          <div className="contact-form-content">
            <h2 className="form-title">Get in Touch!</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={errors.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={errors.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, State"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className={errors.phoneNumber ? 'input-error' : ''}
                  />
                  {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                </div>
              </div>
              <div className="form-bottom-section">
                <div className="form-consent">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="consent" className="consent-label">
                    By continuing, I agree to the Rectangle´s Terms & Conditions, Privacy Policy and that RA_ brand companies and their membership advisors can contact me regarding promotions, marketing, products, services, and other information that may interest me.
                  </label>
                </div>
                
                {/* reCAPTCHA v3 is invisible and runs in the background */}
                
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <div className="form-submit">
                  <button 
                    type="submit" 
                    className={`submit-button ${!formValid || submitting ? 'disabled' : ''}`}
                    disabled={!formValid || submitting}
                  >
                    {submitting ? 'Sending...' : 'Send'}
                    {!submitting && (
                      <svg className="cta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Version of the form for environments where reCAPTCHA is not registered (preview deployments)
const ContactFormContentPreview = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    consent: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: ''
  });

  const [formValid, setFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validate field by field
  const validateField = (name, value) => {
    let errorMsg = '';
    
    switch(name) {
      case 'firstName':
      case 'lastName':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMsg = 'Only letters are allowed';
        }
        break;
      case 'address':
        if (!/^[A-Za-z0-9\s,.#-]+$/.test(value)) {
          errorMsg = 'Enter a valid address';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Invalid email';
        }
        break;
      case 'phoneNumber':
        // Only allow numbers (digits)
        if (!/^\d+$/.test(value)) {
          errorMsg = 'Only numbers are allowed';
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    if (type !== 'checkbox') {
      const errorMsg = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: errorMsg
      }));
    }
  };
  
  // Check general validity of the form
  useEffect(() => {
    const isFormFilled = Object.keys(formData).every(key => {
      if (key === 'consent') return formData[key] === true;
      return formData[key].trim() !== '';
    });
    
    const hasNoErrors = Object.values(errors).every(error => error === '');
    
    setFormValid(isFormFilled && hasNoErrors);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In preview mode, we just show a message explaining the captcha situation
    setSubmitStatus({
      success: true,
      message: 'This is a preview environment. The form submission is simulated because reCAPTCHA is only registered for the production domain.'
    });
  };

  return (
    <section id="get-in-touch" className="contact-section" style={{ scrollMarginTop: '80px' }}>
      <div className="contact-background" style={{ backgroundImage: `url(${bgFormImage})` }}></div>
      <div className="contact-overlay"></div>
      <div className="contact-container">
        <div className="contact-form-container">
          <div className="contact-form-content">
            <h2 className="form-title">Get in Touch!</h2>
            <div className="preview-environment-notice">
              <p>ℹ️ You are viewing a preview deployment. reCAPTCHA validation is disabled in preview mode.</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={errors.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={errors.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, State"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className={errors.phoneNumber ? 'input-error' : ''}
                  />
                  {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                </div>
              </div>
              <div className="form-bottom-section">
                <div className="form-consent">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="consent" className="consent-label">
                    By continuing, I agree to the Rectangle´s Terms & Conditions, Privacy Policy and that RA_ brand companies and their membership advisors can contact me regarding promotions, marketing, products, services, and other information that may interest me.
                  </label>
                </div>
                
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <div className="form-submit">
                  <button 
                    type="submit" 
                    className={`submit-button ${!formValid || submitting ? 'disabled' : ''}`}
                    disabled={!formValid || submitting}
                  >
                    {submitting ? 'Sending...' : 'Send'}
                    {!submitting && (
                      <svg className="cta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  // Check if we're in a production or development environment where reCAPTCHA is allowed
  const hostname = window.location.hostname;
  // Allow all vercel.app domains (production) and localhost (development)
  const isAllowedDomain = hostname.includes('vercel.app') || hostname === 'localhost';
  
  // Site key for reCAPTCHA v3
  const RECAPTCHA_SITE_KEY = "6LeXum0rAAAAAPYdYTITa_Eq7J3Jc6NLnLjUQZVq"; // Site key for reCAPTCHA v3
  
  // For local development and production environments where reCAPTCHA is registered
  if (isAllowedDomain) {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'body',
        }}
      >
        <ContactFormContent />
      </GoogleReCaptchaProvider>
    );
  } 
  // For preview deployments or other environments where reCAPTCHA is not registered
  else {
    return <ContactFormContentPreview />;
  }
};

export default ContactForm;
