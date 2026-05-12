
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 BURAYA ELEVENLABS KEYİNİ KOY
const ELEVEN_API_KEY = "API_KEY_BURAYA";

app.post("/song", async (req, res) => {

    const { lyrics, style } = req.body;

    if(!lyrics){
        return res.status(400).json({ error: "Şarkı yok" });
    }

    try {

        // 🎤 SES ÜRET (ElevenLabs)
        const voice = await axios.post(
            "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
            {
                text: lyrics,
                model_id: "eleven_multilingual_v2"
            },
            {
                headers: {
                    "xi-api-key": ELEVEN_API_KEY,
                    "Content-Type": "application/json",
                    "Accept": "audio/mpeg"
                },
                responseType: "arraybuffer"
            }
        );

        // 🎵 MÜZİK (şimdilik demo link)
        const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

        res.json({
            status: "ok",
            voice: "generated",
            music: musicUrl
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "AI hata verdi" });
    }
});

app.listen(3000, () => {
    console.log("🔥 SK AI STUDIO RUNNING http://localhost:3000");
});
