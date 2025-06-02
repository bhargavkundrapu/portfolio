import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length > 80) {
      newErrors.name = "Name is too long";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Enter your email";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    // Phone validation - optional but if provided should be valid
    if (formData.phone.trim() && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Enter your Message";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission (remove this when you have a real endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "e386d127-8d17-40af-a856-e4df27798f9e",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: "New Contact Message from your Portfolio",
          from_name: "Portfolio"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      setIsSuccess(true);
      setMessage("Success. Message sent successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      {/* Form with neat border and proper styling */}
      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Honeypot field for bot protection */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          {/* Name Field */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              autoComplete="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && (
              <div className="error-message">
                <small>{errors.name}</small>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              autoComplete="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <div className="error-message">
                <small>{errors.email}</small>
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (Optional)"
              autoComplete="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && (
              <div className="error-message">
                <small>{errors.phone}</small>
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`form-textarea ${errors.message ? 'error' : ''}`}
            />
            {errors.message && (
              <div className="error-message">
                <small>{errors.message}</small>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button">
            {isSubmitting ? (
              <div className="loading-state">
                <svg
                  className="loading-spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div className={`status-message ${isSuccess ? 'success' : 'error'}    `}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}