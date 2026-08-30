import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'success',
        data: []
    });
});

export default router;