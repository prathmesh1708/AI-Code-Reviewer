import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
  console.log('API KEY:', process.env.GOOGLE_GEMINI_KEY ? '✅ loaded' : '❌ missing');
});
