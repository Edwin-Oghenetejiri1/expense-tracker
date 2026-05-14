import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCards from '../components/SummaryCards';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import Chart from '../components/Chart';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#888',
    fontSize: '1.1rem',
  },
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expenses: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data.transactions);
      setSummary(res.data.summary);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading your finances... 💰</div>;
  }

  return (
    <div style={styles.container}>
      <SummaryCards summary={summary} />
      <AddTransaction onAdd={fetchTransactions} />
      <Chart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        onDelete={fetchTransactions}
      />
    </div>
  );
};

export default Dashboard;