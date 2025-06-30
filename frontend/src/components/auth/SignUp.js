import React, { useState } from 'react';
import axios from "../../api/axios"; // axios instance with baseURL http://localhost:5500/api
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '', dob: '', age: '', gender: '', contact: '', NIC: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) {
      error = 'Enter only letters';
    }

    if (name === 'NIC' && (!/^\d*$/.test(value) || value.length > 12)) {
      error = value.length > 12 ? 'Enter only 12 numbers' : 'NIC should contain only numbers';
    }

    if (name === 'contact' && (!/^\d*$/.test(value) || value.length > 10)) {
      error = value.length > 10 ? 'Contact number should be 10 digits' : 'Contact should contain only numbers';
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleKeyDown = (e, fieldName) => {
    if (fieldName === 'name') {
      if (!/^[a-zA-Z\s]+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, name: 'Only letters are allowed' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }
    if (fieldName === 'NIC') {
      if (!/^\d+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, NIC: 'Only numbers are allowed' });
      } else {
        setErrors({ ...errors, NIC: '' });
      }
    }
    if (fieldName === 'contact') {
      if (!/^\d+$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        setErrors({ ...errors, contact: 'Only numbers are allowed' });
      } else {
        setErrors({ ...errors, contact: '' });
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Full Name is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.name)) newErrors.name = 'Enter only letters';

    if (!formData.NIC) newErrors.NIC = 'NIC is required';
    else if (!/^\d{12}$/.test(formData.NIC)) {
      newErrors.NIC = 'NIC should be exactly 12 numbers';
    }

    if (!formData.contact) newErrors.contact = 'Contact Number is required';
    else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact should be exactly 10 numbers';
    }

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
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
      const response = await axios.post('/auth/register', formData);

      // Assuming your backend responds with a token on successful signup:
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Save token to localStorage
      }

      alert('Registration successful');
      navigate('/login'); // Redirect to login or dashboard as you wish
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                required
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>

            {/* Date of Birth */}
            <div className={styles.formGroup}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`${styles.input} ${errors.dob ? styles.inputError : ''}`}
                required
              />
              {errors.dob && <p className={styles.errorMessage}>{errors.dob}</p>}
            </div>

            {/* Gender and NIC */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.gender ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="NIC">NIC</label>
                <input
                  type="text"
                  name="NIC"
                  id="NIC"
                  placeholder="Enter your NIC"
                  value={formData.NIC}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'NIC')}
                  className={`${styles.input} ${errors.NIC ? styles.inputError : ''}`}
                  required
                />
                {errors.NIC && <p className={styles.errorMessage}>{errors.NIC}</p>}
              </div>
            </div>

            {/* Age and Contact */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  min="0"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                  required
                />
                {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, 'contact')}
                  className={`${styles.input} ${errors.contact ? styles.inputError : ''}`}
                  required
                />
                {errors.contact && <p className={styles.errorMessage}>{errors.contact}</p>}
              </div>
            </div>

            {/* Email */}
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
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>

            {/* Password */}
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
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>

            {/* Sign Up Button */}
            <button type="submit" className={styles.submitBtn}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
