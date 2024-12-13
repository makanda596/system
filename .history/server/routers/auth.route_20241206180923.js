import express from 'express';
import { signup, login } from '../controller/auth.js'
const router = express.Router()

router.post('/signups', signup)
router.post('/logins', login)

export default router;