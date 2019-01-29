<?php
class M_user_account extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
        	
    	}

    	function selectUserAccData(){
    	    $this->db->select('*');
    	    //$this->db->from('tbl_customer');
    	    $this->db->where('tbl_user.com_id', $_SESSION['comId']);
    	    $this->db->where('tbl_user.useYn', 'Y');
    	    $this->db->where('tbl_user.sta_id', $_SESSION['staId']);
    	    
    	    return $this->db->get('tbl_user')->result();
    	}

    	public function countUserAccData($dataSrch){
		    
		}		
    }