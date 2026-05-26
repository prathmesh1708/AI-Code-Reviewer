import aiService from '../services/ai.service.js';

async function getReview(req, res) {
  try {
    const { code } = req.body;

    if (!code)
      return res.status(400).json({ message: 'Code is required' });

    const review = await aiService.getReview(code);

    res.status(200).json({ review });

  } catch (err) {
    console.error('Controller error:', err.message);
    res.status(500).json({ message: 'AI request failed', error: err.message });
  }
}

export default { getReview };
