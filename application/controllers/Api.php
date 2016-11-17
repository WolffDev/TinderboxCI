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
		$this->secret_auth->http_response(200, 'OK', $this->users_model->get_all_users());
	}

	public function user($id = null) {
		$this->secret_auth->method('GET');
		// validate
		$this->secret_auth->super_escape('validate', 'int', $id);
		// Sanitize
		$id = $this->secret_auth->super_escape('sanitize', 2, $id);
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
			
			// Validate
			$this->secret_auth->super_escape('validate', 'string', $post->firstname);
			$this->secret_auth->super_escape('validate', 'string', $post->lastname);
			$this->secret_auth->super_escape('validate', 'email', $post->email);
			$this->secret_auth->super_escape('validate', 'password', $post->password);

			// Sanitize
			$safe_firstname = $this->secret_auth->super_escape('sanitize', 2, $post->firstname);
			$safe_lastname = $this->secret_auth->super_escape('sanitize', 2, $post->lastname);
			$safe_email = $this->secret_auth->super_escape('sanitize', 2, $post->email);
			$safe_password = $this->secret_auth->super_escape('sanitize', 2, $post->password);


			$safe_password = password_hash($safe_password, PASSWORD_BCRYPT, [
			'cost' => 10,
			]);

			$res = $this->users_model->set_user([
				'firstname' => $safe_firstname,
				'lastname' => $safe_lastname,
				'email' => $safe_email,
				'password' => $safe_password
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

	public function update_user($id = null) {
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

			// Validate
			$this->secret_auth->super_escape('validate', 'string', $post->firstname);
			$this->secret_auth->super_escape('validate', 'string', $post->lastname);
			$this->secret_auth->super_escape('validate', 'email', $post->email);
			$this->secret_auth->super_escape('validate', 'password', $post->password);

			// Sanitize
			$safe_firstname = $this->secret_auth->super_escape('sanitize', 2, $post->firstname);
			$safe_lastname = $this->secret_auth->super_escape('sanitize', 2, $post->lastname);
			$safe_email = $this->secret_auth->super_escape('sanitize', 2, $post->email);
			$safe_password = $this->secret_auth->super_escape('sanitize', 2, $post->password);


			$options = [
			'cost' => 8,
			];
			$safe_password = password_hash($safe_password, PASSWORD_BCRYPT, $options);

			$send_args = [
				'uid' => $id,
				'firstname' => $safe_firstname,
				'lastname' => $safe_lastname,
				'email' => $safe_email,
				'password' => $safe_password
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

	public function delete_user($id = null) {
		$this->secret_auth->method('DELETE');

		// validate
		$this->secret_auth->super_escape('validate', 'int', $id);

		// Sanitize
		$safe_id = $this->secret_auth->super_escape('sanitize', 2, $id);

		$res = $this->users_model->delete_user($safe_id);

		if($res) {
			$this->secret_auth->http_response(200, 'OK', [
				'message' => 'User deleted from the database'
			]);
		}

		$this->secret_auth->http_response(404, 'Not Found', [
			'message' => 'User not found in the database'
		]);
	}

	public function login() {
		$this->secret_auth->method('GET');
		$this->secret_auth->handle_login();
	}

	public function all_shifts() {
		$this->secret_auth->method('GET');
		$this->secret_auth->http_response(200, 'OK', $this->shifts_model->get_all_shifts());
	}

	public function shifts($id = null) {
		$this->secret_auth->method('GET');

		// validate
		$this->secret_auth->super_escape('validate', 'int', $id);

		// Sanitize
		$safe_id = $this->secret_auth->super_escape('sanitize', 2, $id);

		$this->secret_auth->http_response(200, 'OK', $this->shifts_model->get_shifts($safe_id));
	}

	public function add_shift() {
		$this->secret_auth->method('POST'); 
		$post = file_get_contents('php://input');
		$post = json_decode($post);

		$post = (array)$post;
		$args_check = array('shift_userid', 'shift_name', 'shift_content', 'shift_station', 'shift_location', 'shift_start', 'shift_end');

		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {
			$post = (object)$post;

			// Validate
			$this->secret_auth->super_escape('validate', 'int', $post->shift_userid);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_name);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_content);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_station);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_location);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_start);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_end);

			// Sanitize
			$safe_shift_userid = $this->secret_auth->super_escape('sanitize', 2, $post->shift_userid);
			$safe_shift_name = $this->secret_auth->super_escape('sanitize', 2, $post->shift_name);
			$safe_shift_content = $this->secret_auth->super_escape('sanitize', 2, $post->shift_content);
			$safe_shift_station = $this->secret_auth->super_escape('sanitize', 2, $post->shift_station);
			$safe_shift_location = $this->secret_auth->super_escape('sanitize', 2, $post->shift_location);
			$safe_shift_start = $this->secret_auth->super_escape('sanitize', 2, $post->shift_start);
			$safe_shift_end = $this->secret_auth->super_escape('sanitize', 2, $post->shift_end);
		
			$res = $this->shifts_model->set_shift([

				'shift_userid' => $safe_shift_userid,
				'shift_name' => $safe_shift_name,
				'shift_content' => $safe_shift_content,
				'shift_station' => $safe_shift_station,
				'shift_location' => $safe_shift_location,
				'shift_start' => $safe_shift_start,
				'shift_end' => $safe_shift_end
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

	public function update_shift($id = null) {
		$this->secret_auth->method('PATCH');

		// Validate
		$this->secret_auth->super_escape('validate', 'int', $id);
		// Sanitize
		$safe_id = $this->secret_auth->super_escape('sanitize', 2, $id);

		$post = file_get_contents('php://input');
		$post = json_decode($post);

		$post = (array)$post;
		$args_check = array('shift_userid', 'shift_name', 'shift_content', 'shift_station', 'shift_location', 'shift_start', 'shift_end');

		if(count(array_intersect_key(array_flip($args_check), $post)) === count($args_check)) {

			$post = (object)$post;

			// Validate
			$this->secret_auth->super_escape('validate', 'int', $post->shift_userid);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_name);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_content);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_station);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_location);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_start);
			$this->secret_auth->super_escape('validate', 'string', $post->shift_end);

			// Sanitize
			$safe_shift_userid = $this->secret_auth->super_escape('sanitize', 2, $post->shift_userid);
			$safe_shift_name = $this->secret_auth->super_escape('sanitize', 2, $post->shift_name);
			$safe_shift_content = $this->secret_auth->super_escape('sanitize', 2, $post->shift_content);
			$safe_shift_station = $this->secret_auth->super_escape('sanitize', 2, $post->shift_station);
			$safe_shift_location = $this->secret_auth->super_escape('sanitize', 2, $post->shift_location);
			$safe_shift_start = $this->secret_auth->super_escape('sanitize', 2, $post->shift_start);
			$safe_shift_end = $this->secret_auth->super_escape('sanitize', 2, $post->shift_end);

			$res = $this->shifts_model->update_shift([
				'shift_userid' => $safe_shift_userid,
				'shift_name' => $safe_shift_name,
				'shift_content' => $safe_shift_content,
				'shift_station' => $safe_shift_station,
				'shift_location' => $safe_shift_location,
				'shift_start' => $safe_shift_start,
				'shift_end' => $safe_shift_end,
				'sid' => $safe_id
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

	public function delete_shift($id = null) {
		$this->secret_auth->method('DELETE');

		// Validate
		$this->secret_auth->super_escape('validate', 'int', $id);
		// Sanitize
		$safe_id = $this->secret_auth->super_escape('sanitize', 2, $id);

		$res = $this->shifts_model->delete_shift($safe_id);

		$this->secret_auth->http_response(200, 'OK', [
			'message' => 'Shift is deleted from the database'
		]);
	}
}