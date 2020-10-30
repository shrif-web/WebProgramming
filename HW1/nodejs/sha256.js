const http = require("http");
const fs = require('fs');
const nthline = require('nthline');
const express = require("express");
const crypto = require('crypto');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

app.post("/sha256", (request, response) => {
    console.log("POST /sha256");
    const firstNumber = request.body.firstNumber;
    const secondNumber = request.body.secondNumber;
    if (typeof (firstNumber) == "number" && typeof (secondNumber) == "number") {
        const sumRaw = (firstNumber + secondNumber).toString();
        const sum = crypto.createHash('sha256').update(sumRaw).digest('hex');
        response.json({ sum })
    }
    else {
        return response.status(400).end('Inputs must be numbers');
    }
});

app.get("/write", (req, response) => {
    console.log("GET /write");
    const lineNumber = Number(req.query.lineNumber);
    if (typeof (lineNumber) == 'number') {
        if (lineNumber < 1 || lineNumber > 100) {
            return response.status(400).end('Input must be between 1 and 100');
        }
        nthline(lineNumber - 1, 'input.txt').then(line => response.json({ line }))
    }
    else {
        return response.status(400).end(`Input must be number`);
    }
});


app.listen(port, () => {
    console.log(`NodeJs Server is listening at http://127.0.0.1:${port}`);
})
