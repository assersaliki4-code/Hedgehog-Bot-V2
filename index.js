const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Ariel Bot est en ligne ! 🤖');
});

app.listen(port, () => {
  console.log(`Serveur démarré`);
});

// ⚠️ METS TA CLÉ API ICI
const OPENAI_API_KEY = 'TA_CLE_API_ICI';

client.listen(async (err, message) => {
  if (err) return console.error(err);
  
  const texte = message.body.toLowerCase();
  const repondre = (texte) => message.send(texte);

  // --------------------------
  // 📛 SI TU L'APPELES PAR SON NOM
  // --------------------------
  if (texte.includes("ariel") || texte.includes("ariel bot")) {
    repondre("🤖 Oui ! C'est moi Ariel Bot !\nComment puis-je t'aider ? 😊");
  }

  // --------------------------
  // 🧠 COMMANDE AI
  // --------------------------
  if (texte.startsWith('ai')) {
    const question = message.body.slice(2).trim();
    
    if (!question) {
      return repondre("❓ Pose une question après 'ai' !");
    }

    try {
      const reponse = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      repondre(`🤖 Ariel Bot :\n\n${reponse.data.choices[0].message.content}`);

    } catch (erreur) {
      repondre("⚠️ Erreur avec l'IA.");
    }
  }

  // --------------------------
  // ℹ️ COMMANDE NOM / QUI ES TU
  // --------------------------
  if (texte.includes("ton nom") || texte.includes("qui es tu")) {
    repondre("🤖 Je m'appelle Ariel Bot !");
  }
  
});
