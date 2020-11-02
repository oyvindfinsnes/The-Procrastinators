<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="src/styles/master.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <title>Marvin: The Paranoid Android</title>
</head>
<body class="flex-container">
    <ul class="main-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about us">About us</a></li>
        <li><a href="#about project">About project</a></li>
    </ul>

    <div class="interface-container">
        <div class="bot"></div>
        <div class="chat">
            <div class="chatlog"></div>
            <div class="input-container">
                <textarea id="userInput" class="user-input"></textarea>
                <img id="userSubmit" class="user-submit" src="src/img/send.png">
            </div>
        </div>
    </div>
</body>
</html>