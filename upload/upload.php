<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
$name = $_POST["module_name"];
$type = $_FILES["module_file"]["type"];
$filename = $_FILES["module_file"]["name"];
$temp = $_FILES["module_file"]["tmp_name"];
$username = $_SESSION["email"];
print $username;
if(!isset($_SESSION["email"])){
    die("You have to login please.");
}

if(!file_exists("../../module/$username/$name")){
    mkdir("../../module/$username/$name");
    if(is_uploaded_file($temp)){
        move_uploaded_file($temp, "../../module/$username/$name/$filename");
    }
}
else{
    
}

?>
