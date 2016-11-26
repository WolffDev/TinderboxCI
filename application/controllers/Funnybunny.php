<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Funnybunny extends CI_Controller {

	public function index()
	{
		$this->load->view('funnybunny_view');
	}
}
