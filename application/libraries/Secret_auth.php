<?php
class Secret_auth {
    private $ci;

    public function __construct() {
        $this->ci =& get_instance();
    }

    public function method($allowed_method = 'GET') {
        $this->super_escape('validate', 'string', $allowed_method);
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

        // Validate
        $this->super_escape('validate', 'email', $credentials[0]);
        $this->super_escape('validate', 'password', $credentials[1]);

        // Sanitize
        $safe_email = $this->super_escape('sanitize', 2, $credentials[0]);
        $safe_password = $this->super_escape('sanitize', 2, $credentials[1]);

        $userdata = $this->ci->users_model->get_user_by_email_password($safe_email, $safe_password);
        
        // Needs to return userid, email, token as an array, to use it in Store.js = REFACTOR
        /******************
        * REFACTOR!!!!!!
        ******************/
        if($userdata) {
            $token = $userdata['token'];
            $token = (string)$token;

            $res_token = $userdata['email'] . ':' . $token;

            $encoded_token = base64_encode($res_token);
            $this->http_response(200, 'OK', [
                'userid' => $userdata['userid'],
                'firstname' => $userdata['firstname'],
                'lastname' => $userdata['lastname'],
                'email' => $userdata['email'],
                'secretToken' => $encoded_token
            ]);
        } else {
            $this->http_response(401, 'Unauthorized', [
                'message' => 'Wrong Username and/or Password',
                'warning' => 'You IP has ben recorded. Continuous failed attempts will get your IP blocked'
            ]);
        }
    }

    public function check_token() {
        $this->ci->load->model('users_model');
        $this->ci->load->helper('url');
        $this->method('GET');

        if(!isset(getallheaders()['SecretToken'])) {
            redirect('/', 'location', 'dassad');
            // $this->http_response(401, 'Unauthorized', [
            //     'message' => 'Token is not set',
            //     'warning' => 'Your IP has been recorded. If you keep connecting without the right token, your IP will be blocked'
            // ]);
        }

        $basic_token = getallheaders()['SecretToken'];
        $decoded_token = base64_decode($basic_token);
        $credentials = explode(':', $decoded_token);

        // Validate
        $this->super_escape('validate', 'email', $credentials[0]);
        $this->super_escape('validate', 'string', $credentials[1]);

        // Sanitize
        $safe_email = $this->super_escape('sanitize', 2, $credentials[0]);
        $safe_token = $this->super_escape('sanitize', 2, $credentials[1]);

        $token_check = $this->ci->users_model->check_token($safe_email, $safe_token);
        if($token_check) {
            return true;
            die();
        } else {
            redirect('/', 'location', 301);
            // $this->http_response(401, 'Unauthorized', [
            //     'message' => 'Wrong Token',
            //     'warning' => 'Your IP has been recorded. Continuous failed attempts will get your IP blocked'
            // ]);
        }
	}

    public function http_response($status, $statusText, $response) {
        // Validate 
        if(!is_int($status)) {
            die('Wrong Data int');
        }
        if(!is_string($statusText)) {
            die('Wrong Data string');
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
        $this->ci->output
                ->set_header('HTTP/1.1 404 Not Found')
                ->set_header('Content-Type: application/json')
                ->set_output(json_encode([
                    'message' => 'The content you are trying to reach, does not exist'
                ]))
                ->_display();
            die();
    }

    public function super_escape($ops, $type, $data) {
        switch($ops) {

            case 'validate':
                switch($type) {
                    case 'int':
                        if(!preg_match('/^[0-9]+$/', $data) || empty($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an integer'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'string':
                        if(!is_string($data) || empty($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass a string'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'password':
                        if(!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%\/]{8,24}$/', $data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'Password does not meet the requirements',
                                'require' => 'one number, one small letter, one special character !@#$%/, between 8 and 24 long'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                        /*
                        Between Start -> ^
                        And End -> $
                        of the string there has to be at least one number -> (?=.*\d)
                        and at least one letter -> (?=.*[A-Za-z])
                        and it has to be a number, a letter or one of the following: !@#$%\/ -> [0-9A-Za-z!@#$%\/]
                        and there have to be 8-12 characters -> {8,12}
                        */
                    case 'email':
                        if(!filter_var($data, FILTER_VALIDATE_EMAIL) || empty($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass a valid email'
                            ]);
                        }
                        break;


                    case 'array':
                        if(!is_array($data) || empty($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an array'
                            ]);
                        } else {
                            return true;
                        }
                        break;
                    case 'object':
                        if(!is_object($data) || empty($data)) {
                            $this->http_response(400, 'Bad Request', [
                                'message' => 'You did not pass an object'
                            ]);
                            break;
                        } else {
                            return true;
                        }
                        break;
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