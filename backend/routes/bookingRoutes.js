import express from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);

router.get("/my", verifyToken, getMyBookings);

export default router;