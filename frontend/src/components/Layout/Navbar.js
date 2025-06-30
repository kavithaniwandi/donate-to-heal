import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Importing the CSS module

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the presence of a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Handle Log Out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to Login page after logout
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <h1>
          DonateToHeal<span className={styles.dot}>.</span>
        </h1>
      </div>

      <ul className={styles.navbarLinks}>
        {/* Add links here if needed */}
      </ul>

      <div className={styles.navbarButtons}>
        {isLoggedIn ? (
          <button className={styles.buttonGlow} onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <>
            <button
              className={styles.buttonGlass}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className={styles.buttonFlip}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
