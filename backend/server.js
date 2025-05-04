const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./database/db");
const http = require("http");
const exams = require("./routes/exam.routes");
const userAuth = require("./routes/auth.routes");

const cors = require("cors");
var cookieParser = require("cookie-parser");
const { authentication } = require("./middleware/authentication");
const { Server } = require("socket.io");

dotenv.config({});

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://exam-proctor-o7pe.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Auth :-
app.use("/api/auth", userAuth);
app.use("/api", authentication, exams);

//sockets :-

const io = new Server(server, {
  cors: {
    origin: "https://exam-proctor-o7pe.onrender.com",
    // origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined`, roomId);
  });

  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", {
      offer,
      studentId: socket.id,
    });
  });

  socket.on("answer", ({ roomId, answer, studentId }) => {
    io.to(studentId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ roomId, candidate, studentId }) => {
    socket.to(roomId).emit("ice-candidate", {
      candidate,
      studentId,
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running on port : " + PORT);
    });
  })
  .catch((err) => console.log(err));
