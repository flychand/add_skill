<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class CoScholastic_Skill extends REST_Controller //Test_Cont CoScholastic_Skill_model
{
	function __construct(){
		
		parent::__construct();
		$this->load->library(array('table','form_validation'));
		$this->load->model('master/CoScholastic_Skill_model','',TRUE);
		$this->load->helper('url');
	}
	public function index_get()
	{
		$data['page']='master/co_scholastic_skill';
		$data['sidebar']='menu/master';//master
		$data['js']='master/co_scholastic_skill.js';
		$this->load->view("main",$data); 
	}
	 
	public function exams_get()
	{

		$data=$this->CoScholastic_Skill_model->list_all()->result();
		$this->response($data, 200);

	}
	public function exam_get()
	{
		 if(!$this->get('id'))
        	{
            $this->response(NULL, 400);
       		}
         else{
			$data=$this->CoScholastic_Skill_model->get_by_id($this->get('id'))->result();
			$this->response($data, 200);
			 }	
	}
	public function exam_post()
	{ 
 		$json = $this->post('data'); 
		$section = json_decode($json,true);
     	$id=$section['skill_id'];

     	if(empty($id))
        {
			$data = $this->CoScholastic_Skill_model->insert($json); 
		}
		else{ 
			$data = $this->CoScholastic_Skill_model->update($id,$section); 
		}
		  
		if(!empty($data))
			$this->response($data, 200);
		else
			 $this->response(NULL, 400);	
		 
	}
	public function examm_delete()
	{
		$id=$this->get('id');
		$data = $this->CoScholastic_Skill_model->delete($id);
		if(!empty($data))
			$this->response($data, 200);
		else
			 $this->response(NULL, 400);	
	}  
	
	
}
