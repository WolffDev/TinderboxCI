<?php
class Secret_auth {
    private $ci;

    public function __construct() {
        $this->ci =& get_instance();
    }

    public function method($allowed_method = 'GET') {
        $method = $_SERVER['REQUEST_METHOD'];

        if($allowed_method === $method) {
            return true;
        }
        $this->ci->output
            ->set_header('HTTP 1.1 405 Method Not Allowed')
            ->set_header('Content-Type: application/json')
            ->set_output(json_encode([
                'error' => 405,
                'errorCode' => 'Method Not Allowed.'
            ]))
            ->_display();
        die();
    }

    public function handle_login() {
        $this->ci->load->model('users_model');
        
        if(!isset(getallheaders()['Authorization'])) {
            $this->ci->output
                ->set_header('401 Unauthorized')
                ->set_header('Content-Type: json/application')
                ->set_output(json_encode([
                    'error' => 401,
                    'errorCode' => 'Unauthorized',
                    'response' => [
                        'message' => 'No Authorization set.',
                        'warning' => 'Your IP has been recorded and will be blocked if you keep connecting without Authorization.'
                    ]
                ]))
                ->_display();
            die();
        }

        $basic_auth = getallheaders()['Authorization'];
        $encoded_login = explode(' ', $basic_auth)[1];
        $decoded_login = base64_decode($encoded_login);
        $credentials = explode(':', $decoded_login);

        $userdata = $this->ci->users_model->get_user_by_email_password($credentials[0], $credentials[1]);
        
        if($userdata) {
            $this->ci->output
                ->set_header('200 OK')
                ->set_header('Content-Type: json/application')
                ->set_output(json_encode([
                    'status' => 200,
                    'statusCode' => 'OK',
                    'response' => [
                        'email' => $userdata[0],
                        'token' => $userdata[1]
                    ]
                ]))
                ->_display();
            die();
        }

        $this->ci->output
            ->set_header('401 Unauthorized')
            ->set_header('Content-Type: json/application')
            ->set_output(json_encode([
                'error' => 401,
                'errorCode' => 'Unauthorized',
                'response' => [
                    'message' => 'Wrong username and/or password.',
                    'warning' => 'Your IP has been recorded. Continuous failed attempts will get your IP blocked.'
                ]
            ]))
            ->_display();
        die();
    }

    public function check_token() {
        $this->ci->load->model('users_model');

        if(!isset(getallheaders()['SecretToken'])) {
            $this->ci->output
                ->set_header('401 Unauthorized')
                ->set_header('Content-Type: json/application')
                ->set_output(json_encode([
                    'error' => 401,
                    'errorCode' => 'Unauthorized',
                    'response' => [
                        'message' => 'No Token is set',
                        'warning' => 'Your IP has been recorded. If you keep connecting without the right token, your IP will be blocked'
                    ]
                ]))
                ->_display();
            die();
        }

        $basic_token = getallheaders()['SecretToken'];
        $decoded_token = base64_decode($basic_token);
        $credentials = explode(':', $decoded_token);

        // Needs to send email also, for checking !!!
        $token_check = $this->ci->users_model->check_token($credentials[0], $credentials[1]);
        if($token_check) {
            return true;
            die();
        }

        $this->ci->output
            ->set_header('401 Unauthorized')
            ->set_header('Content-Type: json/application')
            ->set_output(json_encode([
                'error' => 401,
                'errorCode' => 'Unauthorized',
                'response' => [
                    'message' => 'Wrong Token',
                    'warning' => 'Your IP has been recorded. Continuous failed attempts will get your IP blocked'
                ]
            ]))
            ->_display();
        die();

		// if($res) {
		// 	echo 'YES';
		// 	die();
		// }
		// echo 'NO!';
		// die();
	}

    public function http_response($status, $statustext, $response) {
        // Validate 
        if(!is_int($status)) {
            die('Wrong Data');
        }
    }

}