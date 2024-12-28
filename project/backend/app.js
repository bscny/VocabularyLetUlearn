const express = require('express');
require('express-async-errors');
require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));
app.use(express.json());

require("@/socket_services/Room/socket")(io);


// User's inventory aka "my sets page"
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
// routes end

app.get("/test", (req, res) => {
  res.status(200).send({ 'success': 'success' });
});

const room_setRoutes = require('@/routes/Room/setRoutes.js');
app.use(room_setRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});