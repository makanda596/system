import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'
import {
    signup, login, emailVerification, logout, forgotPassword,
    resetPasswordEmail, checkAuth, alertMessage, tenantMessage, adminUsers, adminLogin
} from '../controller/auth.js'
const router = express.Router()


router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', emailVerification)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPasswordEmail)
router.post('/alert', alertMessage)
router.get('/alerts', tenantMessage)
router.get('/admin/users', adminUsers)
router.post('/adminlogin', adminLogin)
// router.put('/settings/:id', settings)
export default router;    