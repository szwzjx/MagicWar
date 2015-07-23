<?php

use \Workerman\Worker;
use \Workerman\WebServer;
use \GatewayWorker\Gateway;
use \GatewayWorker\BusinessWorker;
use \Workerman\Autoloader;

require_once __DIR__.'/../../Workerman/Autoloader.php';
Autoloader::setRootPath(__DIR__);

$worker = new BusinessWorker();

$worker -> name = 'MWBusinessWorker';

$worker -> count = 4;

if(!defined('GLOBAL_START'))
{
	Worker::runAll();
}
