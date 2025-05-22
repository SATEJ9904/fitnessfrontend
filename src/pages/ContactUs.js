import React from 'react';

const ContactUs = () => {
  const styles = {
    container: {
      background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      minHeight: '100vh',
    },
    title: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '20px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    },
    detail: {
      fontSize: '1.1rem',
      margin: '15px 0',
      color: '#444',
    },
    socials: {
      marginTop: '20px',
    },
    link: {
      margin: '0 10px',
      color: '#0077cc',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Us</h2>
      <div style={styles.card}>
        <p style={styles.detail}>Name: FitFusion Wellness</p>
        <p style={styles.detail}>Email: contact@fitfusion.com</p>
        <p style={styles.detail}>Phone: +91 98765 43210</p>
        <p style={styles.detail}>
          Address: FitFusion Wellness Center, 2nd Floor, Healthy Life Plaza,<br />
          Kolhapur, Maharashtra- 416122, India
        </p>
        <div style={styles.socials}>
          <a href="https://facebook.com" style={styles.link} target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://twitter.com" style={styles.link} target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://instagram.com" style={styles.link} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
