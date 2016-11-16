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

        $this->http_response(405, 'Method Not Allowed', 'Check your HTTP request');
    }

    public function handle_login() {
        $this->ci->load->model('users_model');
        
        if(!isset(getallheaders()['Authorization'])) {
            $this->http_response(401, 'SMUT POMFRIT', [
                'message' => 'Unauthorized',
                'warning' => 'Your IP has been recorded and will be blocked if you keep connecting without Authorization'
            ]);
        }

        $basic_auth = getallheaders()['Authorization'];
        $encoded_login = explode(' ', $basic_auth)[1];
        $decoded_login = base64_decode($encoded_login);
        $credentials = explode(':', $decoded_login);

        $userdata = $this->ci->users_model->get_user_by_email_password($credentials[0], $credentials[1]);
        
        if($userdata) {
            $this->http_response(200, 'OK', [
                'email' => $userdata[0],
                'token' => $userdata[1]
            ]);
        }

        $this->http_response(401, 'Unauthorized', [
            'message' => 'Wrong Username and/or Password',
            'warning' => 'You IP has ben recorded. Continuous failed attempts will get your IP blocked'
        ]);
    }

    public function check_token() {
        $this->ci->load->model('users_model');

        if(!isset(getallheaders()['SecretToken'])) {
            $this->http_response(401, 'Unauthorized', [
                'message' => 'Token is not set',
                'warning' => 'Your IP has been recorded. If you keep connecting without the right token, your IP will be blocked'
            ]);
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

        $this->http_response(401, 'Unauthorized', [
            'message' => 'Wrong Token',
            'warning' => 'Your IP has been recorded. Continuous failed attempts will get your IP blocked'
        ]);

		if($res) {
			echo 'YES';
			die();
		}
		echo 'NO!';
		die();
	}

    public function http_response($status, $statusText, $response) {
        // Validate 
        if(!is_int($status)) {
            die('Wrong Data');
        }
        if(!is_string($statusText)) {
            die('Wrong Data');
        }

        // Sanitize
        $status = trim(strip_tags($status));
        $status = str_replace('"', '', $status);
        $statusText = trim(strip_tags($statusText));

        //  Escape
        $safe_http_status = sprintf('HTTP/1.1 %d %s '
        , (int)$status
        , (string)$statusText);

        if(is_string($response) || is_object($response) || is_array($response)) {
            $this->ci->output
                ->set_header($safe_http_status)
                ->set_header('Content-Type: application/json')
                ->set_output(json_encode($response))
                ->_display();
            die();
        }
        die('Wrong Data');
    }

    public function super_escape($ops = null, $type = null, $data =null) {
        switch($ops) {
            case 'validate':
                switch($type) {
                    case 'int':
                        if(!preg_match('/^[0-9]+$/')) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an integer'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'string':
                        if(!is_string($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass a string'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'array':
                        if(!is_array($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an array'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'object':
                        if(!is_object($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an object'
                            ]);
                            break;
                        } else {
                            return true;
                        }
                }
                break;
            case 'sanitize':
                switch($type) {
                    case 1:
                        $data = trim(strip_tags($data));
                        return $data;
                        break;
                    case 2:
                        $data = trim(strip_tags($data));
                        $data = str_replace('"', '', $data);
                        $data = str_replace("'", '', $data);
                        return $data;
                        break;
                }
                break;
            case 'escape':
                switch($type) {
                    case 'int':
                        return (int)$data;
                        break;
                    case 'string':
                        return (string)$data;
                        break;
                }
                break;
            default:
                $this->http_response(400, 'Bad Request', [
                    'message' => 'Missing 1 or more parameters'
                ]);
                die();
        }
    }





}