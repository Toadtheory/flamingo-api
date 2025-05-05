const express = require('express');
const cors = require('cors');
const { OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.get('/generate-image', async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "flamingo in an elevator",
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
