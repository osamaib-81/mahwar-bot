const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AQ.Ab8RN6JMqPJ0n7WSCBMLP9R5X7LBVoPrMC_6NPukGIKe14Ox4w";
const SYSTEM_INSTRUCTION = "أنت مساعد ذكي اسمه 'محور'. متكفل بتقديم إجابات فائقة الدقة في مجالين أساسيين: 1- البرمجة والتقنية. 2- الفقه الإسلامي والعلوم الشرعية.";

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nسؤال المستخدم: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
