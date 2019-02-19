<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Contract extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model('M_login');
        $this->load->library('session');
        $this->load->model('M_check_user');
        $this->load->model('M_menu');
        $this->load->helper('form');
        $this->load->model('M_contract');
        $this->load->model('M_common');
    }
    
    public function index(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $dataMenu['menu_active'] = "Contract";
        $data['header'] = $this->load->view('v_header', $dataMenu, TRUE);
        $data['footer'] = $this->load->view('v_footer', NULL, TRUE);
        $data['iframe'] = $this->load->view('v_iframe', NULL, TRUE);
        
        $this->load->view('v_contract',$data);
    }

    public function getContract(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        $dataSrch = array(
            'limit'         => $this->input->post('perPage'),
            'offset'        => $this->input->post('offset'),
            'con_id'        => $this->input->post('conId'),
            // 'con_nm'        => $this->input->post('txtSrchContNm'),
            'con_no'     => $this->input->post('txtSrchContCode'),
        );

        $data["OUT_REC"] = $this->M_contract->selectContractData($dataSrch);
        $data["OUT_REC_CNT"] = $this->M_contract->countContractData($dataSrch);
        echo json_encode($data);
        
    }

    public function saveContract(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }

        $dataSrch = array(            
            'cus_id'        => $this->input->post('txtCusId'),
            'cus_phone1'    => $this->input->post('txtCusPhone'),
            'con_sdate'     => date('Y-m-d',strtotime($this->input->post('txtContSD'))),
            'cur_id'     => $this->input->post('cboCurrency'),
        );

        echo json_encode($dataSrch);
        
    }
    
}

?>