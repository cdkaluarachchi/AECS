const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'asdfasdwaewaew2';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cdkaluarachchi:sjhs4k@betterwellness.bdn3m38.mongodb.net/?retryWrites=true&w=majority&appName=betterwellness', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB (Auth Service)');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service listening on port ${PORT}`);
});