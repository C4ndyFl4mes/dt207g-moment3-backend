const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
    res.json({message: "Det fungerar"});
});

app.listen(port, () => {
    console.log(`Servern körs på porten ${port}`);
});