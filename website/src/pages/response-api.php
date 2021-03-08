<?php
    if (isset($_POST["input"])) {
        $path = __DIR__ . "\\..\\..\\..\\response-api\\dist\\Windows\\Windows.exe";
        $command = escapeshellcmd("{$path} \"{$_POST['input']}\"");

        $output = shell_exec($command);
        
        echo utf8_decode($output);
    } else {
        echo "None";
    }
?>
