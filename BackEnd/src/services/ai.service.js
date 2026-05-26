import { GoogleGenAI } from '@google/genai';

async function getReview(code) {
  console.log('Key loaded:', process.env.GOOGLE_GEMINI_KEY ? '✅' : '❌ MISSING');

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `You are an expert code reviewer. Review this code and provide detailed feedback:

\`\`\`javascript
${code}
\`\`\`

Provide:
1. Code quality feedback
2. Bugs or issues
3. Performance improvements  
4. Best practices`,
  });

  return response.text;
}

export default { getReview };
