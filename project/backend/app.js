// modules:
const express = require('express');
require('express-async-errors');

const http = require('http');
const { Server } = require('socket.io');

require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
    },
});

// start initializing------------------------------------------------------------------
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
    // origin: "*"
}));


// routes are here -------------------------------------------------------------------
// user's inventory aka "my sets page"
const folderRoutes = require("@/routes/User_Inventory/folderRoutes.js");
const setRoutes = require("@/routes/User_Inventory/setRoutes.js");
const wordRoutes = require("@/routes/User_Inventory/wordRoutes.js");

app.use("/folders", folderRoutes);
app.use("/sets", setRoutes);
app.use("/words", wordRoutes);

// search add aka "main landing page"
const landing_userRoutes = require('@/routes/SearchAdd/userRoutes.js');
const landing_wordRoutes = require('@/routes/SearchAdd/wordRoutes.js');
const landing_setRoutes = require('@/routes/SearchAdd/setRoutes.js');

app.use('/api/users', landing_userRoutes);
app.use('/api/words', landing_wordRoutes);
app.use('/api/set', landing_setRoutes);

// account related aka "log in page"
const authRoutes = require('@/routes/Account/authRoutes.js');

app.use('/auth', authRoutes);

// room exam related
const roomTestingFakeDataRoutes = require('@/routes/Room/Room_Exam/fakadataRoutes.js');
const roomExamRoutes = require("@/routes/Room/Room_Exam/roomRoutes.js");

app.use('/test', roomTestingFakeDataRoutes);
app.use('/room', roomExamRoutes);

// routes end

// Socket.IO event handling -------------------------------------------------------------

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a custom event from the client
    socket.on("join-room-exam", (roomID) => {
        console.log('Received current room from client:', roomID);

        // Broadcast data to all connected clients
        io.emit('send-testsheet', {
            message: 'Hello from server',
            Test_sheet: [
                {
                    Q_num: 1,
                    Q_body: "Am i stupid?"
                }
            ]
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// globally checker for error handling, so we dont need catch for any async func in backend ---------
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
});

// start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});