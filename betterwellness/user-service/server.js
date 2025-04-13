const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(authenticateToken); 

mongoose.connect('mongodb+srv://cdkaluarachchi:sjhs4k@betterwellness.bdn3m38.mongodb.net/?retryWrites=true&w=majority&appName=betterwellness', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB (User Service)');
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});