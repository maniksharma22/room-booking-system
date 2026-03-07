import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://room-booking-system-sigma.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {

    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }

  },
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("StayEase API running");
});


app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);


app.get("/", (req,res)=>{
  res.send("StayEase API running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});