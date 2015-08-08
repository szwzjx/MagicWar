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
	
	//--------------------------------------------------------------------------------
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
			Gateway::sendToClient($client_id,"\$message_data error!");
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

				self::checkInfo($message_data['Name'],$message_data['Password'],1);

				break;

			//player information
			case 1003:
				
				if(isset($_SESSION['uid']))
				{
					self::getRole($client_id,$_SESSION['uid']);
				}
				else
				{
					echo "[MWP:1003] ".$client_id." error! \$_SESSION['uid'] is not found!";
				}
				break;

			default:
				break;
		}

	}

	//--------------------------------------------------------------------------------
	public static function onClose($client_id)
	{
		echo "Client: ".$client_id." is closed"."\n";
	}
	
	//--------------------------------------------------------------------------------
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
			$row = Db::instance('mwdb')->row("SELECT uid,name,pwd FROM `account` WHERE name= '$name'");
			
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
						$_SESSION['uid'] = $row['uid']; 				
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

	//--------------------------------------------------------------------------------
	public static function getRole($client_id,$uid)
	{
		$row = Db::instance('mwdb')->row("SELECT uid,name,sex,head,coin,lv FROM `account` WHERE uid= '$uid'");
		
		if($row)
		{
			$data = Array('mwp'=>1003,'data'=>Array('errcode'=>0,'errormsg'=>'','name'=>$row['name'],'sex'=>$row['sex'],'head'=>$row['head'],'coin'=>$row['coin'],'lv'=>$row['lv']));
		}		
		else
		{
			$data = Array('mwp'=>1003,'data'=>Array('errcode'=>1,'errormsg'=>'the role is not found'));
		}

		$msg = json_encode($data);
		Gateway::sendToClient($client_id,$msg);
	}
}

