<?php

// handle CORS
//
 // Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// path to database file
$dbFilePath = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'db.bpass';

// POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    file_put_contents($dbFilePath, file_get_contents('php://input'));
    exit(0);
} 

// GET request
header('Content-type: application/octet-stream');

$dbRaw = file_get_contents($dbFilePath);
echo $dbRaw;
?>
