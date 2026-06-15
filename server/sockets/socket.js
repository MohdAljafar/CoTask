const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinWorkspace", (workspaceId) => {
      socket.join(workspaceId);

      console.log(`Joined Workspace ${workspaceId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
