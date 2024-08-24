
import { useState } from 'react';
import './App.css';
import * as yup from 'yup';

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    querytype: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const userSchema = yup.object().shape({
    firstName: yup.string().min(4, "First Name must be at least 4 characters").required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
    querytype: yup.string().oneOf(["general-enquiry", "support-request"], "Invalid query type").required("Query type is required"),
    consent: yup.boolean().oneOf([true], "Consent is required"),
  });

  async function testValidation() {
    try {
      const response = await userSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Validation successful:", response);
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  }

  function handleOnFormSubmit(event) {
    event.preventDefault();
    testValidation();
  }

  function handleOnChange(event) {
    const keyName = event.target.name;
    let keyValue = event.target.value;
    const type = event.target.type;

    if (type === "checkbox") {
      keyValue = event.target.checked;
    }

    setFormData({
      ...formData,
      [keyName]: keyValue,
    });
  }

  return (
    <>
      <div className="contact">
        <form onSubmit={handleOnFormSubmit} className="contact-form">
          <h2>Contact Us</h2>

          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              onChange={handleOnChange}
              value={formData.firstName}
              type="text"
              id="firstName"
              name="firstName"
              className={errors.firstName ? 'error-border' : ''}
              
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              onChange={handleOnChange}
              value={formData.lastName}
              type="text"
              id="lastName"
              name="lastName"
              className={errors.lastName ? 'error-border' : ''}
              
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              onChange={handleOnChange}
              value={formData.email}
              type="email"
              id="email"
              name="email"
              className={errors.email ? 'error-border' : ''}
              
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
  <label htmlFor="query-type">Query Type *</label>
  <div className="radio-group">
    <div className={`box1 ${errors.querytype ? 'error-box' : ''}`}>
      <input
        onChange={handleOnChange}
        type="radio"
        id="general-enquiry"
        name="querytype"
        value="general-enquiry"
      />
      <label htmlFor="general-enquiry">General Enquiry</label>
    </div>
    <div className={`box2 ${errors.querytype ? 'error-box' : ''}`}>
      <input
        onChange={handleOnChange}
        type="radio"
        id="support-request"
        name="querytype"
        value="support-request"
      />
      <label htmlFor="support-request">Support Request</label>
    </div>
  </div>
  {errors.querytype && <div className="error-message">{errors.querytype}</div>}
</div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              onChange={handleOnChange}
              value={formData.message}
              name="message"
              id="message"
              className={errors.message ? 'error-border' : ''}
             
            ></textarea>
            {errors.message && <div className="error-message">{errors.message}</div>}
          </div>

          <div className="form-group">
            <input
              onChange={handleOnChange}
              checked={formData.consent}
              type="checkbox"
              id="consent"
              name="consent"
              className={errors.consent ? 'error-border' : ''}
              required
            />
            <label htmlFor="consent">I consent to being contacted by the team *</label>
            {errors.consent && <div className="error-message">{errors.consent}</div>}
          </div>

          <div className="form-group">
            <button type="submit" disabled={!formData.consent}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
