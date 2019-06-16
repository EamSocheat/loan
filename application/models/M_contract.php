<?php
	class M_contract extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectContractData($dataSrch){
    	    $this->db->select('tbl_contract.*, tbl_customer.cus_nm, tbl_customer.cus_phone1, tbl_customer.cus_nm_kh, tbl_customer.cus_id, tbl_currency.cur_nm, tbl_currency.cur_nm_kh, tbl_currency.cur_syn, tbl_contract.con_principle,
                (tbl_contract.con_principle 
                    - 
                (select COALESCE(sum(tbl_payment.pay_loan), 0)
                    from tbl_payment where tbl_payment.con_id = tbl_contract.con_id and tbl_payment.useYn = "Y")
                ) as loan_amount_left,
                CASE WHEN (select tbl_payment.pay_date
                                    from tbl_payment where tbl_payment.con_id = tbl_contract.con_id
                                    and tbl_payment.useYn = "Y"
                                    order by tbl_payment.pay_id desc
                                    limit 1)
                IS NULL THEN  tbl_contract.con_start_dt
                ELSE
                (select tbl_payment.pay_date
                            from tbl_payment where tbl_payment.con_id = tbl_contract.con_id
                            and tbl_payment.useYn = "Y"
                            order by tbl_payment.pay_id desc
                            limit 1) 
                END                     
                as pay_last_date,
                (( select COALESCE(sum(tbl_payment.pay_int), 0) + COALESCE(sum(tbl_payment.pay_loan), 0) from tbl_payment where tbl_payment.con_id = tbl_contract.con_id and tbl_payment.useYn = "Y")) as total_paid_amt,
                ( select  COALESCE(sum(tbl_payment.pay_loan), 0) from tbl_payment where tbl_payment.con_id = tbl_contract.con_id and tbl_payment.useYn = "Y") as total_paid_prin,
                ( select COALESCE(sum(tbl_payment.pay_int), 0) from tbl_payment where tbl_payment.con_id = tbl_contract.con_id and tbl_payment.useYn = "Y") as total_paid_int,
                (tbl_contract.con_principle - (select COALESCE(sum(tbl_payment.pay_loan), 0) from tbl_payment where tbl_payment.con_id = tbl_contract.con_id and tbl_payment.useYn = "Y")) as loan_amount_left');
            //$this->db->from('tbl_contract');
            $this->db->join('tbl_customer','tbl_customer.cus_id = tbl_contract.cus_id');
            $this->db->join('tbl_currency','tbl_currency.cur_id = tbl_contract.cur_id');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            $this->db->where('tbl_contract.useYn', 'Y');

            if($dataSrch['srch_status'] != null && $dataSrch['srch_status'] != ""){
                $this->db->where('tbl_contract.con_status != ', $dataSrch['srch_status']);
            }
            
            if($dataSrch['conIdArr'] != null && $dataSrch['conIdArr'] != ""){
                $integerIDs = array_map('intval', explode(',', $dataSrch['conIdArr']));
                $this->db->where_in('tbl_contract.con_id', $integerIDs);
            }

            if($dataSrch['con_id'] != null && $dataSrch['con_id'] != ""){
                $this->db->where('tbl_contract.con_id', $dataSrch['con_id']);
            }
            
            if($dataSrch['con_no'] != null && $dataSrch['con_no'] != ""){
                $this->db->like('tbl_contract.con_no', $dataSrch['con_no']);
            }

    	 	if(($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != "") 
                && ($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != "")){
                $this->db->where('tbl_contract.con_start_dt >=', date('Y-m-d', strtotime($dataSrch['con_start_dt'])));
                $this->db->where('tbl_contract.con_start_dt <=', date('Y-m-d', strtotime($dataSrch['con_end_dt'])));
            }else{
	            if($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != ""){
	                $this->db->where('tbl_contract.con_start_dt >=', strtotime($dataSrch['con_start_dt']));                
	            }
	            if($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != ""){
	                $this->db->where('tbl_contract.con_end_dt <=', strtotime($dataSrch['con_end_dt']));
	            }      
            }
            
            if($dataSrch['srch_customer'] != null && $dataSrch['srch_customer'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone2', $dataSrch['srch_customer']);
            }
            
    	  	if($dataSrch['filter_status'] != null && $dataSrch['filter_status'] != ""){
    	  		if(strcmp($dataSrch['filter_status'],'1') == 0){
    	  			$this->db->where('tbl_contract.con_status !=', "0");
    	  		}else{
    	  			$this->db->where('tbl_contract.con_status', "0");
    	  		}
                
            }
            
    	
            
    		if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_all']);
                $this->db->or_like('tbl_contract.con_no', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_all']);
            }

            $this->db->order_by("con_id", "desc");
            return $this->db->get('tbl_contract',$dataSrch['limit'],$dataSrch['offset'])->result();
    	}

    	public function countContractData($dataSrch){
    		
		    $this->db->select('count(con_id) as total_rec');
            $this->db->from('tbl_contract');
            $this->db->join('tbl_customer','tbl_customer.cus_id = tbl_contract.cus_id');
            $this->db->join('tbl_currency','tbl_currency.cur_id = tbl_contract.cur_id');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            $this->db->where('tbl_contract.useYn', 'Y');

            if($dataSrch['srch_status'] != null && $dataSrch['srch_status'] != ""){
                $this->db->where('tbl_contract.con_status != ', $dataSrch['srch_status']);
            }
            
            if($dataSrch['conIdArr'] != null && $dataSrch['conIdArr'] != ""){
                $integerIDs = array_map('intval', explode(',', $dataSrch['conIdArr']));
                $this->db->where_in('tbl_contract.con_id', $integerIDs);
            }

            if($dataSrch['con_id'] != null && $dataSrch['con_id'] != ""){
                $this->db->where('tbl_contract.con_id', $dataSrch['con_id']);
            }
            
            if($dataSrch['con_no'] != null && $dataSrch['con_no'] != ""){
                $this->db->like('tbl_contract.con_no', $dataSrch['con_no']);
            }

            

            if(($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != "") 
                && ($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != "")){
                $this->db->where('tbl_contract.con_start_dt >=', date('Y-m-d', strtotime($dataSrch['con_start_dt'])));
                $this->db->where('tbl_contract.con_start_dt <=', date('Y-m-d', strtotime($dataSrch['con_end_dt'])));
            }else{
	            if($dataSrch['con_start_dt'] != null && $dataSrch['con_start_dt'] != ""){
	                $this->db->where('tbl_contract.con_start_dt >=', strtotime($dataSrch['con_start_dt']));                
	            }
	            if($dataSrch['con_end_dt'] != null && $dataSrch['con_end_dt'] != ""){
	                $this->db->where('tbl_contract.con_end_dt <=', strtotime($dataSrch['con_end_dt']));
	            }        
            }

            
            
            if($dataSrch['srch_customer'] != null && $dataSrch['srch_customer'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_customer']);
                $this->db->or_like('tbl_customer.cus_phone2', $dataSrch['srch_customer']);
            }
            
    	  	if($dataSrch['filter_status'] != null && $dataSrch['filter_status'] != ""){
    	  		if(strcmp($dataSrch['filter_status'],'1') == 0){
    	  			$this->db->where('tbl_contract.con_status !=', "0");
    	  		}else{
    	  			$this->db->where('tbl_contract.con_status', "0");
    	  		}
                
            }
            
            
    		if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_all']);
                $this->db->or_like('tbl_contract.con_no', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_all']);
            }
            
            return $this->db->get()->result();
		}

        public function selectId(){
            $this->db->select_max('tbl_contract.con_id', 'con_id');
            $this->db->from('tbl_contract');
            $this->db->where('com_id', $_SESSION['comId']);
            return $this->db->get()->result();
        }

        public function update($data){
            $this->db->where('com_id', $_SESSION['comId']);
            $this->db->where('con_id', $data['con_id']);
            $this->db->update('tbl_contract', $data);
        }
        
        public function insert($data){
            $this->db->insert('tbl_contract',$data);
            return $this->db->insert_id();
        }
    }