import http from "http";
import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./services/socket.service.js";

// need for socket.io this is to create server
const server = http.createServer(app);
connectDB();
initSocket(server);

server.listen(ENV.PORT, () => {
  console.log(`Server is Running on port ${ENV.PORT}`);
});
