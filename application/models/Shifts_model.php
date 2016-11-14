<?php
class Shifts_model extends CI_Model {
     
    public function get_all_shifts() {
        $result = $this->db->query('SELECT sid, userid, shift_name, shift_content, shift_station, shift_location, shift_start, shift_end
            FROM shifts
            ORDER BY created DESC');
        return $result->result();
    }

    public function get_shifts($id) {
        $query = sprintf('SELECT
         sid, shift_name, shift_content, shift_station, shift_location, shift_start, shiftend
        FROM shifts
        WHERE userid = "%s" '
        , $id);
        $result = $this->db->query($query);
        return $result->result();
    }

   

    public function set_shift($args = []) {
        $query = sprintf('INSERT INTO shifts
            (shift_name, shift_content, shift_station, shift_location, shift_start, shift_end)
            VALUES
            ("%s", "%s", "%s", "%s", "%s", "%s")'
            , $args['shift_name']
            , $args['shift_content']
            , $args['shift_station']
            , $args['shift_location']
            , $args['shift_start']
            , $args['shift_end']);
        $this->db->query($query);
        $id = $this->db->insert_id();
        if(is_int($id) && $id > 0) {
            return $id;
        }
        return false;
    }

    public function update_shift($args = []) {
        $query = sprintf('UPDATE shift
            SET
            shift_name = "%s",
            shift_content = "%s",
            shift_station = "%s",
            shift_location = "%s",
            shift_start = "%s",
            shift_end = "%s"
            WHERE sid = %d '
            , $args['shift_name']
            , $args['shift_content']
            , $args['shift_station']
            , $args['shift_location']
            , $args['shift_start']
            , $args['shift_end']
            , $args['sid']);
        $result = $this->db->query($query);
        return $args['sid'];

    }

    public function delete_shift($id) {
        $query = sprintf('DELETE FROM shifts WHERE sid = %d'
            , $id); 
        if($this->db->query($query)) {
            return true;
        }
        return false;
    }
    


}