import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Support cookies or headers

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for the secret

        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - token payload invalid" });
        }

        req.userId = decoded.userId; // Set userId for downstream use
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Error in verifyToken: ", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
