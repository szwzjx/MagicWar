<?php

namespace Server;

class Player
{
	public $server;
	
	public $name;

	public $level;

	public $gender;

	public $coin;

	public function __construct($server)
	{
		$this->server = $server;
		$this->name = "";
		$this->level = 0;
		$this->gender = 100;
		$this->coin = 0;
	}

}
