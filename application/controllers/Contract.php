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

        $data = array(
            'cus_id'        => $this->input->post('txtCusId'),
            'con_start_dt'  => date('Y-m-d H:i:s',strtotime($this->input->post('txtContSD'))),
            'cur_id'        => $this->input->post('cboCurrency'),
            'con_principle' => $this->input->post('lAmt'),
            'con_interest'  => $this->input->post('lRate'),
            'con_interest_type' => $this->input->post('cbointerestType'),
            'con_per_year'  => $this->input->post('lYear'),
            'con_per_month' => $this->input->post('lMonth')
        );
        
        $con_id  = $this->M_contract->selectId();
        foreach($con_id as $r){
            $max_id = (int)$r->con_id + 1;
            $max_id = (string)$max_id;
            $zero   = '';
            for($i = strlen($max_id); $i <= 9; $i++){
                $zero = '0'.$zero;
            }
            $con_id = $zero.$max_id;
        }

        if($this->input->post('contId') != null && $this->input->post('contId') != ""){
            //update data
            $data['con_id'] = $this->input->post('contId');
            $data['upUsr']  = $_SESSION['usrId'];
            $data['upDt']   = date('Y-m-d H:i:s');
            $this->M_contract->update($data);
        }else{
            //insert data
            $data['useYn']  = 'Y';
            $data['com_id'] = $_SESSION['comId'];
            $data['regUsr'] = $_SESSION['usrId'];
            $data['regDt']  = date('Y-m-d H:i:s');
            $data['con_no'] = $con_id;
            $this->M_contract->insert($data);
        }

        echo 'OK';
    }


    public function delete(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $delObj = $this->input->post('delObj');
        $cntDel = 0;
        for($i = 0; $i < sizeof($delObj); $i++){
            $data = array(
                    'con_id'    => $delObj[$i]['contId'],
                    'useYn'     => "N",
                    'com_id'    => $_SESSION['comId'],
                    'upDt'      => date('Y-m-d H:i:s'),
                    'upUsr'     => $_SESSION['usrId']
            );
            $this->M_contract->update($data);
            $cntDel += 1;
        }
        echo $cntDel;
        echo(sizeof($delObj));
    }

}

?>