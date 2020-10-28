//set your centos ip in here
const HOST_API = "http://172.20.10.6"
const FAIL = "Sorry! We couldnt make the request"
function calculateSum(serverType) {
    const firstNumber = Number(document.getElementById("input1").value);
    const secondNumber = Number(document.getElementById("input2").value);
    sendRequest('POST', `${HOST_API}/${serverType}/sha256`, { firstNumber, secondNumber })
        // sendRequest('POST', `http://127.0.0.1:8000/sha256`, { firstNumber, secondNumber })
        .then(result => {
            alert(result ? result.sum : FAIL);
        })
}

function getLine(serverType) {
    const lineNumber = Number(document.getElementById("lineNumber").value);
    sendRequest('GET', `${HOST_API}/${serverType}/write`, { lineNumber })
        .then(result => {
            alert(result ? result : FAIL);
        })
}


function sendRequest(type, url, payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: type,
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
    };
    console.log(payload)
    console.log(requestOptions.body)
    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.error(error));
}