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
        $this->load->library("excel");
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
        $startDate = $this->input->post('txtSrchContSD');
        $endDate   = $this->input->post('txtSrchContED');
        $conStatus = $this->input->post('cboStatus');
        if($startDate != null || $startDate != ""){
            $startDate = date('Y-m-d H:i:s',strtotime($startDate));
        }

        if($endDate != null || $endDate != ""){
            $endDate = date('Y-m-d H:i:s',strtotime($endDate));
        }

        $dataSrch = array(
            'limit'         => $this->input->post('perPage'),
            'offset'        => $this->input->post('offset'),
            'con_id'        => $this->input->post('conId'),
            // 'con_nm'        => $this->input->post('txtSrchContNm'),
            'con_no'        => $this->input->post('txtSrchContCode'),
            'con_start_dt'  => $startDate,
            'con_end_dt'    => $endDate,
            'srch_status'   => $this->input->post('srch_status'),
            'srch_customer' => $this->input->post('txtSrchCusNm'),
        	'filter_status' 	=> $conStatus,
        	'srch_all'		=> $this->input->post('srchAll')
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
            'con_per_month' => $this->input->post('lMonth'),
            'con_desc' => $this->input->post('txtDesc'),            
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

    public function udpateStatus(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }

        $cntDel = 0;
        if($this->input->post('contId') != null && $this->input->post('contId') != ""){
            //update data
            $data['con_id'] = $this->input->post('contId');
            $data['con_status']   = $this->input->post('statusID');
            $data['upUsr']  = $_SESSION['usrId'];
            $data['upDt']   = date('Y-m-d H:i:s');
            $this->M_contract->update($data);
            $cntDel = 1;
        }

        echo $cntDel;
    }

    public function delete(){
        if(!$this->M_check_user->check()){
            redirect('/Login');
        }
        
        $delObj = $this->input->post('delObj');
        $cntDel = 0;
        for($i = 0; $i<sizeof($delObj); $i++){
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
    }

    function download_excel(){
        
        $object = new PHPExcel();
        $object->setActiveSheetIndex(0);

        $table_columns = array("Contract No", "Contract Start", "Loan Amount", "Loan Interest", "Interest Type", "Period", "Customer", "Total Loan", "Total Interest", "Contract End");
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
        $object->getActiveSheet()->getStyle('A1:J1')->applyFromArray($styleArray);
        $object->getDefaultStyle()->getFont()->setName('Khmer OS Battambang');
        
        /**
         * retrieve data from table database
         */
        $dataSrch = array(
            'conIdArr' => $this->input->post("conIdArray")
        );
        $contract_data = $this->M_contract->selectContractData($dataSrch);

        /**
         * match header and data
         */
        $excel_row = 2;
        foreach($contract_data as $row){
            $object->getActiveSheet()->setCellValueByColumnAndRow(0, $excel_row, $row->con_no);
            $object->getActiveSheet()->setCellValueByColumnAndRow(1, $excel_row, $row->con_start_dt);
            $object->getActiveSheet()->setCellValueByColumnAndRow(2, $excel_row, $this->commaAmt($row->con_principle));
            $object->getActiveSheet()->setCellValueByColumnAndRow(3, $excel_row, $row->con_interest."%");
            $object->getActiveSheet()->setCellValueByColumnAndRow(4, $excel_row, $row->con_interest_type);
            $object->getActiveSheet()->setCellValueByColumnAndRow(5, $excel_row, $this->showPeriod($row->con_per_year,$row->con_per_month));
            $object->getActiveSheet()->setCellValueByColumnAndRow(6, $excel_row, $row->cus_nm);
            $object->getActiveSheet()->setCellValueByColumnAndRow(7, $excel_row, $row->con_total_principle);
            $object->getActiveSheet()->setCellValueByColumnAndRow(8, $excel_row, $row->con_total_interest);
            $object->getActiveSheet()->setCellValueByColumnAndRow(9, $excel_row, $row->con_end_dt);
            $excel_row++;
        }

        $object_writer = PHPExcel_IOFactory::createWriter($object, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="Contract_'.date('Y/m/d').'.xls"');        
        $object_writer->save('php://output');
    }

    function commaAmt($str){
        $str = (int)$str;
        return number_format($str);
    }

    function showPeriod($y,$m){
        $strPer = '';
        if(($y != null && $y != 0) && ($m != null && $m != 0)){
            $strPer = $this->showYear($y) . $this->showMonth($m);
        }else if($y != null && $y != 0){
            $strPer = $this->showYear($y);
        }else if($m != null && $m != 0){
            $strPer = $this->showMonth($m);
        }else{
            $strPer = '';
        }
        return $strPer;
    }

    function showYear($y){
        $year = '';
        if($y > 1){
            $year = $y." Years ";
        }else{
            $year = $y." Year ";
        }
        return $year;
    }

    function showMonth($m){
        $month = '';
        if($m > 1){
            $month = $m." Months";
        }else{
            $month = $m." Month";
        }
        return $month;
    }

}

?>