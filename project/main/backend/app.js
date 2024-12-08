const express = require('express');
require('express-async-errors');

require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
    // origin: "*"
}));


// routes are here
// user's inventory aka "my sets"
const folderRoutes = require("@/routes/User_Inventory/folderRoutes.js");
const setRoutes = require("@/routes/User_Inventory/setRoutes.js");
const wordRoutes = require("@/routes/User_Inventory/wordRoutes.js");

app.use("/folders", folderRoutes);
app.use("/sets", setRoutes);
app.use("/words", wordRoutes);

// search add aka "main landing page"
const landing_userRoutes = require('@/routes/SearchAdd/userRoutes');
const landing_wordRoutes = require('@/routes/SearchAdd/wordRoutes');
const landing_setRoutes = require('@/routes/SearchAdd/setRoutes');

app.use('/api/users', landing_userRoutes);
app.use('/api/words', landing_wordRoutes);
app.use('/api/set', landing_setRoutes);

// routes end

app.get("/test", (req, res) => {
    res.status(200).send({ 'success': 'success' });
})

// globally checker for error handling, so we dont need catch for any async func in backend
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});