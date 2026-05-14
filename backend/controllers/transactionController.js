const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    res.status(200).json({
      transactions,
      summary: { balance, income, expenses },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      description,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };