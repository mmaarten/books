<?php

require_once 'model.php';

$segments = explode('/', $_SERVER['REQUEST_URI']);
$segments = array_filter($segments);
$segments = array_slice($segments, 2);

if (! $segments || count($segments) < 2) {
    header('HTTP/1.1 403 Forbidden');
    exit;
}

$controller = $segments[0];
$method     = $segments[1];
$params     = array_slice($segments, 2);

if ($controller == 'book' && $method == 'get') {

    header('HTTP/1.1 200 OK');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');

    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if (! array_key_exists('book_id', $data)
     || ! array_key_exists('user_id', $data)) {
        // error
    }

    $result = get_bookshelves($data['book_id'], $data['user_id']);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($result);

    exit;
}

if ($controller == 'book' && $method == 'add') {

    header('HTTP/1.1 200 OK');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');

    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if (! array_key_exists('book_id', $data)
     || ! array_key_exists('bookshelf_id', $data)
     || ! array_key_exists('user_id', $data)) {
        // error
    }

    $result = add_book($data['book_id'], $data['bookshelf_id'], $data['user_id']);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($result);

    exit;
}

if ($controller == 'book' && $method == 'remove') {

    header('HTTP/1.1 200 OK');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');

    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if (! array_key_exists('book_id', $data)
     || ! array_key_exists('user_id', $data)) {
        // error
    }

    $result = remove_book($data['book_id'], $data['user_id']);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($result);

    exit;
}
