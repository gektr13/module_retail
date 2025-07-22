<?php
include 'index.html';

$data = file_get_contents('php://input');
file_put_contents(__DIR__ . '/log.txt', 'input: ' . print_r($data,1), 8);
file_put_contents(__DIR__ . '/log.txt', 'request: ' . print_r($_REQUEST,1), 8);