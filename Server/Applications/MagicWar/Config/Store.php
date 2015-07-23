<?php

namespace Config;

class Store
{
	const DRIVER_FILE = 1;
	
	const DRIVER_MC = 2;
	
	const DRIVER_REDIS = 3;
	
	public static $driver = self::DRIVER_FILE;

	public static $gateway = array('127.0.0.1:6339');

	public static $storePath = '';
}

Store::$storePath = sys_get_temp_dir().'/workerman-mw/';
	
