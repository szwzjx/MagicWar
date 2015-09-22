<?php

use \GatewayWorker\Lib\GateWay;
use \GatewayWorker\Lib\Store;
use \GatewayWorker\Lib\Db;
use \Server\Entity\Player;

require_once __DIR__.'/Server/Const.php';

class Event
{
	public static $server;
	
	public static function onConnect($client_id)
	{
		echo "New Client: ",$client_id,"\n";
	}	
	
	//--------------------------------------------------------------------------------
	public static function onMessage($client_id,$message)
	{
		
		$message_data = json_decode($message,true);
		
		if(!$message_data)
		{
			Gateway::sendToClient($client_id,"\$message_data error!");
			return;		
		}

		switch ($message_data["MWP"])
		{
			case  CONST_MESSAGE_REGISTER:

				if(!isset($message_data['Name']))
				{
					throw new \Exception("\$message_data['Name'] not set.client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
				}
	

				self::do_login_or_register($client_id,$message_data['Name'],$message_data['Password'],0);
				break;
				
			case CONST_MESSAGE_LOGIN:

				if(!isset($message_data['Name']))
				{
					throw new \Exception("\$message_data['Name'] not set.client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
				}

				self::do_login_or_register($client_id,$message_data['Name'],$message_data['Password'],1);
				break;

			case CONST_MESSAGE_CREATE_ROLE:
					
				if(isset($message_data['RoleName']) && isset($message_data['Gender']))
				{
					self::create_role($client_id,$message_data['RoleName'],$message_data['Gender']);
				}

				break;

			case CONST_MESSAGE_GET_ROLE:
				
				if(isset($_SESSION['uid']))
				{
					self::get_role($client_id,$_SESSION['uid']);
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
		echo "Client: ".$client_id." is closed ".$_SESSION['uid']."\n";
	}
	
	//--------------------------------------------------------------------------------
	public static function do_login_or_register($client_id,$name,$pwd,$flag)
	{
		$ok = false;
		$data = Array();
		$login_in = false;

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
			$row = Db::instance('mwdb')->row("SELECT uid,name,password FROM `account` WHERE name= '$name'");
			
			if($row)
			{	
				if($flag == 0)
				{
					echo "Client: ".$name." already exist! Register failed!"."\n";
					$data = Array('mwp' => CONST_MESSAGE_REGISTER,'data' => Array('errcode' => 1,'errormsg' => 'Register failed!'));
				}
				else
				{
					if( $row['password'] == $pwd)
					{
						$_SESSION['uid'] = $row['uid']; 	
						Gateway::bindUid($client_id,$row['uid']);
						$data = Array('mwp' => CONST_MESSAGE_LOGIN,'data' => Array('errcode' => 0,'errormsg' => ''));
						$player = new Player(self::$server,$_SESSION['uid']);
						self::$server->hall->addPlayer($player);
						$login_in = true;
					}
					else
					{
						echo "Client: ".$name." Password is not correct!login failed!"."\n";	
						$data = Array('mwp' => CONST_MESSAGE_LOGIN,'data' => Array('errcode' => 1,'errormsg' => 'Password is not correct!Login failed!'));
					}
				}
			}
			else
			{
				if($flag == 0)
				{
					$insert = Db::instance('mwdb')->query("INSERT INTO `account` (`name`,`password`) VALUES ('$name','$pwd')");
					
					if($insert)
					{
						$_SESSION['uid'] = $row['uid']; 
						Gateway::bindUid($client_id,$row['uid']);
						$data = Array('mwp' => CONST_MESSAGE_REGISTER,'data' => Array('errcode' => 0,'errormsg' => ''));
						$player = new Player(self::$server,$_SESSION['uid']);
						self::$server->hall->addPlayer($player);
					}
					else
					{
						echo "Client: ".$name." register failed!"."\n";	
						$data = Array('mwp' => CONST_MESSAGE_REGISTER,'data' => Array('errcode' => 1,'errormsg' => 'Register failed!'));						
					}
				}
				else
				{
					echo "Client: ".$name." does not exist! login failed"."\n";
					$data = Array('mwp' => CONST_MESSAGE_LOGIN,'data' => Array('errcode' => 1,'errormsg' => 'Login failed!'));
				}
			}
		}
		
		self::send_to_client($client_id,$data);

		if($login_in)
		{
			self::get_role($client_id,$_SESSION['uid']);
		}
	}

	//--------------------------------------------------------------------------------
	public static function create_role($client_id,$rolename,$gender)
	{
		$data = Array('mwp' => CONST_MESSAGE_CREATE_ROLE,'data' => Array('errcode' => 1,'errormsg' => 'create role failed'));

		if($_SESSION['uid'] > 0)
		{
			$uid = $_SESSION['uid'];
			$row = Db::instance('mwdb')->row("SELECT accountid FROM `player` WHERE playername= '$rolename'");
			$row2 = Db::instance('mwdb')->row("SELECT playername FROM `player` WHERE accountid= '$uid'");

			if(!$row && !$row2)
			{
				
				$que = Db::instance('mwdb')->row("SELECT uid,name FROM `account` WHERE uid= $uid");
				$name = $que['name'];
				$insert = Db::instance('mwdb')->query("INSERT INTO `player` (`playername`,`accountid`,`accountname`,`gender`) VALUES ('$rolename',$uid,'$name',$gender)");

				if($insert == 0)
				{
					$data = Array('mwp' => CONST_MESSAGE_CREATE_ROLE,'data' => Array('errcode' => 0,'errormsg' => ''));
				}
			}
		}

		self::send_to_client($client_id,$data);
		
		if($data['data']['errcode'] == 0)
		{
			self::get_role($client_id,$uid);
		}
	}

	//--------------------------------------------------------------------------------
	public static function get_role($client_id,$uid)
	{
		$row = Db::instance('mwdb')->row("SELECT playername,lv,exp,coin,gender,headicon FROM `player` WHERE accountid= $uid");
		$data = Array('mwp'=>CONST_MESSAGE_GET_ROLE,'data'=>Array('errcode'=>1,'errormsg'=>'the role is not found'));

		if($row)
		{
			$data = Array('mwp' => CONST_MESSAGE_GET_ROLE,'data'=>Array('errcode'=> 0,'errormsg' => '','Playername' => $row['playername'],'Lv' => $row['lv'],'Exp' => $row['exp'],'Coin' => $row['coin'],'Gender' => $row['gender'],'Headicon' => $row['headicon']));
		}

		self::send_to_client($client_id,$data);
	}

	//--------------------------------------------------------------------------------
	public static function send_to_client($client_id,$data)
	{
		if($client_id > 0 && $data)
		{
			$msg = json_encode($data);
			Gateway::sendToClient($client_id,$msg);
		}
	}
}

