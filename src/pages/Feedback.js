import React, { useState } from "react";
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import { useAppContext } from "../utils/AppContext";
import languagePack from "../utils/language";

export default function Feedback() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : 'Leina le a tlhoka';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === 'en' ? 'Name must be at least 2 characters' : 'Leina le tshwanetse go nna ditlhaka tse pedi';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'Email e a tlhoka';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Email is invalid' : 'Email ga e siame';
    }
    
    // Phone validation (now required)
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'en' ? 'Phone number is required' : 'Nomoro ya mogala e a tlhoka';
    } else if (!/^[\+]?[267]?\d{7,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = language === 'en' ? 'Please enter a valid phone number' : 'Tsaya nomoro ya mogala e e siameng';
    }
    
    // Subject validation (now required)
    if (!formData.subject.trim()) {
      newErrors.subject = language === 'en' ? 'Subject is required' : 'Setlhogo se a tlhoka';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = language === 'en' ? 'Subject must be at least 5 characters' : 'Setlhogo se tshwanetse go nna ditlhaka tse tlhano';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Message is required' : 'Molaetsa o a tlhoka';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = language === 'en' ? 'Message must be at least 20 characters' : 'Molaetsa o tshwanetse go nna ditlhaka tse masome a mabedi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show notification for validation errors
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Feedback submitted:', { ...formData, date: new Date().toISOString() });
      setSent(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general"
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackCategories = [
    { value: "general", label: language === 'en' ? 'General Feedback' : 'Kgopolo ka Kakaretso' },
    { value: "service", label: language === 'en' ? 'Service Quality' : 'Boleng jwa Tirelo' },
    { value: "website", label: language === 'en' ? 'Website Feedback' : 'Kgopolo ya Websaete' },
    { value: "suggestion", label: language === 'en' ? 'Suggestion' : 'Tlhagiso' },
    { value: "complaint", label: language === 'en' ? 'Complaint' : 'Dikgotlhang' },
    { value: "emergency", label: language === 'en' ? 'Emergency Contact' : 'Kgolagano ya Tšhogo' }
  ];

  // Check if form is completely filled
  const isFormComplete = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.subject.trim() &&
      formData.message.trim() &&
      formData.message.trim().length >= 20
    );
  };

  return (
    <div className="page feedback-page">
      {/* Notification Banner */}
      {showNotification && (
        <div className="notification-banner error">
          <div className="notification-content">
            <span className="notification-icon">⚠️</span>
            <span>
              {language === 'en' 
                ? 'Please fill in all required fields correctly.'
                : 'Tsweetswee tlatla dintlha tsotlhe tse di tlhokegang ka tsela e e siameng.'}
            </span>
          </div>
          <button 
            className="notification-close"
            onClick={() => setShowNotification(false)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="feedback-header">
        <h1>{language === 'en' ? 'Feedback & Contact' : 'Kgopolo le Kgolagano'}</h1>
        <p className="feedback-subtitle">
          {language === 'en' 
            ? 'All fields are required. We value your feedback and will respond to your message.'
            : 'Dintlha tsotlhe di a tlhokega. Re tlotla kgopolo ya gago mme re tla araba molaetsa wa gago.'}
        </p>
      </div>

      <div className="feedback-content">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-requirements">
            <span className="requirements-text">
              {language === 'en' ? '* All fields are required' : '* Dintlha tsotlhe di a tlhokega'}
            </span>
            {!isFormComplete() && (
              <span className="incomplete-warning">
                {language === 'en' ? 'Please complete all fields' : 'Tsweetswee tlatla dintlha tsotlhe'}
              </span>
            )}
          </div>

          <div className="form-grid">
            <InputField 
              id="name"
              label={language === 'en' ? 'Full Name' : 'Leina ka Botlalo'}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              placeholder={language === 'en' ? 'Enter your full name' : 'Tsaya leina la gago ka botlalo'}
            />

            <InputField 
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
              placeholder="example@email.com"
            />

            <InputField 
              id="phone"
              label={language === 'en' ? 'Phone Number' : 'Nomoro ya Mogala'}
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              required
              placeholder={language === 'en' ? 'e.g., 71234567' : 'sekai, 71234567'}
            />

            <div className="input-group">
              <label className="input-label" htmlFor="category">
                <span className="input-label-text">
                  {language === 'en' ? 'Feedback Category' : 'Karolo ya Kgopolo'}
                  <span className="required"> *</span>
                </span>
                <select
                  id="category"
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  required
                >
                  {feedbackCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <InputField 
              id="subject"
              label={language === 'en' ? 'Subject' : 'Setlhogo'}
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              error={errors.subject}
              required
              placeholder={language === 'en' ? 'Brief subject of your feedback' : 'Setlhogo se se khutshwane sa kgopolo ya gago'}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="message">
              <span className="input-label-text">
                {language === 'en' ? 'Your Message' : 'Molaetsa wa Gago'}
                <span className="required"> *</span>
              </span>
              <textarea 
                id="message"
                className={`input-field ${errors.message ? 'error' : ''}`}
                rows="6" 
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder={language === 'en' 
                  ? 'Please provide detailed feedback (minimum 20 characters)...' 
                  : 'Akanya go naya kgopolo e e tlatsletseng (ditlhaka tse masome a mabedi go feta)...'}
                required
              />
            </label>
            {errors.message && <span className="error-text">{errors.message}</span>}
            <div className={`character-count ${formData.message.length < 20 ? 'insufficient' : 'sufficient'}`}>
              {formData.message.length} / 20 {language === 'en' ? 'characters minimum' : 'ditlhaka tse di tlhokegang'}
              {formData.message.length >= 20 && <span className="check-mark"> ✓</span>}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`btn primary ${isSubmitting ? 'loading' : ''} ${!isFormComplete() ? 'disabled' : ''}`}
              disabled={isSubmitting || !isFormComplete()}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  {language === 'en' ? 'Sending...' : 'E romela...'}
                </>
              ) : (
                language === 'en' ? 'Send Feedback' : 'Romela Kgopolo'
              )}
            </button>
            
            {!isFormComplete() && (
              <div className="completion-hint">
                {language === 'en' 
                  ? 'Fill all fields to enable send button'
                  : 'Tlatla dintlha tsotlhe go kgontsha konopo ya go romela'}
              </div>
            )}
          </div>
        </form>

        <div className="contact-info-sidebar">
          <div className="contact-card">
            <h3>{language === 'en' ? 'Contact Information' : 'Tshedimosetso ya Kgolagano'}</h3>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <strong>{language === 'en' ? 'Emergency' : 'Tšhogo'}</strong>
                <p>997 / 911</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <strong>{language === 'en' ? 'Main Line' : 'Mogala wa Botlhao'}</strong>
                <p>(+267) 363-2500</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <strong>Email</strong>
                <p>feedback@health.gov.bw</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <strong>{language === 'en' ? 'Address' : 'Aterese'}</strong>
                <p>Plot 54069, 24 Amos Street<br />Gaborone, Botswana</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-details">
                <strong>{language === 'en' ? 'Response Time' : 'Nako ya Karabo'}</strong>
                <p>{language === 'en' ? 'Within 48 hours' : 'Ka within diura di le 48'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {sent && (
        <Modal 
          title={language === 'en' ? "Feedback Sent Successfully!" : "Kgopolo e Rometswe ka Katlego!"} 
          onClose={() => setSent(false)}
          size="small"
        >
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h4>{language === 'en' ? 'Thank You!' : 'Re a leboga!'}</h4>
            <p>
              {language === 'en' 
                ? 'Your feedback has been successfully submitted. We appreciate your input and will respond within 48 hours.'
                : 'Kgopolo ya gago e rometswe ka katlego. Re tlotla kgopolo ya gago mme re tla araba ka within diura di le 48.'}
            </p>
            <div className="success-details">
              <p><strong>{language === 'en' ? 'Reference ID:' : 'Nomoro ya Tshekatsheko:'}</strong> FB-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}