<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
$name = $_POST["module_name"];
$type = $_FILES["module_file"]["type"];
$filename = $_FILES["module_file"]["name"];
$temp = $_FILES["module_file"]["tmp_name"];
$username = $_SESSION["email"];

if(!isset($_SESSION["email"])){
    die("You have to login please.");
}
if(!file_exists("../../module/$username/$name")){
    mkdir("../../module/$username/$name");
    if(is_uploaded_file($temp)){
	$path = "/home/diy1/module/$username/$name";
        move_uploaded_file($temp, $path."/$filename");
    }


$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    $email = $db->quote($email);
    $email = $_SESSION["email"];
    $rows = $db->query("select id from user where email='$email';");
    $id = 0;
    foreach($rows as $row){
	$id = $row["id"];
    }
    $rows = $db->query("insert into module(name, user_id, status) values('$name', $id, 1);");

} catch (PDOException $e) {
    print "pdo";
    print $e;
}
echo shell_exec("cd /home/diy1/module/$email/$name; unzip $name.zip;");

echo shell_exec("sshpass -p 'dufrhd3182' ssh hari@192.168.122.90 'mkdir -p /home/hari/module/$email/'");
echo shell_exec("sshpass -p 'dufrhd3182' scp -r $path hari@192.168.122.90:/home/hari/module/$email/$name");
}
?>
