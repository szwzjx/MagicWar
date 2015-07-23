<?php

use \Workerman\Worker;
use \GatewayWorker\Gateway;
use \Workerman\Autoloader;

require_once __DIR__.'/../../Workerman/Autoloader.php';
Autoloader::setRootPath(__DIR__);

$gateway = new Gateway("websocket://0.0.0.0:7290");

$gateway->name = 'MWGateway';

$gateway->count = 4;

$gateway->lanIp = '127.0.0.1';

$gateway->startPort = 3001;

$gateway->pingInterval = 10;

$gateway->pingData = '{"type":"ping"}';

if(!defined('GLOBAL_START'))
{
	Worker::runAll();
}
