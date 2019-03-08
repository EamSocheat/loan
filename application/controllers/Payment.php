<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model('M_login');
        $this->load->library('session');
        $this->load->model('M_check_user');
        $this->load->model('M_menu');
        $this->load->helper('form');
        $this->load->model('M_payment');
        $this->load->model('M_common');
    }
    
    public function index(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $dataMenu['menu_active'] = "Payment";
        $data['header'] = $this->load->view('v_header', $dataMenu, TRUE);
        $data['footer'] = $this->load->view('v_footer', NULL, TRUE);
        $data['iframe'] = $this->load->view('v_iframe', NULL, TRUE);
        
        $this->load->view('v_payment',$data);
    }
    
    public function getPaymentData(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $startDate = $this->input->post('txtSrchContSD');
        $endDate   = $this->input->post('txtSrchContED');
        
        if($startDate != null || $startDate != ""){
            $startDate = date('Y-m-d H:i:s',strtotime($startDate));
        }

        if($endDate != null || $endDate != ""){
            $endDate = date('Y-m-d H:i:s',strtotime($endDate));
        }

        $dataSrch = array(
            'limit'         => $this->input->post('perPage'),
            'offset'        => $this->input->post('offset'),
            'pay_id'        => $this->input->post('payId'),
            'pay_no'        => $this->input->post('txtSrchPayCode'),
            'con_start_dt'  => $startDate,
            'con_end_dt'    => $endDate,
            'srch_all'      => $this->input->post('srchAll'),
            'cus_nm'        => $this->input->post('txtSrchCusNm'),
            
        );
        
        $data["OUT_REC"] = $this->M_payment->selectPaymentData($dataSrch);
        $data["OUT_REC_CNT"] = $this->M_payment->countPaymentData($dataSrch);
        echo json_encode($data);
    }
    
    public function savePayment(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $data = array (
            'con_id'        => $this->input->post('txtContId'),
            'pay_loan'      => $this->input->post('txtpayLoanAmt'),
            'pay_int'       => $this->input->post('txtPayInterAmt2'),
            'pay_loan_int'  => $this->input->post('txtLoanInter2'),
            'pay_loan_int_type'  => $this->input->post('txtIntTypeCur'),
            'pay_date'      => date('Y-m-d H:i:s',strtotime($this->input->post('txtPaySD'))),
            'pay_des'       => $this->input->post('txtPayDesc'),
            'useYn'         => "Y",
            'com_id'        => $_SESSION['comId']
        );

        $pay_no  = $this->M_payment->selectId();
        foreach($pay_no as $r){
            $max_id = (int)$r->pay_id + 1;
            $max_id = (string)$max_id;
            $zero   = '';
            for($i = strlen($max_id); $i <= 9; $i++){
                $zero = '0'.$zero;
            }
            $pay_no = $zero.$max_id;
        }

        if($this->input->post('payId') != null && $this->input->post('payId') != ""){
            $data['pay_id'] = $this->input->post('payId');
            $data['upUsr']  = $_SESSION['usrId'];
            $data['upDt']   = date('Y-m-d H:i:s');
            $this->M_payment->updatePaymentDB($data);
        }else{
            $data['pay_no'] = $pay_no;
            $data['regUsr'] = $_SESSION['usrId'];
            $data['regDt']  = date('Y-m-d H:i:s');
            $this->M_payment->insertPaymentDB($data);
        }
        
        echo 'OK';
    }
    
    public function deletePayment(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $delObj = $this->input->post('delObj');
        $cntDel = 0;
        for($i=0; $i<sizeof($delObj); $i++){
            $cntActive = 0;
            //check staff table using contract or not
            $dataCol = array(
                'tbl_nm' 		=> "tbl_contract",
                'id_nm' 		=> "con_id",
                'com_id' 		=> "com_id"
            );
            
            $dataVal = array(
                'id_val' 		=> $delObj[$i]['payId'],
                'com_val' 		=> $_SESSION['comId']
            );

            $chkData    = $this->M_common->checkActiveRecord($dataCol,$dataVal);
            $cntActive  += $chkData->active_rec;
            
            if($cntActive > 0){
                continue;
            }else{ 
                $data = array(
                    'pay_id'    => $delObj[$i]['payId'],
                    'useYn'		=> "N",
                    'com_id'	=> $_SESSION['comId'],
                    'upDt'		=> date('Y-m-d H:i:s'),
                    //'upUsr'		=> $_SESSION['usrId']
                );
                
                $this->M_payment->updatePaymentDB($data);
                $cntDel += 1;
            }
        }
        
        echo $cntDel;
    }
    
}

?>