const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
    res.send("SK PRO API ÇALIŞIYOR");
});

// 🎤 SADE MOCK AI (ELEVENLABS YOK - ÖNCE TEST)
app.post("/create", (req, res) => {

    const { lyrics, style } = req.body;

    if (!lyrics) {
        return res.status(400).json({ error: "Şarkı yok" });
    }

    res.json({
        voice: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        beat: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        style: style || "default"
    });
});

// 🌍 PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SK PRO RUNNING:", PORT);
});
