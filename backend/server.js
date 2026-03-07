import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

/* CORS FIX */
app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("StayEase API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});