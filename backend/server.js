const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'expense-tracker-backend' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
// Error handler
app.use((err, req, res, next) => {
  console.error('ERROR STACK:', err.stack);
  res.status(500).json({ message: err.message });
});