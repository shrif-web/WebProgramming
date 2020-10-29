const http = require("http");
const fs = require('fs');
const readline = require('readline');
const express = require("express");
const crypto = require('crypto');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const hostname = "127.0.0.1";
const port = 8080;

app.post("/sha256", (request, response) => {
    console.log("POST /sha256");
    const firstNumber = request.body.firstNumber;
    const secondNumber = request.body.secondNumber;
    if (typeof firstNumber === 'number' && typeof secondNumber === 'number') {
        const sumRaw = firstNumber + secondNumber;
        const sum = crypto.createHash('sha256').update(sumRaw).digest('hex');
        response.json({ sum })
        response.end();
    }
    else {
        return response.status(400).end('Inputs must be numbers');
    }
});

app.get("/write", (request, response) => {
    console.log("GET /write");
    const lineNumber = req.body.lineNumber;
    if (typeof lineNumber !== 'number' || lineNumber < 1 || lineNumber > 100) {
        return response.status(400).end('Inputs must be numbers');
    }

    const fileStream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let resault = rl[lineNumber];
    response.json({ result })
});

app.listen(port, () => {
    console.log(`NodeJs Server is listening at http://127.0.0.1:${port}`);
})