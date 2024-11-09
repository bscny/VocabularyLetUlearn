// app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

// 中間件設定
app.use(cors());
app.use(express.json());

// 提供靜態檔案
app.use(express.static(path.join(__dirname, 'public')));


// 使用路由

const wordRoutes = require('./set/routes/wordRoutes');
app.use('/api/words', wordRoutes);

const setRoutes = require('./set/routes/setRoutes');
app.use('/api/set', setRoutes);

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


