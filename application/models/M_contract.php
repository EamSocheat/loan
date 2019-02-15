<?php
	class M_contract extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectContractData($dataSrch){
    	    $this->db->select('*');
            //$this->db->from('tbl_contract');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            $this->db->where('tbl_contract.useYn', 'Y');

            if($dataSrch['con_id'] != null && $dataSrch['con_id'] != ""){
                $this->db->where('tbl_contract.con_id', $dataSrch['con_id']);
            }
            
            if($dataSrch['con_no'] != null && $dataSrch['con_no'] != ""){
                $this->db->like('tbl_contract.con_no', $dataSrch['con_no']);
            }
            
            $this->db->order_by("con_id", "asc");
            return $this->db->get('tbl_contract',$dataSrch['limit'],$dataSrch['offset'])->result();
    	}

    	public function countContractData($dataSrch){
		    $this->db->select('count(con_id) as total_rec');
            $this->db->from('tbl_contract');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            $this->db->where('tbl_contract.useYn', 'Y');
            
            if($dataSrch['con_id'] != null && $dataSrch['con_id'] != ""){
                $this->db->where('tbl_contract.con_id', $dataSrch['con_id']);
            }
            
            if($dataSrch['con_no'] != null && $dataSrch['con_no'] != ""){
                $this->db->like('tbl_contract.con_no', $dataSrch['con_no']);
            }
            
            return $this->db->get()->result();
		}		
    }