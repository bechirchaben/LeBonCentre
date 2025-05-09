// client/src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Comparateur</h1>
    </header>
  );
};

const styles = {
  header: {
    background: '#222',
    color: '#fff',
    padding: '20px',
    textAlign: 'center'
  }
};

export default Header;
