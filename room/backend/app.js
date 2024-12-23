require("module-alias/register");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});


require("@/socket_services/socketService")(io);


const setRoutes = require('@/routes/setRoutes.js');
app.use(setRoutes);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
