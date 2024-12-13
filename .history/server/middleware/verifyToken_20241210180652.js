import jwt from 'jsonwebtoken'

const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"
if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
}

console.log("Received Token: ", token);

try {
    const decoded = jwt.verify(token, "welcome"); // Ensure the secret matches
    console.log("Decoded Token: ", decoded); // Log decoded payload
    req.userId = decoded.userId;
    next();
} catch (error) {
    console.error("Error verifying token: ", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
}
