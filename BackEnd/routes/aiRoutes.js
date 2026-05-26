import express from 'express';

const router = express.Router();

router.get('/get-response', async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) return res.status(400).json({ message: 'Prompt required' });
  res.json({ response: `You asked: ${prompt}` });
});

export default router;
