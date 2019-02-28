<?php
	class M_customer extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectCustomer($dataSrch){

        	$this->db->select('*');
        	//$this->db->from('tbl_customer');
        	$this->db->where('tbl_customer.com_id', $_SESSION['comId']);
        	$this->db->where('tbl_customer.useYn', 'Y');

            if($dataSrch['cusIdArr'] != null && $dataSrch['cusIdArr'] != ""){
                $integerIDs = array_map('intval', explode(',', $dataSrch['cusIdArr']));
                $this->db->where_in('tbl_customer.cus_id', $integerIDs);
            }

        	if($dataSrch['cus_id'] != null && $dataSrch['cus_id'] != ""){
        	    $this->db->where('tbl_customer.cus_id', $dataSrch['cus_id']);
        	}
        	
        	if($dataSrch['cus_nm'] != null && $dataSrch['cus_nm'] != ""){
        	    $this->db->like('tbl_customer.cus_nm', $dataSrch['cus_nm']);
        	}
        	
        	if($dataSrch['cus_nm_kh'] != null && $dataSrch['cus_nm_kh'] != ""){
        	    $this->db->like('tbl_customer.cus_nm_kh', $dataSrch['cus_nm_kh']);
        	}
        	
        	if($dataSrch['cus_phone1'] != null && $dataSrch['cus_phone1'] != ""){
        	    $this->db->like('tbl_customer.cus_phone1', $dataSrch['cus_phone1']);
        	}
        	
        	if($dataSrch['cus_idnt_num'] != null && $dataSrch['cus_idnt_num'] != ""){
        	    $this->db->like('tbl_customer.cus_idnt_num', $dataSrch['cus_idnt_num']);
        	}
        	
            if($dataSrch['srch_all'] != null && $dataSrch['srch_all'] != ""){
                $this->db->like('tbl_customer.cus_nm', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_nm_kh', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_idnt_num', $dataSrch['srch_all']);
                $this->db->or_like('tbl_customer.cus_phone1', $dataSrch['srch_all']);
            }
        	
        	$this->db->order_by("cus_id", "asc");
        	return $this->db->get('tbl_customer',$dataSrch['limit'],$dataSrch['offset'])->result();
		}
		
		function countCustomer($dataSrch){
  
        	$this->db->select('count(cus_id) as total_rec');
        	$this->db->from('tbl_customer');
        	$this->db->where('tbl_customer.com_id', $_SESSION['comId']);
        	$this->db->where('tbl_customer.useYn', 'Y');
        	
        	if($dataSrch['cus_id'] != null && $dataSrch['cus_id'] != ""){
        	    $this->db->where('tbl_customer.cus_id', $dataSrch['cus_id']);
        	}
        	
        	if($dataSrch['cus_nm'] != null && $dataSrch['cus_nm'] != ""){
        	    $this->db->like('tbl_customer.cus_nm', $dataSrch['cus_nm']);
        	}
        	
        	if($dataSrch['cus_nm_kh'] != null && $dataSrch['cus_nm_kh'] != ""){
        	    $this->db->like('tbl_customer.cus_nm_kh', $dataSrch['cus_nm_kh']);
        	}
        	
        	if($dataSrch['cus_phone1'] != null && $dataSrch['cus_phone1'] != ""){
        	    $this->db->like('tbl_customer.cus_phone1', $dataSrch['cus_phone1']);
        	}
        	
        	if($dataSrch['cus_idnt_num'] != null && $dataSrch['cus_idnt_num'] != ""){
        	    $this->db->like('tbl_customer.cus_idnt_num', $dataSrch['cus_idnt_num']);
        	}
        	
        	$this->db->order_by("cus_id", "asc");
        	return $this->db->get()->result();
		}

		public function update($data){
			$this->db->where('com_id', $_SESSION['comId']);
			$this->db->where('cus_id', $data['cus_id']);
			$this->db->update('tbl_customer', $data);
		}
		
		public function insert($data){
			$this->db->insert('tbl_customer',$data);
			return $this->db->insert_id();
		}
		
		function selectTestCustomer(){
		    
		    $this->db->select('*');
		    //$this->db->from('tbl_customer');
		   
		    return $this->db->get('tbl_customer')->result();
		}
    }