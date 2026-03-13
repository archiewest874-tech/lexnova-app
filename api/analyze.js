export default async function handler(req, res) {
  // 1. Asegurarnos de que solo acepte peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { inputText } = req.body;
  
  // 2. Leer la API Key de forma 100% segura desde Vercel
  // Usará la variable que configuraste en el panel de Vercel (Environment Variables)
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY_SECURE; 

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key no detectada en el servidor de Vercel.' });
  }

  // 3. Configurar la petición a Google Gemini
  const model = "gemini-2.5-flash-preview-09-2025";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemPrompt = `Actúa como un abogado experto y analista legal de una firma top. Analiza los hechos o el caso legal proporcionado. 
  Debes devolver un JSON estrictamente estructurado que resuma el caso, extraiga los puntos clave procesales o materiales, y asigne un nivel de riesgo (Bajo, Medio, Alto) con una breve recomendación.`;

  const payload = {
    contents: [{ parts: [{ text: `${systemPrompt}\n\nTexto a analizar:\n${inputText}` }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          resumen_ejecutivo: { type: "STRING" },
          puntos_clave: { type: "ARRAY", items: { type: "STRING" } },
          nivel_riesgo: { type: "STRING" },
          recomendacion: { type: "STRING" }
        },
        required: ["resumen_ejecutivo", "puntos_clave", "nivel_riesgo", "recomendacion"]
      }
    }
  };

  try {
    // 4. Enviar la petición desde el servidor (oculto al público)
    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const data = await geminiResponse.json();
    
    // 5. Devolver los datos al Frontend (React)
    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Error interno en el servidor:", error);
    return res.status(500).json({ error: 'Fallo al comunicarse con Google Gemini' });
  }
}