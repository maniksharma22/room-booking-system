import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {

        const decoded = jwt.verify(token.split(" ")[1], "secretkey");

        req.user = decoded;

        next();

    } catch (err) {

        res.status(403).json({ message: "Invalid token" });

    }

};