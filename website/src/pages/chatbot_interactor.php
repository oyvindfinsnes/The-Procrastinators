<?php
    if (isset($_POST["input"])) {
        $current_env = php_uname("s");
        $path_base = __DIR__ . "%..%..%..%chatbot%dist%";
        $path_end = [
            "Windows NT" => "Windows%Windows.exe",
            "Darwin" => "Darwin%Darwin.app",
            "Linux" => "Linux%Linux"
        ];

        $path = str_replace("%", DIRECTORY_SEPARATOR, "{$path_base}{$path_end[$current_env]}");
        $user_input = "\"{$_POST['input']}\"";

        $command = escapeshellcmd("{$path} {$user_input}");
        $output = shell_exec($command);
        
        echo $output;
    } else {
        echo "None";
    }
?>
