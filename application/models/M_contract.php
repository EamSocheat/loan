<?php
	class M_contract extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectContractData($dataSrch){
    	    $this->db->select('tbl_contract.*, tbl_customer.cus_nm, tbl_customer.cus_nm_kh, tbl_customer.cus_id, tbl_currency.cur_nm, tbl_currency.cur_nm_kh, tbl_currency.cur_syn');
            //$this->db->from('tbl_contract');
            $this->db->join('tbl_customer','tbl_customer.cus_id = tbl_contract.cus_id');
            $this->db->join('tbl_currency','tbl_currency.cur_id = tbl_contract.cur_id');
            $this->db->where('tbl_contract.com_id', $_SESSION['comId']);
            
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
            $this->db->join('tbl_customer','tbl_customer.cus_id = tbl_contract.cus_id');
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