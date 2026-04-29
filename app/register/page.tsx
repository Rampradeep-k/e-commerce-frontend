'use client'
import React, { useState } from 'react';
import './RegistrationForm.css';
import { useRouter } from 'next/navigation';
import { ApiCallPOST } from '../api/api-content';
import Loader from '../components/atoms/Loading/page';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  mobile?: string;
}



// Mock ShowAlert function - replace with your actual implementation
const ShowAlert = ({ title, description, type }: any) => {
  console.log(`Alert: ${title} - ${description} (${type})`);
};

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Mobile validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload according to your API requirements
      const payload = {
        user_name: formData.email.split('@')[0], // Using email prefix as username
        email: formData.email,
        phone: `+1${formData.mobile}`, // Adding country code
        password: formData.password,
      };

      // Make API call
      await ApiCallPOST(payload, '/users');
      
      // Show success alert
      ShowAlert({
        title: 'Created Successfully',
        description: 'User has been created.',
        type: 'success',
      });

      // Set success state and reset form
      setIsSuccess(true);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
      });

      // Redirect to login page after 1.5 seconds
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        ...errors,
        email: 'Registration failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Loader spinning={isSubmitting} />
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h2>Create Account</h2>
        </div>

        {isSuccess && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              className={errors.password ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock"></i> Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={errors.confirmPassword ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">
              <i className="fas fa-phone"></i> Mobile Number
            </label>
            <div className="mobile-input-container">
              <span className="country-code">+91</span>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={errors.mobile ? 'error' : ''}
                disabled={isSubmitting}
                maxLength={10}
              />
            </div>
            {errors.mobile && <div className="error-message">{errors.mobile}</div>}
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="login-link">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default RegistrationForm;