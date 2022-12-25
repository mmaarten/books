<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = 'my_library';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function get_bookshelves($book_id, $user_id) {
    global $conn;

    $sql = sprintf(
        "SELECT bookshelf_id FROM `books` WHERE book_id = '%1\$s' AND user_id = '%2\$s';",
        mysqli_real_escape_string($conn, $book_id),
        mysqli_real_escape_string($conn, $user_id)
    );

    $result = $conn->query($sql);

    $return = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $return[$row['bookshelf_id']] = true;
        }
    }

    return array_keys($return);
}

function add_book($book_id, $bookshelf_id, $user_id) {
    global $conn;

    $sql = sprintf(
        "INSERT INTO `books` (`id`, `book_id`, `bookshelf_id`, `user_id`) VALUES (NULL, '%1\$s', '%2\$s', '%3\$s');",
        mysqli_real_escape_string($conn, $book_id),
        mysqli_real_escape_string($conn, $bookshelf_id),
        mysqli_real_escape_string($conn, $user_id)
    );

    return $conn->query($sql);
}

function remove_book($book_id, $user_id) {
    global $conn;

    $sql = sprintf(
        "DELETE FROM `books` WHERE `book_id` = '%1\$s' AND user_id = '%2\$s';",
        mysqli_real_escape_string($conn, $book_id),
        mysqli_real_escape_string($conn, $user_id)
    );

    return $conn->query($sql);
}
