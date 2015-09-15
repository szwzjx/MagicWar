<?php

namespace Server;

require_once __DIR__.'/Const.php';

use \Workerman\Worker;

class Server
{
	public $hall;

	public function __construct()
	{
		$this->init();
	}

	public function init()
	{
		echo "MagicWar server start ... "."\n";
		$this->hall = new Hall();
	}

}

