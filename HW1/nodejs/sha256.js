const http = require("http");
const fs = require('fs');
const readline = require('readline');
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const hostname = "127.0.0.1";
const port = 8080;

app.post("/nodejs/sha256", (request, response) => {
    const firstNumber = request.body.firstNumber;
    const secondNumber = request.body.secondNumber;
    let sum;
    if (typeof firstNumber === 'number' && typeof secondNumber === 'number')
    {
        sum = Number(parts[0]) + Number(parts[1])
    }
    else
    {
        return response.status(400).end('Inputs must be numbers');
    }
    response.json({ sum })
    response.end();
});

app.get("/nodejs/write", (request, response) => {
    const lineNumber = req.body.lineNumber;
    if (typeof lineNumber !== 'number' || lineNumber < 1 || lineNumber > 100)
    {
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

fs.readFile('../front/front.html', function (err, html) {
    if (err) {
        throw err;
    }
    const server = http.createServer(function (request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    });

    server.listen(port, hostname, () => {
        console.log(`server running at http://${hostname}:${port}/`);
    });
});