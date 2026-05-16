const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// 🔥 OPENAI KEY BURAYA
const OPENAI_API_KEY = "YOUR_API_KEY";

app.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        const filePath = req.file.path;

        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));
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

        fs.unlinkSync(filePath);

        res.json({ text: response.data.text });

    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
});
