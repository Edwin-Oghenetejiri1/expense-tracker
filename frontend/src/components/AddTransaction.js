import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    background: 'white',
  },
  btn: {
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    width: '100%',
  },
};

const incomeCategories = ['salary', 'freelance', 'investment', 'other'];
const expenseCategories = [
  'food',
  'transport',
  'entertainment',
  'shopping',
  'bills',
  'health',
  'other',
];

const AddTransaction = ({ onAdd }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: 'salary',
    date: new Date().toISOString().split('T')[0],
  });

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setForm({
      ...form,
      type,
      category: type === 'income' ? 'salary' : 'food',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions', form);
      onAdd();
      setForm({
        description: '',
        amount: '',
        type: 'income',
        category: 'salary',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const categories =
    form.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div style={styles.card}>
      <div style={styles.title}>➕ Add Transaction</div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          style={styles.select}
          value={form.type}
          onChange={handleTypeChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          style={styles.select}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <input
          style={styles.input}
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button style={styles.btn} type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;