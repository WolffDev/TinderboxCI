<?php
class Users_model extends CI_Model {
    
    public function get_all_users() {
        $result = $this->db->query('SELECT uid, firstname, lastname, email
            FROM users
            ORDER BY created DESC');
        return $result->result();
    }

    public function get_user($id = null) {
        $query = sprintf('SELECT
        uid, firstname, lastname, email
        FROM users
        WHERE uid = "%s" '
        , $this->db->escape_like_str($id));
        $result = $this->db->query($query);
        if($result) {
            return $result->row();
        }
        return false;
    }

    public function set_user($args = []) {
        $query = sprintf('INSERT INTO users
            (firstname, lastname, email, password)
            VALUES
            ("%s", "%s", "%s", "%s")'
            , $this->db->escape_like_str($args['firstname'])
            , $this->db->escape_like_str($args['lastname'])
            , $this->db->escape_like_str($args['email'])
            , $this->db->escape_like_str($args['password']));
        $this->db->query($query);
        $id = $this->db->insert_id();
        if(is_int($id) && $id > 0) {
            return $id;
        }
        return false;
    }

    public function update_user($args = []) {
        $query = sprintf('UPDATE users
            SET
            firstname = "%s",
            lastname = "%s",
            email = "%s",
            password = "%s"
            WHERE uid = %d '
            , $this->db->escape_like_str($args['firstname'])
            , $this->db->escape_like_str($args['lastname'])
            , $this->db->escape_like_str($args['email'])
            , $this->db->escape_like_str($args['password'])
            , $this->db->escape_like_str($args['uid']));
        $result = $this->db->query($query);
        return $args['uid'];

    }

    public function delete_user($id = null) {
        $query = sprintf('DELETE FROM users WHERE uid = %d'
            , $this->db->escape_like_str($id));
        $this->db->query($query);

        if($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
       
    }

    public function get_user_by_email_password($email, $password) {
        $query = sprintf('SELECT uid, firstname, lastname, email, password
            FROM users
            WHERE email = "%s"
            LIMIT 1'
            , $this->db->escape_like_str($email));
        $result = $this->db->query($query);
        $row = $result->row();

        if(password_verify($password, $row->password)) {
            $token = bin2hex(openssl_random_pseudo_bytes(21));
            $this->insert_token_user($row->uid, $token);
            $res = [
                'userid' => $row->uid,
                'firstname' => $row->firstname,
                'lastname' => $row->lastname,
                'email' => $row->email,
                'token' => $token
            ];
            return $res;
            die();
        }
        return false;
        die();
    }

    public function insert_token_user($uid = null, $token = null) {
        $query = sprintf('UPDATE users
            SET
            token_val = "%s",
            token_create = "%s"
            WHERE
            uid = "%s"'
            , $this->db->escape_like_str($token)
            // , NULL
            , date('Y-m-d H:i:s')
            , $this->db->escape_like_str($uid));
        $this->db->query($query);
        
    }

    public function check_token($email = null, $token = null) {
        
        $query = sprintf('SELECT token_val FROM users WHERE email = "%s" LIMIT 1 '
        , $this->db->escape_like_str($email));
        $result = $this->db->query($query);
        $row = $result->row();
        if($row->token_val === $token) {
            return true;
            die();
        }
        return false;
        die();

    }



}