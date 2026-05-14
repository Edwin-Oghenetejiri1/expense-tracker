import React from 'react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.85rem',
    color: '#888',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  amount: {
    fontSize: '1.8rem',
    fontWeight: '700',
  },
};

const SummaryCards = ({ summary }) => {
  const { balance, income, expenses } = summary;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.label}>💳 Total Balance</div>
        <div
          style={{
            ...styles.amount,
            color: balance >= 0 ? '#2ecc71' : '#e74c3c',
          }}
        >
          ${balance.toLocaleString()}
        </div>
      </div>
      <div style={styles.card}>
        <div style={styles.label}>📈 Total Income</div>
        <div style={{ ...styles.amount, color: '#2ecc71' }}>
          ${income.toLocaleString()}
        </div>
      </div>
      <div style={styles.card}>
        <div style={styles.label}>📉 Total Expenses</div>
        <div style={{ ...styles.amount, color: '#e74c3c' }}>
          ${expenses.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;