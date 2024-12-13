import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token
        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const decoded = jwt.verify(token, "welcom"); // Ensure the secret matches
        req.userId = decoded.userId; // Add userId to request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Error verifying token: ", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
