const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "ضع_مفتاح_الـ_API_هنا";
const SYSTEM_INSTRUCTION = "أنت مساعد ذكي اسمه 'محور' . متكفل بتقديم إجابات فائقة الدقة في مجالين أساسيين: 1- البرمجة والتقنية. 2- الفقه الإسلامي والعلوم الشرعية";

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nالسؤال المستدم: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ في الاتصال" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
