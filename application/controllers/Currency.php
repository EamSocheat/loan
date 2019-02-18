<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Currency extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model('M_login');
        $this->load->library('session');
        $this->load->model('M_check_user');
        $this->load->model('M_menu');
        $this->load->helper('form');
        $this->load->model('M_currency');
        $this->load->model('M_common');
    }

    public function getCurrency(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }

        $data["OUT_REC"] = $this->M_currency->selectCurrencyData();
        echo json_encode($data);
    }
    
}

?>