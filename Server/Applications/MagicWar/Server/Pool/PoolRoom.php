<?php

namespace Server\Pool;

class PoolRoom
{
	public static $pool;

	public static $container;

	public function __construct()
	{
	}

	public static createRoom($classFactory)
	{
		$key = $classFactory::$key;
			
		if(empty($pool))
		{
			$pool = array();	
		}
		else
		


	}

	public static destoryRoom()
	{

	}

	public static getListRoom()
	{

	}
}
