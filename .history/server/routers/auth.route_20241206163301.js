import express from 'express';

const router = express.Router()

router.get('/signupform', (req, res) => {
    res.send('signupform');
})
export const router;