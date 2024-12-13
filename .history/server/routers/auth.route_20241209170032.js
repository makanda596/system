import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'
import { signup, login, emailVerification, logout, forgotPassword, resetPasswordEmail, checkAuth } from '../controller/auth.js'
const router = express.Router()


router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', emailVerification)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPasswordEmail)
export default router;  