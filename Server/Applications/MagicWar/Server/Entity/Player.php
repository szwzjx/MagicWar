<?php

namespace Server\Entity;

class Player
{
	public $server;
	
	public $id;

	public $name;

	public $level;

	public $gender;

	public $coin;

	public function __construct($server,$id)
	{
		$this->server = $server;
		$this->id = $id;
		$this->name = "";
		$this->level = 0;
		$this->gender = 100;
		$this->coin = 0;
	}
}
