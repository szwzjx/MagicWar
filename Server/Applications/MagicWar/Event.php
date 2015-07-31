<?php

use \GatewayWorker\Lib\GateWay;
use \GatewayWorker\Lib\Store;
use \GatewayWorker\Lib\Db;

class Event
{
	public static function onConnect($client_id)
	{
		echo "new Client: ",$client_id,"\n";
	}	
	
	public static function onMessage($client_id,$message)
	{
		echo "new Message from ".$client_id," : ",$message,"\n";
		
		$message_data = json_decode($message,true);
		
		if(!$message_data)
		{
			return;		
		}

		switch ($message_data["action"])
		{
			//register
			case 1001:
				if(!isset($message_data['name']))
				{
					throw new \Exception("\$message_data['name'] not set.client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
				}

				$aa = Db::instance('mwdb')->query("INSERT INTO `account` (`id`,`name`,`sex`,`coin`) VALUES ('5',$message_data['name'],3,23442)");
				break;
				
			//login
			case 1002;
				break;
			default:
				break;
		}
		if($message == 'cc')
		{
			$cc = Db::instance('mwdb')->select('coin')->from('account')->where("name = 'mall'")->single();
			echo "mall coin: ",$cc,"\n";
		}
	
		if($message == 'aa')
		{
			$name = "gold".$client_id.rand(100,300);
			$sex = rand(1,3);
			$coin = rand(111,555) *78 ;
			$aa = Db::instance('mwdb')->query("INSERT INTO `account` (`id`,`name`,`sex`,`coin`) VALUES ('5','baby',3,23442)");
			echo "add name=",$name," sex=",$sex," coin= ",$coin,"\n";
		}
	}

	public static function onClose($client_id)
	{

	}
}
