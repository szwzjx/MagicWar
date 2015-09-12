<?php

namespace Server;

require_once __DIR__.'/Const.php';

use \Workerman\Worker;

class Server
{
	public function __construct()
	{

	}

	public function init()
	{
		echo "This is a server!";
	}

}

