<?php

use \Workerman\Worker;
use \Workerman\WebServer;
use \GatewayWorker\Gateway;
use \GatewayWorker\BusinessWorker;
use \Workerman\Autoloader;
use \Event;

require_once __DIR__.'/../../Workerman/Autoloader.php';
Autoloader::setRootPath(__DIR__);

$worker = new BusinessWorker();

$worker-> name = 'MWBusinessWorker';

$worker-> count = 1;

$worker->onWorkerStart = function($worker)
{
	Event::$server = new \Server\Server();
};

if(!defined('GLOBAL_START'))
{
	Worker::runAll();
}
