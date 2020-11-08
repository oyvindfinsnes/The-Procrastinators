<?php
    if (isset($_POST["input"])) {
        $path = __DIR__ . "/../../../response-api/main.py";
        $command = escapeshellcmd($path . " \"" . $_POST["input"] . "\"");

        $output = shell_exec($command);
        
        echo $output;
    } else {
        echo "None";
    }
?>
