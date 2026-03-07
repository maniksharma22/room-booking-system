import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use((req,res,next)=>{

  res.header(
    "Access-Control-Allow-Origin",
    "https://room-booking-system-sigma.vercel.app"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  if(req.method === "OPTIONS"){
    return res.sendStatus(200);
  }

  next();

});

app.use(cors());
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