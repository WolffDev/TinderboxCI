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




}