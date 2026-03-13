// api/analyze.js
export default async function handler(req, res) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { inputText } = req.body;
  
  // AQUÍ Vercel sí lee la variable de entorno de forma 100% segura y privada
  const apiKey = process.env.GEMINI_API_KEY_SECURE; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: `Analiza este caso legal: ${inputText}` }] }],
    // ... tu configuración JSON
  };

  try {
    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const data = await geminiResponse.json();
    res.status(200).json(data); // Devolvemos la respuesta al Frontend
  } catch (error) {
    res.status(500).json({ error: 'Error comunicándose con la IA' });
  }
}