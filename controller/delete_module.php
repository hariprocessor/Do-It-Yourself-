<?php
if(!(isset($_REQUEST['id']))){

    die("");
}
error_reporting(E_ALL);
ini_set("display_errors", 1);

session_start();
$email = $_SESSION["email"];
$id = $_REQUEST['id'];
$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->query("delete um from user_module um join user u on u.id=um.user_id where u.email='$email' and um.module_id='$id';");
    print $id;

} catch (PDOException $e) {
}
?>
