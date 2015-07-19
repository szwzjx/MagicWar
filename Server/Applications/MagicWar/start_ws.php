<?php use Workerman\Worker;
require_once './Workerman/Autoloader.php';

$ws_worker = new Worker("websocket://0.0.0.0:5668");

$ws_worker->count = 4;

$ws_worker->onMessage = function($connection, $data)
{
    $connection->send('hello ' . $data);
};

Worker::runAll();

