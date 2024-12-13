import express from 'express';
import { verifyToken } from '../middleware/verifyToken'
import { signup, login, emailVerification, logout, forgotPassword, resetPasswordEmail, checkAuth } from '../controller/auth.js'
const router = express.Router()


router.get('/check-auth', verifyToken, checkAuth);
router.post('/signups', signup)
router.post('/logins', login)
router.post('/logout', logout)
router.post('/verify-email', emailVerification)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPasswordEmail)
export default router; 