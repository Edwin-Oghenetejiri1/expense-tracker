import React from 'react';
import axios from 'axios';

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  description: {
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  meta: {
    fontSize: '0.8rem',
    color: '#888',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  amount: {
    fontWeight: '700',
    fontSize: '1rem',
  },
  deleteBtn: {
    background: '#fee2e2',
    color: '#e74c3c',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '0.8rem',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    padding: '2rem',
  },
};

const categoryEmojis = {
  salary: '💼',
  freelance: '💻',
  investment: '📈',
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  shopping: '🛍️',
  bills: '📄',
  health: '🏥',
  other: '💰',
};

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>📋 Transaction History</div>
      {transactions.length === 0 ? (
        <div style={styles.empty}>No transactions yet. Add one above!</div>
      ) : (
        transactions.map((t) => (
          <div key={t._id} style={styles.item}>
            <div style={styles.left}>
              <div style={styles.description}>
                {categoryEmojis[t.category]} {t.description}
              </div>
              <div style={styles.meta}>
                {t.category} •{' '}
                {new Date(t.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div style={styles.right}>
              <div
                style={{
                  ...styles.amount,
                  color: t.type === 'income' ? '#2ecc71' : '#e74c3c',
                }}
              >
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;