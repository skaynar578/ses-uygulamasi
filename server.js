const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 ELEVENLABS API KEY (BURAYA SENİN KEY)
const API_KEY = "sk_4c496aab3618cdd3e1d55c4df719c28501f5f46ab51121fa";

// 🎤 VOICE ID (örnek erkek ses)
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

app.post("/generate", async (req, res) => {

    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "metin yok" });
    }

    try {

        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.8
                }
            },
            {
                headers: {
                    "xi-api-key": API_KEY,
                    "Content-Type": "application/json",
                    "Accept": "audio/mpeg"
                },
                responseType: "arraybuffer"
            }
        );

        const audioBase64 = Buffer.from(response.data).toString("base64");

        res.json({
            success: true,
            audio: "data:audio/mpeg;base64," + audioBase64
        });

    } catch (err) {
        console.log("HATA:", err.response?.data || err.message);
        res.status(500).json({ error: "AI hata verdi" });
    }
});

app.listen(3000, () => {
    console.log("🔥 SK AI VOICE STUDIO RUNNING http://localhost:3000");
});
