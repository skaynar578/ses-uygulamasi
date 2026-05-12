const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/song", async (req, res) => {

    const { lyrics, style } = req.body;

    if (!lyrics || lyrics.trim() === "") {
        return res.status(400).json({ error: "Şarkı sözü yok" });
    }

    console.log("🎵 Yeni şarkı isteği alındı");
    console.log("Söz:", lyrics);
    console.log("Stil:", style || "belirtilmedi");

    // 🔥 BURASI AI BAĞLANTI NOKTASI (ileride ElevenLabs / Suno eklenecek)

    res.json({
        status: "ok",
        message: "Şarkı isteği alındı",
        lyrics: lyrics,
        style: style || "default",
        voice: "not_connected_yet",
        music: "not_connected_yet",
        demo_url: "https://demo-music-file.mp3"
    });
});

app.listen(3000, () => {
    console.log("🔥 SK STÜDYO PRO ÇALIŞIYOR → http://localhost:3000");
});
