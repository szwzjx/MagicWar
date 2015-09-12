<?php

namespace Server;

class Character extends Entity
{
	public $orientation = null;

	public function __construct($id,$type,$kind,$x,$y)
	{
		parent::__construct($id,$type,$kind,$x,$y);

		$this->orientation = 0;
	}
}
