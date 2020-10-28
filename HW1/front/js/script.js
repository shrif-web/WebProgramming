function calculateSumNodeJs() {
    const firstNumber = document.getElementById("input1").value;
    const secondNumber = document.getElementById("input2").value;
    sendRequest('POST', "http://localhost:8080/", { firstNumber, secondNumber })
        .then(result => {
            alert(result.sum);
        })
}

function calculateSumGo() {
    const firstNumber = document.getElementById("input1").value;
    const secondNumber = document.getElementById("input2").value;
    sendRequest('POST', "http://localhost:8000/", { firstNumber, secondNumber })
        .then(result => {
            alert(result.sum);
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
    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.error(error));
}