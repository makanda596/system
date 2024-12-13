import jwt from 'jsonWebToken'
export const verifyToken = (req, res, next) => {
    const token =
        req.cookies.token || // From cookies
        req.headers.authorization?.split(" ")[1]; // From Authorization header

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

    try {
        const decoded = jwt.verify(token, "welcome"); // Replace 'welcome' with your secret key
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token: ", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
