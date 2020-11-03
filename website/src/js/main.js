function fetchBotResponse(input) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    xhttp.open("POST", "src/response-api.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ "input": input }));
}

function handleUserInput() {
    var elem = document.getElementById("userInput");

    if (elem.value !== "") {
        fetchBotResponse(elem.value);

        var node = document.createElement("span");
        node.setAttribute("class", "user");
        node.textContent = "User: " + elem.value;

        var logElem = document.getElementById("chatLog");
        logElem.appendChild(node);
        logElem.scrollTop = logElem.scrollHeight;

        elem.value = "";
        elem.focus();
    }
}

function init() {
    document.getElementById("userInput").addEventListener("keyup", function (e) {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleUserInput();
        }
    });
    document.getElementById("userSubmit").addEventListener("click", handleUserInput);
}

document.addEventListener("DOMContentLoaded", init);