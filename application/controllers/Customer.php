<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);

class Customer extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('M_login');
		$this->load->library('session');
		$this->load->model('M_check_user');
		$this->load->model('M_menu');
		$this->load->helper('form'); 
		$this->load->model('M_common');
		$this->load->model('M_customer');
		$this->load->library("excel");
		//$this->load->library('../controllers/upload');
	}
	public function index(){
	    
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	    $dataMenu['menu_active'] = "Customer";
	    $data['header'] = $this->load->view('v_header', $dataMenu, TRUE);
	    $data['footer'] = $this->load->view('v_footer', NULL, TRUE);
	    $data['iframe'] = $this->load->view('v_iframe', NULL, TRUE);
	    
	    $this->load->view('v_customer',$data);
	}
	
	public function getCustomer(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	    
	    $dataSrch = array(
	        'limit' 		=> $this->input->post('perPage'),
	        'offset' 		=> $this->input->post('offset'),
	        'cus_id' 		=> $this->input->post('cusId'),
	        'cus_nm' 		=> $this->input->post('cusNm'),
	        'cus_nm_kh' 	=> $this->input->post('cusNmKh'),
	        'cus_idnt_num'	=> $this->input->post('cusIdentityNmKh'),
	        'cus_phone1' 	=> $this->input->post('cusPhone')
	    );
	    $data["OUT_REC"] = $this->M_customer->selectCustomer($dataSrch);
	    $data["OUT_REC_CNT"] = $this->M_customer->countCustomer($dataSrch);
	    echo json_encode($data);
	}
	
	public function save(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	    
	    $cusPhoto = "";
	    if(!empty($_FILES['fileCusPhoto']['name'])){
	        $cusPhoto = $this->M_common->uploadImage($_FILES['fileCusPhoto'],'fileCusPhoto','./upload/loan/customer','/loan/customer/');
	    }else{
	        $cusPhoto = $this->input->post('cusImgPath');
	    }
	    
	    $data = array(
	        /* 'bra_id' 		=> $this->input->post('txtBraId'),
	         'pos_id' 		=> $this->input->post('txtPosId'), */
	        'cus_nm'		=> $this->input->post('txtCustomerNm'),
	        'cus_nm_kh'		=> $this->input->post('txtCustomerNmKh'),
	        'cus_idnt_num'	=> $this->input->post('txtIdentityNmKh'),
	        'cus_photo'	    => $cusPhoto,
	        'cus_gender'	=> $this->input->post('cboGender'),
	        'cus_dob'		=> date('Y-m-d',strtotime($this->input->post('txtDob'))),
	        'cus_addr'		=> $this->input->post('txtAddr'),
	        'cus_phone1'	=> $this->input->post('txtPhone1'),
	        'cus_phone2'	=> $this->input->post('txtPhone2'),
	        'cus_email'		=> $this->input->post('txtEmail'),
	        /* 'cus_start_dt'	=> date('Y-m-d',strtotime($this->input->post('txtStartDate'))),
	         'cus_end_dt'	=> date('Y-m-d',strtotime($this->input->post('txtStopDate'))), */
	        'cus_des'		=> $this->input->post('txtDes'),
	        'useYn'			=> "Y",
	        'com_id'		=> $_SESSION['comId']
	    );
	    
	    if($this->input->post('cusId') != null && $this->input->post('cusId') != ""){
	        //update data
	        $data['cus_id'] = $this->input->post('cusId');
	        $data['upUsr'] = $_SESSION['usrId'];
	        $data['upDt'] = date('Y-m-d H:i:s');
	        $this->M_customer->update($data);
	    }else{
	        //insert data
	        $data['regUsr'] = $_SESSION['usrId'];
	        $data['regDt'] = date('Y-m-d H:i:s');
	        $this->M_customer->insert($data);
	    }
	    
	    echo 'OK';
	    
	}
	
	public function getBranchType(){
	    $data["OUT_REC"] = $this->M_branch->selectBrandType();
	    echo json_encode($data);
	}
	
	public function delete(){
	    if(!$this->M_check_user->check()){
	        redirect('/Login');
	    }
	    
	    $delObj = $this->input->post('delObj');
	    $cntDel = 0;
	    for($i=0; $i<sizeof($delObj); $i++){
	        $cntActive = 0;
	        //check contract table using branch or not 
	       $dataCol = array(
            'tbl_nm' 		=> "tbl_contract",
            'id_nm' 		=> "con_id",
            'com_id' 		=> "com_id"
            );
            
            $dataVal = array(
            'id_val' 		=> $delObj[$i]['cusId'],
            'com_val' 		=> $_SESSION['comId']
            );
	        $chkData = $this->M_common->checkActiveRecord($dataCol,$dataVal);
	        $cntActive +=$chkData->active_rec;
	        
	        if($cntActive >0){
	            continue;
	        }else{
	            $data = array(
	                'cus_id'    => $delObj[$i]['cusId'],
        			'useYn'		=> "N",
                    'com_id'	=> $_SESSION['comId'],
                    'upDt'		=> date('Y-m-d H:i:s'),
                    'upUsr'		=> $_SESSION['usrId']
                );
	            $this->M_customer->update($data);
	            $cntDel+=1;
	        }
	    }
	    echo $cntDel;
	}
	
	function download_excel(){
		
		$object = new PHPExcel();
		$object->setActiveSheetIndex(0);

		$table_columns = array("Name", "Khmer Name", "Gender", "Date of birth", "Phone 1", "Phone 2", "Email", "Address", "Description", "ID", "ID type", "Register Date");
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
		$object->getActiveSheet()->getStyle('A1:L1')->applyFromArray($styleArray);
		$object->getDefaultStyle()->getFont()->setName('Khmer OS Battambang');
		
		/**
		 * retrieve data from table database
		 */
		$dataSrch = array(
	        'cusIdArr' => $this->input->post("cusIdArray")
	    );
		$customer_data = $this->M_customer->selectCustomer($dataSrch);

		/**
		 * match header and data
		 */
		$excel_row = 2;
		foreach($customer_data as $row){
			$object->getActiveSheet()->setCellValueByColumnAndRow(0, $excel_row, $row->cus_nm);
			$object->getActiveSheet()->setCellValueByColumnAndRow(1, $excel_row, $row->cus_nm_kh);
			$object->getActiveSheet()->setCellValueByColumnAndRow(2, $excel_row, $row->cus_gender);
			$object->getActiveSheet()->setCellValueByColumnAndRow(3, $excel_row, $row->cus_dob);
			$object->getActiveSheet()->setCellValueByColumnAndRow(4, $excel_row, $row->cus_phone1);
			$object->getActiveSheet()->setCellValueByColumnAndRow(5, $excel_row, $row->cus_phone2);
			$object->getActiveSheet()->setCellValueByColumnAndRow(6, $excel_row, $row->cus_email);
			$object->getActiveSheet()->setCellValueByColumnAndRow(7, $excel_row, $row->cus_addr);
			$object->getActiveSheet()->setCellValueByColumnAndRow(8, $excel_row, $row->cus_des);
			$object->getActiveSheet()->setCellValueByColumnAndRow(9, $excel_row, $row->cus_idnt_num);
			$object->getActiveSheet()->setCellValueByColumnAndRow(10, $excel_row, $row->cus_idnt_type);
			$object->getActiveSheet()->setCellValueByColumnAndRow(11, $excel_row, $row->regDt);
			$excel_row++;
		}

		$object_writer = PHPExcel_IOFactory::createWriter($object, 'Excel5');
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="Customer_'.date('Y/m/d').'.xls"');		
		$object_writer->save('php://output');
	}
	
}   
