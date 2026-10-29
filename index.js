const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ضع مفتاح الـ API الخاص بك هنا بين علامتي التنصيص بدلاً من هذه العبارة
const API_KEY = "ضع_مفتاح_الـ_API_هنا"; 

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ reply: "الرجاء إرسال رسالة صحيحة." });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `أنت مساعد ذكي اسمه 'محور' متخصص في البرمجة والفقه الإسلامي.\n\nالسؤال: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        
        // استخراج النص بدقة من استجابة جيميناي
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم أتمكن من توليد رد.";
        
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "حدث خطأ في الاتصال بالسيرفر." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
