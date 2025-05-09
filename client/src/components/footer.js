// client/src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} BKS Formation - Tous droits réservés</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#222',
    color: '#fff',
    padding: '10px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center'
  }
};

export default Footer;
