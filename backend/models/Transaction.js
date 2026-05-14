const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type is required'],
    },
    category: {
      type: String,
      enum: [
        'salary',
        'freelance',
        'investment',
        'food',
        'transport',
        'entertainment',
        'shopping',
        'bills',
        'health',
        'other',
      ],
      required: [true, 'Category is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);