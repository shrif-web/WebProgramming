const http = require("http");
const fs = require('fs');
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const hostname = "127.0.0.1";
const port = 8080;

app.post("/nodejs/sha256", (request, response) => {
    console.log(`Request came: ${request.url}`);

    try {
        let parts = request.url.substring(5).split('/')
        let result = Number(parts[0]) + Number(parts[1])
        response.json({ sum: result })
        response.end();
        console.log(`Response: 200 ${request.url}`);
        return;
    } catch (e) {
        console.log(e);
    }
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