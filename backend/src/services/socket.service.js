import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);
  });
};

export const emitProgress = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};
