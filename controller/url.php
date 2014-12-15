<?php
if(!(isset($_REQUEST['id']))){
    die("");
}
error_reporting(E_ALL);
ini_set("display_errors", 1);


$dbname = "diy_db";
$username = "diy";
$password = "tomato";
$db = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$id = $_REQUEST['id'];
try{
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    $email = $db->quote($email);
    $rows = $db->query("select u.email, m.name from module m join user u on u.id=m.user_id where m.id=$id;");
    
    foreach($rows as $row){
        $email = $row["email"];
        $module = $row["name"];
    }
    
    print "http://diy.hariprocessor.com/module/$email/$module/index.html";

} catch (PDOException $e) {
}
?>
