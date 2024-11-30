const express = require('express');
require('express-async-errors');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));


// routes are here
const userRoutes = require("./routes/userRoutes.js");
const folderRoutes = require("./routes/folderRoutes.js");
const setRoutes = require("./routes/setRoutes.js");
const wordRoutes = require("./routes/wordRoutes.js");

app.use("/users", userRoutes);
app.use("/folders", folderRoutes);
app.use("/sets", setRoutes);
app.use("/words", wordRoutes);

// routes end

app.get("/test", (req, res) => {
    res.status(200).send({ 'success': 'success' });
})

// globally checker for error handling, so we dont need catch for any async func in backend
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});