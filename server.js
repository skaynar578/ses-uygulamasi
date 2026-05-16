const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ELEVEN_API_KEY = "BURAYA_API_KEY";

app.post("/tts", async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios({
            method: "POST",
            url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
            headers: {
                "xi-api-key": ELEVEN_API_KEY,
                "Content-Type": "application/json"
            },
            data: {
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.8
                }
            },
            responseType: "arraybuffer"
        });

        fs.writeFileSync("output.mp3", response.data);

        res.sendFile(__dirname + "/output.mp3");

    } catch (err) {
        console.log(err);
        res.status(500).send("Hata oluştu");
    }
});

app.listen(3000, () => {
    console.log("AI SES PRO 2 çalışıyor: http://localhost:3000");
});
