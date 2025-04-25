const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Etablerar kontakt.
mongoose.connect(process.env.URI).then(() => {
    console.log("Connected!");
}).catch((error) => {
    console.error(error);
});

// Ett schema för hur dokument ska läggas till i kollektionen.
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

// Hämtar dokument.
app.get("/cv", async (req, res) => {
    try {
        const result = await CV.find({});
        if (result.length === 0) {
            return res.status(404).json({ valid: false, message: { header: "Hämtning misslyckades", message: "Kunde inte hitta information." } });
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägger till dokument.
app.post("/cv", async (req, res) => {
    try {
        const result = await CV.create(req.body);
        return res.status(201).json({ valid: true, message: { header: "Lyckades", message: "Ny information lades till." } })
    } catch (error) {
        return res.status(400).json({ valid: false, message: { header: "Misslyckades", message: "Kunde inte lägga till ny information." } });

    }
});

// Uppdaterar dokument beroende på id.
app.put("/cv/:id", async (req, res) => {
    try {
        const result = await CV.updateOne({ _id: req.params.id }, req.body);
        if (result.modifiedCount === 0) {
            return res.status(400).json({ valid: false, message: { header: "Uppdatering misslyckades", message: "Kunde inte uppdatera information." } });
        } else {
            return res.status(200).json({ valid: true, message: { header: "Uppdatering lyckades", message: "Information uppdaterades." } });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Raderar dokument beroende på id.
app.delete("/cv/:id", async (req, res) => {
    try {
        const result = await CV.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(400).json({ valid: false, message: {header: "Radering misslyckades", message: "Kunde inte radera information."} });
        } else {
            return res.status(200).json({ valid: true, message: { header: "Radering lyckades", message: "Information raderades." } });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(port, () => {
    console.log(`Servern körs på porten ${port}`);
});