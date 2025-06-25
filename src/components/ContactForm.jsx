import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import bgFormImage from '../assets/images/bg-form.jpg';
import './ContactForm.css';

const ContactForm = () => {
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
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const recaptchaRef = useRef(null);

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
        // USA format: (xxx) xxx-xxxx or xxx-xxx-xxxx
        if (!/^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/.test(value)) {
          errorMsg = 'Use format (XXX) XXX-XXXX or XXX-XXX-XXXX';
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

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      setSubmitStatus({ success: false, message: 'Please complete the captcha' });
      return;
    }
    
    setSubmitting(true);
    setSubmitStatus(null);
    
    // These are test values. You should register with EmailJS and replace these values.
    // https://www.emailjs.com/
    const serviceId = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your service ID
    const templateId = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your template ID
    const userId = 'YOUR_EMAILJS_USER_ID'; // Replace with your user ID
    
    // Prepare the submission object
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      reply_to: formData.email,
      address: formData.address,
      phone: formData.phoneNumber,
      message: `Name: ${formData.firstName} ${formData.lastName}\nAddress: ${formData.address}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber}`
    };
    
    // Send the email
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((result) => {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! We will contact you soon.'
        });
        // Reset the form
        setFormData({
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          phoneNumber: '',
          consent: false
        });
        // Reset the captcha
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          setCaptchaVerified(false);
        }
      }, (error) => {
        setSubmitStatus({
          success: false,
          message: 'Error sending the message. Please try again.'
        });
        console.error('Error sending the email:', error);
      })
      .finally(() => {
        setSubmitting(false);
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
                    placeholder="(123) 456-7890"
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
                
                <div className="recaptcha-container">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is the test key from Google
                    onChange={handleCaptchaChange}
                  />
                </div>
                
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <div className="form-submit">
                  <button 
                    type="submit" 
                    className={`submit-button ${!formValid || !captchaVerified || submitting ? 'disabled' : ''}`}
                    disabled={!formValid || !captchaVerified || submitting}
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

export default ContactForm;
