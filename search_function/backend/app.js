const express = require('express');
require('express-async-errors');
require('module-alias/register');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));


app.use(express.json());


const userRoutes = require('@/routes/userRoutes');
app.use('/api/users', userRoutes);

const wordRoutes = require('@/routes/wordRoutes');
app.use('/api/words', wordRoutes);

const setRoutes = require('@/routes/setRoutes');
app.use('/api/set', setRoutes);


app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Server is running!' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    error: 'Something went wrong! Detected in global error handler.',
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
