<?php
class Users_model extends CI_Model {
    
    public function get_all_users() {
        $result = $this->db->query('SELECT uid, firstname, lastname, email
            FROM users
            ORDER BY created DESC');
        return $result->result();
    }

    public function get_user($id) {
        $query = sprintf('SELECT
        uid, firstname, lastname, email
        FROM users
        WHERE uid = "%s" '
        , $id);
        $result = $this->db->query($query);
        return $result->row();
    }

    public function set_user($args = []) {
        $query = sprintf('INSERT INTO users
            (firstname, lastname, email, password)
            VALUES
            ("%s", "%s", "%s", "%s")'
            , $args['firstname']
            , $args['lastname']
            , $args['email']
            , $args['password']);
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
            , $args['firstname']
            , $args['lastname']
            , $args['email']
            , $args['password']
            , $args['uid']);
        $result = $this->db->query($query);
        return $args['uid'];

    }

    public function delete_user($id) {
        $query = sprintf('DELETE FROM users WHERE uid = %d'
            , $id);
        if($this->db->query($query)) {
            return true;
        }
        return false;
    }

    public function get_user_by_email_password($email, $password) {
        $query = sprintf('SELECT uid, email, password
            FROM users
            WHERE email = "%s"
            LIMIT 1'
            , $email);
        $result = $this->db->query($query);
        $row = $result->row();

        if(password_verify($password, $row->password)) {
            $token = bin2hex(openssl_random_pseudo_bytes(21));
            $this->insert_token_user($row->uid, $token);
            $res = [$email, $token];
            return $res;
            die();
        }
        return false;
        die();
    }

    public function insert_token_user($uid, $token) {
        $query = sprintf('UPDATE users
            SET
            token_val = "%s",
            token_create = "%s"
            WHERE
            uid = "%s"'
            , $token
            , date('Y-m-d H:i:s')
            , $uid);
        $result = $this->db->query($query);
        
    }

    public function check_token($email, $token) {
        
        $query = sprintf('SELECT token_val FROM users WHERE email = "%s" LIMIT 1 '
        , $email);
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