const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());

// uploads klasörü yoksa oluştur
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

// 🔴 BURAYA OPENAI KEY GİRECEKSİN
const OPENAI_API_KEY = "YOUR_API_KEY";

app.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "Dosya gelmedi" });
        }

        const formData = new FormData();

        formData.append("file", fs.createReadStream(req.file.path));
        formData.append("model", "whisper-1");

        const response = await axios.post(
            "https://api.openai.com/v1/audio/transcriptions",
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    ...formData.getHeaders()
                }
            }
        );

        // geçici dosyayı sil
        fs.unlinkSync(req.file.path);

        return res.json({ text: response.data.text });

    } catch (err) {
        console.log("HATA:", err.response?.data || err.message);

        return res.status(500).json({
            error: err.response?.data?.error?.message || err.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("SK AI Server Çalışıyor");
});

app.listen(3000, () => {
    console.log("🚀 Server çalışıyor: http://localhost:3000");
});
