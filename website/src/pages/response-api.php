<?php
    if (isset($_POST["input"])) {
        $current_env = php_uname("s");
        $path_base = __DIR__ . "\\..\\..\\..\\response-api\\dist\\";
        $path_end = [
            "Windows NT" => "Windows\\Windows.exe",
            "Darwin" => "Darwin\\Darwin.app",
            "Linux" => "Linux\\Linux"
        ];

        $path = "{$path_base}{$path_end[$current_env]}";
        $user_input = "\"{$_POST['input']}\"";

        putenv('LANG=en_US.UTF-8');

        $command = escapeshellcmd("{$path} {$user_input}");
        $output = shell_exec($command);
        
        echo $output;
    } else {
        echo "None";
    }
?>
