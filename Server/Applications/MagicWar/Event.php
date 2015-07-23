<?php

use \GatewayWorker\Lib\GateWay;
use \GatewayWorker\Lib\Store;
use \GatewayWorker\Lib\Db;

class Event
{
	public static function onConnect($client_id)
	{
		
	}	
	
	public static function onMessage($client_id,$message)
	{
		//$ret = Db::instance('magicwar')->select('*')->from('account')->where
		
	}

	public static function onClose($client_id)
	{

	}
}
