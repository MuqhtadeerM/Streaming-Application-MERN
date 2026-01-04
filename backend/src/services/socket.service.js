import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

// emit progress
export const emitProgress = (videoId, progress, status) => {
  if (io) {
    io.emit("video-progress", {
      videoId,
      progress, 
      status,
    });
  }
};
