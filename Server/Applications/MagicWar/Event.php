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
		
		if($message == "Hello! This is a test!")
		{
			Gateway::sendToClient($client_id,"Haha,I know this test!");
			return;
		}
		
		$message_data = json_decode($message,true);
		
		if(!$message_data)
		{
			return;		
		}

		switch ($message_data["MWP"])
		{
			//register
			case 1001:

				if(!isset($message_data['Name']))
				{
					throw new \Exception("\$message_data['Name'] not set.client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
				}
	
				echo "[MWP:1001]"."\$message_data['Name'] is ".$message_data['Name']."\n";

				self::checkInfo($message_data['Name'],$message_data['Password'],0);

				break;
				
			//login
			case 1002;

				if(!isset($message_data['Name']))
				{
					throw new \Exception("\$message_data['Name'] not set.client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
				}
	
				echo "[MWP:1002]"."\$message_data['Name'] is ".$message_data['Name']."\n";

				self::checkInfo($message_data['Name'],$message_data['Password'],1);

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
		echo "Client: ".$client_id." is closed"."\n";
	}
	
	public static function checkInfo($name,$pwd,$flag)
	{
		$ok = false;
		
		if(strlen($name) > 0 && strlen($name) <= 11)
		{
			if(preg_match("/^[A-Za-z]+$/",$name))
			{
				if(strlen($pwd) >= 6 && strlen($pwd) <= 12)
				{
					if(preg_match("/^[A-Za-z0-9]+$/",$pwd))
					{
						$ok = true;
					}
					else
					{
						echo "\$pwd is illegal"."\n";
						return false;
					}
				}
				else
				{
					echo "\$pwd length is illegal"."\n";
					return false;
				}
			}
			else
			{
				echo "\$name  is illegal"."\n";
				return false;
			}
		}
		else
		{
			echo "\$name length is illegal"."\n";
			return false;
		}

		if($ok)
		{
			$row = Db::instance('mwdb')->row("SELECT name,pwd FROM `account` WHERE name= '$name'");
			
			if($row)
			{	
				if($flag == 0)
				{
					echo "Client: ".$name." already exist! Register failed!"."\n";
				}
				else
				{
					if( $row['pwd'] == $pwd)
					{
						echo "Client: ".$name." login success!"."\n";						
					}
					else
					{
						echo "Client: ".$name." Password is not correct!login failed!"."\n";					
					}
				}
			}
			else
			{
				if($flag == 0)
				{
					$insert = Db::instance('mwdb')->query("INSERT INTO `account` (`name`,`pwd`) VALUES ('$name','$pwd')");
					
					if($insert)
					{
						echo "Client: ".$name." register success!"."\n";
					}
					else
					{
						echo "Client: ".$name." register failed!"."\n";							
					}
				}
				else
				{
					echo "Client: ".$name." does not exist! login failed"."\n";
				}
			}
		}
	}
}

