<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CoScholastic_Skill_model extends CI_Model //Test_Model
{
	private $table = 'skills';
  	
	function __construct(){
		parent::__construct();
	}
	/*listing all skills*/
	function list_all(){
		$this->db->order_by('skill_id','asc');
		return $this->db->get($this->table);
	}
	/*to get skill_id*/
	function get_by_id($id){
		 $this->db->where('skill_name', $id);//skill_id
		 return $this->db->get($this->table);
	}
    /*to insert skills into the skills table*/
	function insert($object)
	{
		$object = json_decode($object,true);
		//file_put_contents('a.txt',$object);
		$multi_skill  = explode(",",$object['skill_name']);
		$count = count($multi_skill);
		
		for($i = 0; $i<$count; $i++)
		{
			$entries[] = array(
			'skill_name'=>$multi_skill[$i],
			);
		}
		$this->db->insert_batch('skills', $entries); 
		if($this->db->affected_rows() > 0)
		return 1;
		else
		return 0;
	}
	/*to update the table after editing*/
	function update($id, $object)
	{ 
		$this->db->where('skill_id', $id);
		$this->db->update($this->table, $object);
		return $this->db->affected_rows();
	}
	
	function delete($id)
	{
		$this->db->where('skill_id', $id);
		$this->db->delete($this->table);
		return $this->db->affected_rows();
	}
	 
}
