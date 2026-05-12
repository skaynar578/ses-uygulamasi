const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 ELEVENLABS
const API_KEY = "ELEVENLABS_KEY_BURAYA";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

app.post("/create", async (req, res) => {

    const { lyrics, style } = req.body;

    if (!lyrics) {
        return res.status(400).json({ error: "Şarkı sözü yok" });
    }

    try {

        // 🎤 VOICE (AI SES)
        const voice = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                text: lyrics,
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

        const voiceBase64 = Buffer.from(voice.data).toString("base64");

        // 🎵 BEAT (demo müzik)
        const beat = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

        res.json({
            status: "ok",
            style: style || "default",
            voice: "data:audio/mpeg;base64," + voiceBase64,
            beat: beat
        });

    } catch (err) {
        console.log(err.response?.data || err.message);
        res.status(500).json({ error: "AI üretim hatası" });
    }
});

app.listen(3000, () => {
    console.log("🔥 SK PRO MUSIC SYSTEM ACTIVE → http://localhost:3000");
});
