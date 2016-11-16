<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('secret_auth');
		$this->load->model('users_model');
		$this->load->model('shifts_model');
    }

	public function users() {
		$this->secret_auth->method('GET');
		$this->secret_auth->check_token();
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

		// first, flips key/value in $args_check, then compares the two arrays, lastly test the count
		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {
			// convert $post back to an object, in order to use it with JSON
			$post = (object)$post;
			
			$options = [
			'cost' => 8,
			];
			$password = password_hash($post->password, PASSWORD_BCRYPT, $options);

			$res = $this->users_model->set_user([
				'firstname' => $post->firstname,
				'lastname' => $post->lastname,
				'email' => $post->email,
				'password' => $password
			]);
			if($res) {
				$this->output
					->set_header('HTTP/1.1 201 Created')
					->set_header('Content-Type: application/json')
					->set_output(json_encode([
						'status' => 201,
						'statusCode' => 'Created',
						'response' => [
							'message' => 'User Created',
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
				'error' => 406,
				'errorCode' => 'Not Acceptable',
				'response' => [
					'message' => 'Check the JSON data - properties are not correctly'
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
				'uid' => $id,
				'firstname' => $post->firstname,
				'lastname' => $post->lastname,
				'email' => $post->email,
				'password' => $password
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
							'message' => 'User Updated',
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
				'error' => 406,
				'errorCode' => 'Not Acceptable',
				'response' => [
					'message' => 'Check the JSON data - properties are not set correctly'
				]
			]))
			->_display();
		die();
	}

	public function delete_user($id) {
		$this->secret_auth->method('DELETE');
		$res = $this->users_model->delete_user($id);

		$this->output
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode([
				'status' => 200,
				'statusCode' => 'OK',
				'response' => [
					'message' => 'User is deleted from the database'
				]
			]))
			->_display();
		die();
	}

	public function login() {
		$this->secret_auth->handle_login();
	}



	public function all_shifts() {
		$this->secret_auth->method('GET');
		$this->output
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode($this->shifts_model->get_all_shifts()))
			->_display();
		die();
	}

	public function shifts($id) {
		$this->secret_auth->method('GET');
		$this->output
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode($this->shifts_model->get_shifts($id)))
			->_display();
		die();
	}

	public function add_shift() {
		$this->secret_auth->method('POST'); 
		$post = file_get_contents('php://input');
		$post = json_decode($post);

		$post = (array)$post;
		$args_check = array('shift_name', 'shift_content', 'shift_station', 'shift_location', 'shift_start', 'shift_end');

		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {

			$post = (object)$post;
		
			$res = $this->shifts_model->set_shift([
				'shift_name' => $post->shift_name,
				'shift_content' => $post->shift_content,
				'shift_station' => $post->shift_station,
				'shift_location' => $post->shift_location,
				'shift_start' => $post->shift_start,
				'shift_end' => $post->shift_end
			]);
			if($res) {
				$this->output
					->set_header('HTTP/1.1 201 Created')
					->set_header('Content-Type: application/json')
					->set_output(json_encode([
						'status' => 201,
						'statusCode' => 'Created',
						'response' => [
							'message' =>'User Created',
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
				'error' => 406,
				'errorCode' => 'Not Acceptable',
				'response' => [
					'message' => 'Check the JSON data - properties are not correctly'
				]
			]))
			->_display();
		die();

	}

	public function update_shift($id) {
		$this->secret_auth->method('PATCH');
		$post = file_get_contents('php://input');
		$post = json_decode($post);

		$post = (array)$post;
		$args_check = array('shift_name', 'shift_content', 'shift_station', 'shift_location', 'shift_start', 'shift_end');

		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {

			$post = (object)$post;

			$res = $this->shifts_model->update_shift([
				'shift_name' => $post->shift_name,
				'shift_content' => $post->shift_content,
				'shift_station' => $post->shift_station,
				'shift_location' => $post->shift_location,
				'shift_start' => $post->shift_start,
				'shift_end' => $post->shift_end,
				'sid' => $id
			]);
			if($res) {
				$this->output
					->set_header('HTTP/1.1 200 OK')
					->set_header('Content-Type: application/json')
					->set_output(json_encode([
						'status' => 200,
						'statusCode' => 'OK',
						'response' => [
							'message' =>'User Updated',
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
				'error' => 406,
				'errorCode' => 'Not Acceptable',
				'response' => [
					'message' => 'Check the JSON data - properties are not correctly'
				]
			]))
			->_display();
		die();
	}

	public function delete_shift($id) {
		$this->secret_auth->method('DELETE');
		$res = $this->shifts_model->delete_shift($id);

		$this->output
			->set_header('HTTP/1.1 200 OK')
			->set_header('Content-Type: application/json')
			->set_output(json_encode([
				'status' => 200,
				'statusCode' => 'OK',
				'response' => [
					'message' => 'Shift is deleted from the database'
				]
			]))
			->_display();
		die();
	}
}