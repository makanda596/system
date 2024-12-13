import express from 'express';
import { signup } from '../controller/auth.js'
const router = express.Router()

router.get('/signup', signup)
export default router;