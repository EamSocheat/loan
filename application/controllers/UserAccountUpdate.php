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

	public function chkPwdChange($newPwd){
		$isOk = 0;
		if($newPwd != null || $newPwd != ""){
			$paramPwd = $newPwd;
		}else{
			$paramPwd = $this->input->post('pwdNew');
		}

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
		return $isOk;
	}

	public function update(){
	    $this->db->trans_begin();
	    
	    //if(chkPwdChange() == 0) return;

        $data = array(
            'usr_nm' 	=> $this->input->post('regLogNm'),
            'usr_pwd'	=> $this->encrypt->encode($this->input->post('regPwdCon'),"PWD_ENCR_LOAN"),
            'upDt'		=> date('Y-m-d H:i:s'),
            'usr_wri_yn'=> "Y",
            'useYn'		=> "Y",
			'usr_str'	=> "Y",
            'upUsr'		=> $_SESSION['usrId']
        );
        
        $this->M_user_account->update($data);
		
        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            echo 'ERR';
        }else{
            $this->db->trans_commit();
            echo 'OK';
        }
	}

}   
