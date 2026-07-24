export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Bạn là trợ lý AI thân thiện hỗ trợ học tập." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices && data.choices[0] ? data.choices[0].message.content : "Không có phản hồi từ AI.";

        return res.status(200).json({ reply });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi kết nối tới AI' });
    }
}
