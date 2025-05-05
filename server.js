const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/generate-image', async (req, res) => {
  try {
    const response = await openai.images.generate({
      prompt: "flamingo in an elevator",
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
  console.error("Image generation failed:", error.response?.data || error.message || error);
  res.status(500).json({ error: error.message || 'Image generation failed' });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
