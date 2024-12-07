require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('@/routes/authRoutes');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
