<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PopupFormUpdate extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->load->model('M_check_user');
		$this->load->helper('form');
		$this->load->model('M_common');
	}
	public function index(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	    $this->load->view('popup/v_popup_udpate_user');
	}
	
	public function selectUserAccData(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
        }
        
        $data["OUT_REC"] = $this->M_customer->selectTestCustomer();
	}
}
