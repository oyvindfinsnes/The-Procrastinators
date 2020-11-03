<?php
    var_dump($_POST);
    if (isset($_POST["input"])) {
        echo $_POST["input"] . " hurt my feelings :(";
    } else {
        echo "False";
    }
?>