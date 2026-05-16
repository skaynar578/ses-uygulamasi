const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const API_KEY = "YOUR_OPENAI_API_KEY";

// 🎧 SPEECH → TEXT (WHISPER AI)
app.post("/transcribe", upload.single("audio"), async (req,res)=>{
    try{

        const form=new FormData();
        form.append("file",fs.createReadStream(req.file.path));
        form.append("model","whisper-1");

        const response=await axios.post(
            "https://api.openai.com/v1/audio/transcriptions",
            form,
            {
                headers:{
                    "Authorization":`Bearer ${API_KEY}`,
                    ...form.getHeaders()
                }
            }
        );

        fs.unlinkSync(req.file.path);

        res.json({text:response.data.text});

    }catch(err){
        console.log(err.message);
        res.json({error:err.message});
    }
});

app.listen(3000,()=>{
    console.log("🚀 ULTRA PRO MAX AI ACTIVE");
});
