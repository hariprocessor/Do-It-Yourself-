<?php
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
    $rows = $db->query("select um.x, um.y, m.name, m.id from user_module um join user u on u.id=um.user_id join module m on m.id=um.module_id where u.email='$email';");
    foreach($rows as $row){
        $array[] = array("x"=>$row["x"], "y"=>$row["y"], "name"=>$row["name"], "id"=>$row["id"]);
    }
    print json_encode($array);


} catch (PDOException $e) {
}
?>
