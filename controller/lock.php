<?php
if(!(isset($_REQUEST['id']))){
    print 'hi';
    die("");
}
if(!(isset($_REQUEST['x']))){
    print 'hi';
    die("");
}

if(!(isset($_REQUEST['y']))){
    print 'hi';
    die("");
}

error_reporting(E_ALL);
ini_set("display_errors", 1);


session_start();
$email = $_SESSION["email"];

$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$module_id = $_REQUEST['id'];
$x = $_REQUEST['x'];
$y = $_REQUEST['y'];
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rows = $db->query("select id from user where email='$email';");
    foreach($rows as $row){
        $user_id = $row["id"];
    }
    $db->query("update user_module set x=$x where user_id='$user_id' and module_id='$module_id';");
    $db->query("update user_module set y=$y where user_id='$user_id' and module_id='$module_id';");


} catch (PDOException $e) {
}
?>
