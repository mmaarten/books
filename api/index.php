<?php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
print_r($uri);
exit;
$servername = "localhost";
$username = "root";
$password = "root";
$database = "my_library";

// Create connection
$conn = new mysqli($servername, $username, $password,  $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$result = $conn->query("SELECT * FROM books");

$a = [];
while($row = $result->fetch_assoc()) {
    $a[] = $row;
}

header('Content-Type: application/json');
header('HTTP/1.1 200 OK');
echo json_encode($a);
