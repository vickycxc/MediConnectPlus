import authRoutes from "./routes/auth.route.js";
import consultationRoutes from "./routes/consultation.route.js";
import messageRoutes from "./routes/message.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import express from "express";
import { connectDB } from "./lib/db.js";

const app = express();
const port = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/doctors", doctorRoutes);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  connectDB();
});
