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
        $this->load->model('M_contract');
        $this->load->model('M_common');
        $this->load->library("excel");
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
        
        $startDate = $this->input->post('txtSrchPaymentSD');
        $endDate   = $this->input->post('txtSrchPaymentED');
        
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
            'pay_start_dt'  => $startDate,
            'pay_end_dt'    => $endDate,
            'srch_all'      => $this->input->post('srchAll'),
            'srch_customer' => $this->input->post('txtSrchCusNm'),
        	'srch_cont_code' => $this->input->post('txtSrchContCode')
        );
        
        $data["OUT_REC"] = $this->M_payment->selectPaymentData($dataSrch);
        $data["OUT_REC_CNT"] = $this->M_payment->countPaymentData($dataSrch);
        echo json_encode($data);
    }
    
    public function savePayment(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $pay_loan = $this->input->post('txtpayLoanAmt');
        $pay_left = $this->input->post('txtLoanAmtLeft2');
        $loan_amt = $this->input->post('txtLoanAmt2');

        $dataPayUser = array(
            'pay_usr_amount'            => $this->input->post('txtCustPayment'),
            'cur_id'                    => $this->input->post('custCurrencyType'),
            'pay_usr_rate'              => $this->input->post('customerRateAmount'),
            'pay_usr_amount_calculate'  => $this->input->post('txtCustCalcuPay2'),
            'pay_usr_amount_return'     => $this->input->post('txtCustPayReturn2')
        );
        $payUsrId  = $this->M_payment->insertPaymentUser($dataPayUser);

        $data = array (
            'pay_usr_id'    => $payUsrId,
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

        if((int)$pay_loan == (int)$pay_left){
            $dataCont['con_status'] = "0";
            $dataCont['con_id']     = $this->input->post('txtContId');
            $dataCont['con_end_dt'] = date('Y-m-d H:i:s',strtotime($this->input->post('txtPaySD')));
            $dataCont['regDt']      = date('Y-m-d H:i:s');
            $dataCont['regUsr']     = $_SESSION['usrId'];
            $this->M_contract->update($dataCont);
        }

        /*if((int)$pay_left == 0){
            if((int)$pay_loan == (int)$loan_amt){
                $data['con_status'] = "0";
                $data['con_id']     = $this->input->post('txtContId');
                $data['con_end_dt'] = date('Y-m-d H:i:s',strtotime($this->input->post('txtPaySD')));
                $data['regDt']      = date('Y-m-d H:i:s');
                $data['regUsr']     = $_SESSION['usrId'];
                $this->M_contract->update($data);
            }
        }else if((int)$pay_loan == (int)$pay_left){
            $data['con_status'] = "0";
            $data['con_id']     = $this->input->post('txtContId');
            $data['con_end_dt'] = date('Y-m-d H:i:s',strtotime($this->input->post('txtPaySD')));
            $data['regDt']      = date('Y-m-d H:i:s');
            $data['regUsr']     = $_SESSION['usrId'];
            $this->M_contract->update($data);
        }*/
        
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

    public function getRateAmount(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
              
        $data["OUT_REC"] = $this->M_payment->selectRateAmount();        
        echo json_encode($data);
    }

    function download_excel(){
        $object = new PHPExcel();
        $object->setActiveSheetIndex(0);

        $table_columns = array("Payment Code", "Contract No", "Payment User Calculate", "Paid Amount", "Payment Interest", "Total Payment", "Loan Amount", "Payment Date", "Customer");
        $column = 0;

        /**
         * get header
         */
        foreach($table_columns as $field){
            $object->getActiveSheet()->setCellValueByColumnAndRow($column, 1, $field);
            $column++;
                        
            /**
             * set auto width foreach column size
             */
            foreach (range($field, $object->getActiveSheet()->getHighestDataColumn()) as $col) {
                $object->getActiveSheet()->getColumnDimension($col)->setAutoSize(true);
            }
        }

        /**
         * set style to header
         */
        $styleArray = array(
            'font' => array('bold' => true,'color' => array('rgb' => 'FF0000'),),
            'alignment' => array('horizontal' => \PHPExcel_Style_Alignment::HORIZONTAL_CENTER,),
            /*'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'B2B2B2')
            ),*/
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN,
                    'color' => array('rgb' => 'DDDDDD'),),
                'top' => array(
                    'style' => \PHPExcel_Style_Border::BORDER_THIN,),
                /*'fill' => array(
                    'type' => \PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startcolor' => array('argb' => 'FFA0A0A0',),'endcolor' => array('argb' => '333333',),),*/
            ),
        );
        $object->getActiveSheet()->getStyle('A1:I1')->applyFromArray($styleArray);
        $object->getDefaultStyle()->getFont()->setName('Khmer OS Battambang');
        
        /**
         * retrieve data from table database
         */
        $dataSrch = array(
            'payIdArray' => $this->input->post("payIdArray")
        );
        $contract_data = $this->M_payment->selectPaymentData($dataSrch);

        /**
         * match header and data
         */
        $excel_row = 2;
        foreach($contract_data as $row){
            $curr = $row->pay_loan_int_type;
            $object->getActiveSheet()->setCellValueByColumnAndRow(0, $excel_row, $row->pay_no);
            $object->getActiveSheet()->setCellValueByColumnAndRow(1, $excel_row, $row->con_no);
            $object->getActiveSheet()->setCellValueByColumnAndRow(2, $excel_row, $this->commaAmt($row->pay_usr_amount_calculate).$this->addCurrncy($curr,$row->pay_usr_amount_calculate));
            $object->getActiveSheet()->setCellValueByColumnAndRow(3, $excel_row, $this->commaAmt($row->pay_loan).$this->addCurrncy($curr,$row->pay_loan));
            $object->getActiveSheet()->setCellValueByColumnAndRow(4, $excel_row, $this->commaAmt($row->pay_int).$this->addCurrncy($curr,$row->pay_int));
            $object->getActiveSheet()->setCellValueByColumnAndRow(5, $excel_row, $this->commaAmt($row->pay_loan+$row->pay_int).$this->addCurrncy($curr,$row->pay_loan+$row->pay_int));
            $object->getActiveSheet()->setCellValueByColumnAndRow(6, $excel_row, $this->commaAmt($row->con_principle).$this->addCurrncy($curr,$row->con_principle));
            $object->getActiveSheet()->setCellValueByColumnAndRow(7, $excel_row, $row->pay_date);
            $object->getActiveSheet()->setCellValueByColumnAndRow(8, $excel_row, $row->cus_nm);
            $excel_row++;
        }

        $object_writer = PHPExcel_IOFactory::createWriter($object, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="Payment_'.date('Y/m/d').'.xls"');
        $object_writer->save('php://output');
    }
    
    function commaAmt($str){
        $str = (int)$str;
        return number_format($str);
    }

    function addCurrncy($curr,$amt){
        if($curr == "1"){
            return "៛"; 
        }else if($curr == "2"){
            return "$";
        }else{
            return "";
        }
    }

    public function saveRate(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $data['rate_id'] = $this->input->post('rateId');
        $data['rate_amount'] = $this->input->post('rateAmount');
        $this->M_payment->insertRate($data);
        echo 'OK';
    }
}

?>