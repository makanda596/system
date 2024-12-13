import express from 'express';
import { signup, login, emailVerification } from '../controller/auth.js'
const router = express.Router()

router.post('/signups', signup)
router.post('/logins', login)
router.post('/logout', logout)
router.post('/verify-email', emailVerification)
export default router;