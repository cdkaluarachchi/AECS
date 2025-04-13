const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8003;

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
  console.log('Connected to MongoDB (Booking Service)');
});

app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Booking Service listening on port ${PORT}`);
});