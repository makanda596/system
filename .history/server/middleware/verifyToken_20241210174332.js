import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - token missing" });
    }

    try {
        const decoded = jwt.verify(token, "welcome"); // Verify token using your secret
        req.userId = decoded.userId; // Attach user ID to the request
        next(); // Continue to the next middleware/route
    } catch (error) {
        console.error("Error in verifyToken: ", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
