function calculateSumNodeJs() {
    let a = document.getElementById("input1").value;
    let b = document.getElementById("input2").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Examine the text in the response
            var answer = JSON.parse(this.responseText);
            alert(answer.sum);
            // response.text().then(txt => console.log(txt));
        }
    };
    xhttp.open("POST", "http://192.168.1.105:8080/nodejs/sha256", true);
    xhttp.send("a=" + a + ",b=" + b);
}

function calculateSumGo() {
    alert('clicked');
}