import db from "../config/db.js";

export const getRooms = async (req, res) => {
  try {

    const [rooms] = await db.query("SELECT * FROM rooms");

    res.json(rooms);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }
};