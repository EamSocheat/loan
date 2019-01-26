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
	    }
	    
	    $data = array(
	        /* 'bra_id' 		=> $this->input->post('txtBraId'),
	         'pos_id' 		=> $this->input->post('txtPosId'), */
	        'cus_nm'		=> $this->input->post('txtCustomerNm'),
	        'cus_nm_kh'		=> $this->input->post('txtCustomerNmKh'),
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
	        //check staff table using branch or not 
	       /*  $dataCol = array(
            'tbl_nm' 		=> "tbl_staff",
            'id_nm' 		=> "bra_id",
            'com_id' 		=> "com_id"
            );
            
            $dataVal = array(
            'id_val' 		=> $delObj[$i]['staId'],
            'com_val' 		=> $_SESSION['comId']
            );
	        $chkData = $this->M_common->checkActiveRecord($dataCol,$dataVal);
	        $cntActive +=$chkData->active_rec; */
	        
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
	
	
}   
