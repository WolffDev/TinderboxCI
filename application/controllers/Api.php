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
		$this->secret_auth->http_response(200 , 'OK', $this->users_model->get_all_users());
	}

	public function user($id) {
		$this->secret_auth->method('GET');
/* *** *** ***
*
* NEED Sanitize, Validate, Escaping
*
*** *** *** */
		$this->secret_auth->http_response(200, 'OK', $this->users_model->get_user($id));
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
			
			$password = password_hash($post->password, PASSWORD_BCRYPT, [
			'cost' => 10,
			]);

			$res = $this->users_model->set_user([
				'firstname' => $post->firstname,
				'lastname' => $post->lastname,
				'email' => $post->email,
				'password' => $password
			]);
			if($res) {
				$this->secret_auth->http_response(201, 'Created', [
					'message' => 'User Created',
					'id' => $res
				]);
			}
		}
		
		$this->secret_auth->http_response(406, 'Not Acceptable', ['message' => 'Check the JSON data - properties are not correctly']);
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
				$this->secret_auth->http_response(200, 'OK', [
					'message' => 'User Updated',
					'id' => $res
					]);
			}
		}
		
		$this->secret_auth->http_response(406, 'Not Acceptable', ['message' => 'Check the JSON data - properties are not set correctly']);
	}

	public function delete_user($id) {
		$this->secret_auth->method('DELETE');
		$res = $this->users_model->delete_user($id);

		$this->secret_auth->http_response(200, 'OK', ['message' => 'User deleted from the database']);
	}

	public function login() {
		$this->secret_auth->handle_login();
	}



	public function all_shifts() {
		$this->secret_auth->method('GET');
		$this->secret_auth->http_response(200, 'OK', $this->shifts_model->get_all_shifts());
	}

	public function shifts($id) {
		$this->secret_auth->method('GET');
		$this->secret_auth->http_response(200, 'OK', $this->shifts_model->get_shifts($id));
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
				$this->secret_auth->http_response(201, 'Created', [
					'message' => 'Shift Created',
					'id' => $res
				]);
			}
		}

		$this->secret_auth->http_response(406, 'Not Acceptable', [
			'message' => 'Check the JSON data - properties are not correct' 
		]);

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
				$this->secret_auth->http_response(200, 'OK', [
					'message' => 'Shift Updated',
					'id' => $res
				]);
			}
		}

		$this->secret_auth->http_response(406, 'Not Acceptable', [
			'message' => 'Check the JSON data - properties are not correct'
		]);
	}

	public function delete_shift($id) {
		$this->secret_auth->method('DELETE');
		$res = $this->shifts_model->delete_shift($id);

		$this->secret_auth->http_response(200, 'OK', [
			'message' => 'Shift is deleted from the database'
		]);
	}
}