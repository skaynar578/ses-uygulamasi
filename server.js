const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const OPENAI_API_KEY = "YOUR_API_KEY";

app.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ error: "Dosya gelmedi" });
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

        fs.unlinkSync(req.file.path);

        res.json({ text: response.data.text });

    } catch (err) {
        console.log(err.message);
        res.json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
});
