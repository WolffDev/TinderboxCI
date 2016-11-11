<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('secret_auth');
		$this->load->model('users_model');
    }

	public function users() {
		$this->secret_auth->method('GET');
		$this->output 
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode($this->users_model->get_all_users()))
			->_display();
		die();
	}

	public function user($id) {
		$this->secret_auth->method('GET');
		$this->output
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode($this->users_model->get_user($id)))
			->_display();
		die();
	}

	public function add_user() {
		$this->secret_auth->method('POST');
		$post = file_get_contents('php://input');
		$post = json_decode($post);

		// Convert the $post object to an array, for testing
		$post = (array)$post;
		$args_check = array('firstname', 'lastname', 'email', 'password');

		// first, flips key/value in $args_check, then comapres the two arrays, lastly test the count
		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {
			// convert $post back to an object, in order to use it with JSON
			$post = (object)$post;
			$options = [
			'cost' => 8,
			];
			$password = password_hash($post->password, PASSWORD_BCRYPT, $options);

			$res = $this->users_model->set_user([
				'firstname' => $post->firstname,
				'lastname' 	=> $post->lastname,
				'email' 	=> $post->email,
				'password' 	=> $password
			]);
			if($res) {
				$this->output
					->set_header('HTTP/1.1 201 Created')
					->set_header('Content-Type: application/json')
					->set_output(json_encode([
						'status' 		=> 201,
						'statusCode' 	=> 'Created',
						'response' 		=> [
							'msg' 	=> 'User Created',
							'id' 	=> $res
						]
					]))
					->_display();
				die();
			}
		}
		
		$this->output
			->set_header('HTTP/1.1 406 Not Acceptable')
			->set_header('Content-Type: application/json')
			->set_output(json_encode([
				'status' => 406,
				'statusCode' => 'Not Acceptable',
				'response' => [
					'msg' => 'Check the JSON data - properties are not correctly'
				]
			]))
			->_display();
		die();

	}

	public function update_user($id) {
		$this->secret_auth->method('PATCH');
		$post = file_get_contents('php://input');
		$post = json_decode($post);

		// Convert the $post object to an array, for testing
		$post = (array)$post;
		$args_check = array('firstname', 'lastname', 'email', 'password');

		// first, flips key/value in $args_check, then comapres the two arrays, lastly test the count
		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {
			// convert $post back to an object, in order to use it with JSON
			$post = (object)$post;
			$options = [
			'cost' => 8,
			];
			$password = password_hash($post->password, PASSWORD_BCRYPT, $options);

			$send_args = [
				'uid' 		=> $id,
				'firstname' => $post->firstname,
				'lastname' 	=> $post->lastname,
				'email' 	=> $post->email,
				'password' 	=> $password
			];

			$res = $this->users_model->update_user($send_args);
			
			if($res) {
				$this->output
					->set_header('HTTP/1.1 200 OK')
					->set_header('Content-Type: application/json')
					->set_output(json_encode([
						'status' => 200,
						'statusCode' => 'OK',
						'response' => [
							'msg' => 'User Updated',
							'id' => $res
						]
					]))
					->_display();
				die();
			}
		}
		
		$this->output
			->set_header('HTTP/1.1 406 Not Acceptable')
			->set_header('Content-Type: application/json')
			->set_output(json_encode([
				'status' => 406,
				'statusCode' => 'Not Acceptable',
				'response' => [
					'msg' => 'Check the JSON data - properties are not set correctly'
				]
			]))
			->_display();
		die();
	}










}