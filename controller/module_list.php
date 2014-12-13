<?php
/*
if(!(isset($_SESSION['email']))){
    print 'hi';
    die("");
}
*/
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
$email = $_SESSION["email"];
$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $email = $db->quote($email);
    $rows = $db->query("select m.name, m.id from user u join user_module um on u.id=um.user_id join module m on m.id=um.module_id where u.email=$email;");
    
    foreach($rows as $row){
	$array[] = array("name"=>$row["name"], "id"=>$row["id"]);
    }

    print json_encode($array);
} catch (PDOException $e) {

}

    

?>
