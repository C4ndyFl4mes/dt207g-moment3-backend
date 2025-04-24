const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.URI).then(() => {
    console.log("Connected!");
}).catch((error) => {
    console.error(error);
});

const CVSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const CV = mongoose.model("CV", CVSchema);

app.get("/cv", async (req, res) => {
    try {
        const result = await CV.find({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post("/cv", async (req, res) => {
    try {
        const result = await CV.create(req.body);
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
});

app.put("/cv/:id", async (req, res) => {
    try {
        const result = await CV.updateOne({_id: req.params.id}, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.delete("/cv/:id", async (req, res) => {
    try {
        const result = await CV.deleteOne({_id: req.params.id});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(port, () => {
    console.log(`Servern körs på porten ${port}`);
});