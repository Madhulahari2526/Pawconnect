require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express'); const cors = require('cors'); const connectDB = require('./config/db'); const { notFound, errorHandler } = require('./middleware/error');
const app = express();
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed by CORS'));
}, credentials: true }));
app.use(express.json({ limit: '1mb' })); app.use(express.urlencoded({ extended: true }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/authRoutes')); app.use('/api/pets', require('./routes/petRoutes')); app.use('/api/users', require('./routes/userRoutes')); app.use('/api/adoptions', require('./routes/adoptionRoutes'));
app.use(notFound); app.use(errorHandler);
const port = process.env.PORT || 5000;
if (require.main === module) {
  connectDB()
    .then(() => app.listen(port, () => console.log(`API listening on ${port}`)))
    .catch((error) => {
      console.error(`Backend startup failed: ${error.message}`);
      console.error('Create backend/.env from backend/.env.example and start MongoDB before running the API.');
      process.exit(1);
    });
}
module.exports = app;
