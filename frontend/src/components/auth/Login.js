import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5500/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      console.log('Login successful', response.data);
      alert('Login successful');
      navigate('/profile');
    } catch (error) {
      console.error('Login failed', error);
      setErrors({ general: 'Login failed. Please check your credentials and try again.' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              required
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              required
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>Login</button>

          {errors.general && (
            <p className={`${styles.errorMessage} ${styles.generalError}`}>{errors.general}</p>
          )}
        </form>

        <div className={styles.signupLink}>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className={styles.link}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
