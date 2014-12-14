<?php
if(!(isset($_REQUEST['id']))){
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
$id = $_REQUEST['id'];
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    $email = $db->quote($email);
    $rows = $db->query("select count(*), u.id from user_module um join user u on u.id=um.user_id where um.module_id=$id and u.email='$email';");
    $count = 0;
    
    foreach($rows as $row){
        $count = $row["count(*)"];
    }
    $rows = $db->query("select id from user where email='$email';");
    foreach($rows as $row){
        $u_id = $row["id"];
    }
    if($count == 1){
        print "count is 1";
    }
    else {
        
        $db->query("insert into user_module(user_id, module_id, x, y) values ($u_id, $id, -1, -1);");
        print $id;
    }
    

} catch (PDOException $e) {
}
?>
