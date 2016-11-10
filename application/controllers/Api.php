<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function index()
	{
		$this->auth_lib->method('GET');
		$this->load->model('funnybunny_model');

		$this->output 
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output($this->funnybunny_model->get_something()))
			->_display();

		die();
	}
}
