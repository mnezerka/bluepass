<?php
require_once 'config.php';

 // Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

function dbGetFilePath($userName) {
    global $BLUEPASS_DATA_DIR;
    $path = dirname(__FILE__);
    if (strlen($BLUEPASS_DATA_DIR) > 0) {
        $path .= DIRECTORY_SEPARATOR . $BLUEPASS_DATA_DIR;
    }
    $path .= DIRECTORY_SEPARATOR . 'db.' . $userName . '.bluepass';
    return $path;
}

function dbLoad($userName) {
    $filePath = dbGetFilePath($userName);
    if (!file_exists($filePath)) {
        return '';
    } else  {
        return file_get_contents($filePath);
    }
}

function dbSave($userName, $data) {
    $filePath = dbGetFilePath($userName);
    if (file_put_contents($filePath, $data) === false)
        return false;
    return true;
}

function onError($header, $msg) {
    header($header);
    header('Content-type: application/json');
    die('{"description": "' . $msg . '"}');
}

function onError403($msg) {
    onError("HTTP/1.0 403 Forbidden", $msg);
}

function onError404($msg) {
    onError("HTTP/1.0 404 Not Found", $msg);
}

function onError400($msg) {
    onError("HTTP/1.0 400 Bad Request", $msg);
}

function onError500($msg) {
    onError("HTTP/1.0 500 Internal Server Error", $msg);
}

function getToken($userName, $secret) {
    $token = array(
        'username' => $userName
    );
    $tokenJson = json_encode($token);
    $tokenBase64 = base64_encode($tokenJson);
    $result = $tokenBase64 . '.' . md5($secret . $tokenBase64);
    return $result;
}

function validateToken($token, $secret) {
    global $BLUEPASS_USERS;

    $parts = explode('.', $token);
    if (count($parts) != 2) return false; 
    $sign = md5($secret . $parts[0]);
    if ($sign != $parts[1]) return false;

    $data = getTokenData($token);
    if (!property_exists($data, 'username')) return false;
    if (!in_array($data->username, $BLUEPASS_USERS)) return false;

    return true;
}

function getTokenData($token) {
    $parts = explode('.', $token);
    if (count($parts) != 2) return null; 
    return json_decode(base64_decode($parts[0]));
}

function getRequestToken() {
    $headers = array_change_key_case(apache_request_headers(), CASE_LOWER);
    if(isset($headers['authorization-bp'])) {
        $matches = array();
        preg_match('/BP (.*)/', $headers['authorization-bp'], $matches);
        if(isset($matches[1])) {
            $token = $matches[1];
            return $token;
        }
    } 
    return null;
}

function getRequestTokenData() {
    global $BLUEPASS_SECRET;

    $token = getRequestToken();
    if (!is_null($token)) {
        return getTokenData($token);
    } 
    return null;
}

function validateRequest() {
    global $BLUEPASS_SECRET;

    $token = getRequestToken();
    if (!is_null($token)) {
        return validateToken($token, $BLUEPASS_SECRET);
    } 
    return false;
}

// Access-Control headers are received during OPTIONS requests
function handleOptions() {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

function handlePost($ep) {
    global $BLUEPASS_SECRET;
    global $BLUEPASS_USERS;

    switch ($ep) {

        case 'auth':
            $data = json_decode(file_get_contents('php://input'));
            if (!isset($data->username) || !isset($data->password)) {
                onError400('missing username or password');
            };

            if (!in_array($data->username, $BLUEPASS_USERS)) {
                onError403('unknown user');
            };

            if ($data->password !== $BLUEPASS_SECRET) {
                onError403('invalid password');
            };

            $token = getToken($data->username, $BLUEPASS_SECRET);
            $response = array(
                'token' => $token
            );

            header('Content-type: application/json');
            echo json_encode($response);
            break;

        case 'db':
            if (!validateRequest()) onError403('Invalid authorization');
            $tokenData = getRequestTokenData();
            $request = json_decode(file_get_contents('php://input'));
            if (is_null($request)) {
                onError400('Invalid body format (JSON)');
            } 
            if (!isset($request->data)) {
                onError400('Missing data attribute');
            }
           
            if(!dbSave($tokenData->username, base64_decode($request->data)))
                onError500('Cannot save data');;
            break;

        default:
            onError404("Endpoint $ep does not exist");
    }
} 

function handleGet($ep) {

    switch ($ep) {

        case 'info':
            if (!validateRequest()) onError403('Invalid authorization');
            phpinfo();
            break;

        case 'db':
            if (!validateRequest()) onError403('Invalid authorization');
            $tokenData = getRequestTokenData();
            header('Content-type: application/json');
            $dbData = dbLoad($tokenData->username);            
            $response = array(
                'data' => base64_encode($dbData)
            );
            echo json_encode($response);
            break;

        default:
            header("HTTP/1.0 404 Not Found");
            echo "Endpoint $ep does not exist";
            die();
    }
}

function main() {
    $ep = isset($_REQUEST['request']) ? $_REQUEST['request'] : null;
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            handlePost($ep);
            break; 

        case 'OPTIONS':
            handleOptions($ep);
            break; 

        case 'GET':
            handleGet($ep);
            break;

        default:
            onError404('Method not supported');
    }
}

main();


?>
