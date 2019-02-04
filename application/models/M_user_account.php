<?php
class M_user_account extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
    	}

    	function selectUserAccData(){
    	    $this->db->select('*');
    	    $this->db->from('tbl_user');
    	    $this->db->where('tbl_user.com_id', $_SESSION['comId']);
    	    $this->db->where('tbl_user.useYn', 'Y');
    	    $this->db->where('tbl_user.sta_id', $_SESSION['usrId']);
    	    
    	    return $this->db->get()->result();
    	}

    	public function countUserAccData($dataSrch){
		    
		}		
    }