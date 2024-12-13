import express from 'express';
import { signup, login, emailVerification, logout, forgotPassword } from '../controller/auth.js'
const router = express.Router()

router.post('/signups', signup)
router.post('/logins', login)
router.post('/logout', logout)
router.post('/verify-email', emailVerification)
router.post('/forgot-password', forgotPassword)
export default router; 