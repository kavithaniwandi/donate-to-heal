// Loads environment variables from a .env file into process.env
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function start() {
    app.listen(port, () =>
        console.log(`Server running on http://localhost:${port}`)
    );
}

start().catch(err => {
    console.error(err);
    process.exit(1);
});