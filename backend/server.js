import express from "express";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://room-booking-system-sigma.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});