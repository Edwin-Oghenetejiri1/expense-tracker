import React from 'react';

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.85rem',
  },
};

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div>
        <div style={styles.logo}>💰 ExpenseTracker</div>
        <div style={styles.subtitle}>Track your income and expenses</div>
      </div>
    </nav>
  );
};

export default Navbar;