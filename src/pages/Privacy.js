import React from 'react';

const Privacy = () => {
  return (
    <div style={styles.page}>
      <div style={styles.glassPanel}>
        <h1 style={styles.heading}>Privacy Policy & Terms and Conditions</h1>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>Privacy Policy</h2>
          <p style={styles.text}>
            FitFusion values your privacy and security. We collect user data solely to provide accurate, personalized diet and workout recommendations. All personal details are encrypted and not shared with third-party services without your permission.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>Terms & Conditions</h2>
          <p style={styles.text}>
            By using FitFusion, you agree to comply with our usage terms. The health advice is general and not a substitute for professional consultation. Any misuse of the system may result in access restrictions.
          </p>
        </section>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px'
  },
  glassPanel: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#fff'
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#ffffff',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
  },
  section: {
    marginBottom: '25px'
  },
  subHeading: {
    fontSize: '1.8rem',
    color: '#ffeaa7',
    marginBottom: '10px'
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#f5f6fa'
  }
};

export default Privacy;
