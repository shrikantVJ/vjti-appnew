
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpserver = res.socket.server;
    const io = new ServerIO(httpserver, {
      path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Room creation
      socket.on("create-room", (fileId) => {
        console.log(`Creating room for file ID: ${fileId}`);
        socket.join(fileId);
        console.log(`User joined room: ${fileId}`);
      });

      // Document update handling
      socket.on("doc-update", (newContent) => {
        console.log("Received document update: ", newContent);
        // Broadcast the document update to others
        socket.broadcast.emit("doc-update", newContent);
      });

      // Cursor position updates
      socket.on("cursor-position", (cursorData) => {
        console.log("Received cursor position update: ", cursorData);
        // Broadcast cursor position to others
        socket.broadcast.emit("cursor-position", cursorData);
      });

      // Sending changes (e.g., editor deltas)
      socket.on("sendChanges", (deltas, fileId) => {
        console.log(`Received changes for file ${fileId}:`, deltas);
        socket.to(fileId).emit("recive-changes", deltas, fileId);
      });

      // Cursor move updates
      socket.on("send-cursor-move", (range, fileId, cursorId) => {
        console.log(`Received cursor move for file ${fileId} by cursor ${cursorId}:`, range);
        socket.to(fileId).emit("recive-cursor-move", range, fileId, cursorId);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    res.socket.server.io = io;
    console.log("Socket.io server initialized");
  } else {
    console.log("Socket.io server already initialized");
  }

  res.end();
};

export default ioHandler;
