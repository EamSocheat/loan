<?php
	class M_payment extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectPaymentData($dataSrch){
        	$this->db->select('tbl_payment.pay_id, tbl_payment.pay_no, tbl_payment.pay_loan, tbl_payment.pay_int, tbl_payment.pay_loan_int, tbl_payment.pay_loan_int_type, tbl_payment.pay_date, tbl_contract.con_no');

        	$this->db->join('tbl_payment','tbl_payment.pay_con = tbl_contract.pay_con');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            
            if($dataSrch['conIdArr'] != null && $dataSrch['conIdArr'] != ""){
                $integerIDs = array_map('intval', explode(',', $dataSrch['payIdArr']));
                $this->db->where_in('tbl_payment.pay_id', $integerIDs);
            }

            if($dataSrch['pay_id'] != null && $dataSrch['pay_id'] != ""){
                $this->db->where('tbl_payment.pay_id', $dataSrch['pay_id']);
            }
            
            if($dataSrch['pay_no'] != null && $dataSrch['pay_no'] != ""){
                $this->db->like('tbl_payment.pay_no', $dataSrch['pay_no']);
            }

            if($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != ""){
                $this->db->where('tbl_payment.con_start_dt >=', $dataSrch['con_start_dt']);                
            }

            if(($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != "") 
                && ($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != "")){
                $this->db->where('tbl_contract.con_start_dt >=', $dataSrch['con_start_dt']);
                $this->db->where('tbl_contract.con_start_dt <=', $dataSrch['con_end_dt']);
            }

            if($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != ""){
                $this->db->where('tbl_contract.con_end_dt <=', $dataSrch['con_end_dt']);
            }
            
            if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_payment.pay_no', $dataSrch['srch_all']);
                $this->db->or_like('tbl_payment.cus_nm_kh', $dataSrch['srch_all']);
                $this->db->or_like('tbl_payment.cus_nm', $dataSrch['srch_all']);
            }

            $this->db->order_by("pay_id", "asc");
            return $this->db->get('tbl_payment',$dataSrch['limit'],$dataSrch['offset'])->result();
		}

		public function countPaymentnData($dataSrch){
		    $this->db->select('count(pos_id) as total_rec');
		    $this->db->from('tbl_payment');
		    $this->db->where('com_id', $_SESSION['comId']);
		    $this->db->where('useYn', 'Y');
		    
		    if($dataSrch['pos_nm'] != null && $dataSrch['pos_nm'] != ""){
		        $this->db->like('tbl_position.pos_nm', $dataSrch['pos_nm']);
		    }
		    
		    if($dataSrch['pos_nm_kh'] != null && $dataSrch['pos_nm_kh'] != ""){
		        $this->db->like('tbl_position.pos_nm_kh', $dataSrch['pos_nm_kh']);
		    }
		    
		    return $this->db->get()->result();
		}
		
		public function selectId(){
            $this->db->select_max('tbl_payment.pay_id', 'pay_id');
            $this->db->from('tbl_payment');
            $this->db->where('com_id', $_SESSION['comId']);
            return $this->db->get()->result();
        }

		public function updatePaymentDB($data){
		    $this->db->where('pay_id', $data['pay_id']);
			$this->db->update('tbl_payment', $data);
		}
		
		public function insertPaymentDB($data){
			$this->db->insert('tbl_payment',$data);
			return $this->db->insert_id();
		}
		

    }