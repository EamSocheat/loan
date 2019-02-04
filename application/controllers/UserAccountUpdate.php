<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAccountUpdate extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('M_login');
		$this->load->library('session');
		$this->load->model('M_check_user');
		$this->load->model('M_menu');
		$this->load->helper('form');
		$this->load->model('M_common');
		$this->load->model('M_user_account');
        $this->load->library('encrypt');
	}
	
	public function index(){
	    
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	}
	
	public function selectUserAccData(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
        
	    $data["OUT_REC"] = $this->M_user_account->selectUserAccData();
	    echo json_encode($data);
	}

	public function chkPwdChange(){
		$isOk = 0;
		$paramPwd = $this->input->post('pwdNew');

		$record = $this->M_user_account->selectUserAccData();
		if(count($record) > 0){
			$pwd = "";
			foreach($record as $r){
				$pwd = $this->encrypt->decode($r->usr_pwd,"PWD_ENCR_LOAN");
			}
			if($paramPwd == $pwd){
				$isOk = 1;
			}else{
				$isOk = 0;
			}
		}
		echo $isOk;
	}
	
}   
