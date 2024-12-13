import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

    try {
        const decoded = jwt.verify(token, "welcom"); // Replace 'welcome' with your secret key
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token: ", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
