<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

session_start();

if(!(isset($_REQUEST['email'])))
    die("");

$email = $_REQUEST['email'];




$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $email = $db->quote($email);
    $rows = $db->query("select count(id) from user where email=$email;");
    foreach($rows as $row){
        $count = $row["count(id)"];
    } 
    if($count == 0){
        $db->query("insert into user(email) values ($email);");
    }
    $_SESSION['email'] = $_REQUEST['email'];
    $email = $_SESSION['email'];
    if(!file_exists("../../module/$email/")){
        mkdir("../../module/$email/", 0755);
    }
} catch (PDOException $e) {

}
?>
