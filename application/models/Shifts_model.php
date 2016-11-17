<?php
class Shifts_model extends CI_Model {
     
    public function get_all_shifts() {
        $result = $this->db->query('SELECT sid, shift_userid, shift_name, shift_content, shift_station, shift_location, shift_start, shift_end
            FROM shifts
            ORDER BY created DESC');
        return $result->result();
    }

    public function get_shifts($id = null) {
        $query = sprintf('SELECT
         sid, shift_name, shift_content, shift_station, shift_location, shift_start, shift_end
        FROM shifts
        WHERE shift_userid = "%s" '
        , $this->db->escape_like_str($id));
        $result = $this->db->query($query);
        return $result->result();
    }

   

    public function set_shift($args = []) {
        $query = sprintf('INSERT INTO shifts
            (shift_userid, shift_name, shift_content, shift_station, shift_location, shift_start, shift_end)
            VALUES
            (%d, "%s", "%s", "%s", "%s", "%s", "%s")'
            , $this->db->escape_like_str($args['shift_userid'])
            , $this->db->escape_like_str($args['shift_name'])
            , $this->db->escape_like_str($args['shift_content'])
            , $this->db->escape_like_str($args['shift_station'])
            , $this->db->escape_like_str($args['shift_location'])
            , $this->db->escape_like_str($args['shift_start'])
            , $this->db->escape_like_str($args['shift_end']));
        $this->db->query($query);
        $id = $this->db->insert_id();
        if(is_int($id) && $id > 0) {
            return $id;
        }
        return false;
    }

    public function update_shift($args = []) {
        $query = sprintf('UPDATE shifts
            SET
            shift_userid = %d,
            shift_name = "%s",
            shift_content = "%s",
            shift_station = "%s",
            shift_location = "%s",
            shift_start = "%s",
            shift_end = "%s"
            WHERE sid = "%s" '
            , $this->db->escape_like_str($args['shift_userid'])
            , $this->db->escape_like_str($args['shift_name'])
            , $this->db->escape_like_str($args['shift_content'])
            , $this->db->escape_like_str($args['shift_station'])
            , $this->db->escape_like_str($args['shift_location'])
            , $this->db->escape_like_str($args['shift_start'])
            , $this->db->escape_like_str($args['shift_end'])
            , $this->db->escape_like_str($args['sid']));
        $result = $this->db->query($query);
        return $args['sid'];

    }

    public function delete_shift($id = null) {
        $query = sprintf('DELETE FROM shifts WHERE sid = %d'
            , $this->db->escape_like_str($id));
        $this->db->query($query);

        if($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
    


}