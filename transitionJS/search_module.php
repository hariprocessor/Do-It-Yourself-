<?php

if(!(isset($_REQUEST['q']))){
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
$q = $_REQUEST['q'];
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $email = $db->quote($email);
    $rows = $db->query("select name from module where module.name='%q%'");
    
    foreach($rows as $row){
        $array[] = array("name"=>$row["name"], "id"=>$row["id"]);
    }

    print json_encode($array);
} catch (PDOException $e) {

}

    

?>
