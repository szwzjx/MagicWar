<?php

namespace Server;

class Hall{
	
	public $hallPlayers;

	public function __construct()
	{
		$this->init();
	}

	public function init()
	{
		echo "A hall is created!"."\n";
		$this->hallPlayers = array();		
	}

	public function addPlayer($player)
	{
		$this->hallPlayers[$player->id] = $player;
		echo "The number of players is ".count($this->hallPlayers)."\n";
	}

	public function removePlayer($player)
	{
		unset($this->hallPlayers[$player->id]);
		echo "The number of players is ".count($this->hallPlayers)."\n";
	}
}
