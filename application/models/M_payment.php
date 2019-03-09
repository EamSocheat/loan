<?php
	class M_payment extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectPaymentData($dataSrch){
        	$this->db->select('tbl_payment.pay_id, tbl_payment.pay_no, tbl_payment.pay_loan, tbl_payment.pay_int, tbl_payment.pay_loan_int_type, tbl_payment.pay_loan_int, tbl_payment.pay_loan_int_type, tbl_payment.pay_date, tbl_payment.pay_des, tbl_contract.con_no, tbl_contract.con_principle, tbl_contract.con_interest_type, tbl_customer.cus_nm as cus_nm,  tbl_customer.cus_id as cus_id, (select tbl_currency.cur_syn from tbl_currency where tbl_currency.cur_id = tbl_payment.pay_loan_int_type) as cur_syn, (tbl_contract.con_principle 
                    - 
                (select COALESCE(sum(tbl_payment.pay_loan), 0)
                    from tbl_payment where tbl_payment.con_id = tbl_contract.con_id)
                ) as loan_amount_left,
                (select tbl_payment.pay_date
                    from tbl_payment where tbl_payment.con_id = tbl_contract.con_id
                    order by tbl_payment.con_id
                    limit 1) as last_pay_date');

        	$this->db->join('tbl_contract', 'tbl_payment.con_id = tbl_contract.con_id');
            $this->db->join('tbl_customer', 'tbl_customer.cus_id = tbl_contract.cus_id');
            $this->db->where('tbl_payment.com_id', $_SESSION['comId']);
            $this->db->where('tbl_payment.useYn', 'Y');

            if($dataSrch['payIdArray'] != null && $dataSrch['payIdArray'] != ""){
                $integerIDs = array_map('intval', explode(',', $dataSrch['payIdArray']));
                $this->db->where_in('tbl_payment.pay_id', $integerIDs);
            }

            if($dataSrch['pay_id'] != null && $dataSrch['pay_id'] != ""){
                $this->db->where('tbl_payment.pay_id', $dataSrch['pay_id']);
            }
            
            if($dataSrch['pay_no'] != null && $dataSrch['pay_no'] != ""){
                $this->db->like('tbl_payment.pay_no', $dataSrch['pay_no']);
            }

            if($dataSrch['srch_customer'] != null && $dataSrch['srch_customer'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone2', $dataSrch['srch_customer']);
            }

            if($dataSrch['pay_start_dt'] != null && $dataSrch['pay_start_dt'] != ""){
                $this->db->where('tbl_payment.pay_date >=', $dataSrch['pay_start_dt']);
            }

            if(($dataSrch['pay_start_dt'] != null && $dataSrch['pay_start_dt'] != "") 
                && ($dataSrch['pay_end_dt'] != null && $dataSrch['pay_end_dt'] != "")){
                $this->db->where('tbl_payment.pay_date >=', $dataSrch['pay_start_dt']);
                $this->db->where('tbl_payment.pay_date <=', $dataSrch['pay_end_dt']);
            }

            if($dataSrch['pay_end_dt'] != null && $dataSrch['pay_end_dt'] != ""){
                $this->db->where('tbl_payment.pay_date <=', $dataSrch['pay_end_dt']);
            }
            
            if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_payment.pay_no', $dataSrch['srch_all']);
                // $this->db->or_like('tbl_payment.cus_nm_kh', $dataSrch['srch_all']);
                // $this->db->or_like('tbl_payment.cus_nm', $dataSrch['srch_all']);
            }

            $this->db->order_by("pay_id", "desc");
            return $this->db->get('tbl_payment', $dataSrch['limit'], $dataSrch['offset'])->result();
		}

		public function countPaymentData($dataSrch){
		    $this->db->select('count(tbl_payment.pay_id) as total_rec');
		    $this->db->from('tbl_payment');   		    
		    $this->db->join('tbl_contract', 'tbl_payment.con_id = tbl_contract.con_id');
            $this->db->where('tbl_payment.com_id', $_SESSION['comId']);
            $this->db->where('tbl_payment.useYn', 'Y');
            
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

            if($dataSrch['pay_start_dt'] != null && $dataSrch['pay_start_dt'] != ""){
                $this->db->where('tbl_payment.pay_date >=', $dataSrch['pay_start_dt']);                
            }

            if(($dataSrch['pay_start_dt'] != null && $dataSrch['pay_start_dt'] != "") 
                && ($dataSrch['pay_end_dt'] != null && $dataSrch['pay_end_dt'] != "")){
                $this->db->where('tbl_payment.pay_date >=', $dataSrch['pay_start_dt']);
                $this->db->where('tbl_payment.pay_date <=', $dataSrch['pay_end_dt']);
            }

            if($dataSrch['pay_end_dt'] != null && $dataSrch['pay_end_dt'] != ""){
                $this->db->where('tbl_payment.pay_date <=', $dataSrch['pay_end_dt']);
            }
            
            if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_payment.pay_no', $dataSrch['srch_all']);
                // $this->db->or_like('tbl_payment.cus_nm_kh', $dataSrch['srch_all']);
                // $this->db->or_like('tbl_payment.cus_nm', $dataSrch['srch_all']);
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