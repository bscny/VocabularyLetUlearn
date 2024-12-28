// modules:
const express = require('express');
require('express-async-errors');

require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const http = require('http');
const server = http.createServer(app);

// start initializing------------------------------------------------------------------
const PORT = process.env.PORT || 3000;

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
    },
});
require("@/socket_services/Room/roomSocket.js")(io);

app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));
app.use(express.json());

// routes are here -------------------------------------------------------------------
// user's inventory aka "my sets page"
const folderRoutes = require("@/routes/User_Inventory/folderRoutes.js");
const setRoutes = require("@/routes/User_Inventory/setRoutes.js");
const wordRoutes = require("@/routes/User_Inventory/wordRoutes.js");

app.use("/folders", folderRoutes);
app.use("/sets", setRoutes);
app.use("/words", wordRoutes);

// Search add aka "main landing page"
const landing_userRoutes = require('@/routes/SearchAdd/userRoutes.js');
const landing_wordRoutes = require('@/routes/SearchAdd/wordRoutes.js');
const landing_setRoutes = require('@/routes/SearchAdd/setRoutes.js');

app.use('/api/users', landing_userRoutes);
app.use('/api/words', landing_wordRoutes);
app.use('/api/set', landing_setRoutes);

// Account related aka "log in page"
const authRoutes = require('@/routes/Account/authRoutes.js');
app.use('/auth', authRoutes);

// create and join room
const roomRoute = require('@/routes/Create_Join_Room/roomRoute.js');
const userRoute = require('@/routes/Create_Join_Room/userRoute.js');

app.use('/create_join_room/rooms', roomRoute);
app.use('/create_join_room/users', userRoute);

// In room
const room_setRoutes = require('@/routes/Room/setRoutes.js');
const inRoomRoute = require("@/routes/Room/roomRoutes.js");

app.use(room_setRoutes);
app.use("/room", inRoomRoute);

// room exam related
const roomTestingFakeDataRoutes = require('@/routes/Room/Room_Exam/fakadataRoutes.js');
const roomExamRoutes = require("@/routes/Room/Room_Exam/roomRoutes.js");
const roomUserExamRoutes = require("@/routes/Room/Room_Exam/userRoutes.js")

app.use('/test', roomTestingFakeDataRoutes);
app.use('/room', roomExamRoutes);
app.use("/room/user", roomUserExamRoutes);

// routes end

// my Socket.IO event handling -------------------------------------------------------------

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Listen for a custom event from the client
//     socket.on("join-room-exam", (roomID) => {
//         console.log('Received current room from client:', roomID);

//         // Broadcast data to all connected clients
//         io.emit('send-testsheet', {
//             message: 'Hello from server',
//             Test_sheet: [
//                 {
//                     Q_num: 1,
//                     Q_body: "Am i stupid?"
//                 }
//             ]
//         });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected:', socket.id);
//     });
// });

// globally checker for error handling, so we dont need catch for any async func in backend ---------
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
});

// start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});