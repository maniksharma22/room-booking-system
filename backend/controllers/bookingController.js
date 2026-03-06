import db from "../config/db.js";

export const createBooking = async (req, res) => {

  const { user_id, room_id, start_date, end_date, adults, children } = req.body;

  try {

    const [result] = await db.query(
      "INSERT INTO bookings (user_id, room_id, start_date, end_date, adults, children) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, room_id, start_date, end_date, adults, children]
    );

    res.json({ message: "Booking successful" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};

export const getMyBookings = async (req, res) => {

  const user_id = req.params.user_id;

  try {

    const [rows] = await db.query(
      `SELECT bookings.*, rooms.name, rooms.price_per_night, rooms.location
   FROM bookings
   JOIN rooms ON bookings.room_id = rooms.id
   WHERE bookings.user_id = ?`,
      [user_id]
    );

    res.json(rows);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};