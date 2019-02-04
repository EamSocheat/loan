<?php
class M_user_account extends CI_Model{
		
		function __construct() 
		{
        	parent::__construct();
    	}

    	function selectUserAccData(){
    	    $this->db->select('tbl_company.com_nm, tbl_user.usr_nm');
    	    $this->db->from('tbl_user');
            $this->db->join('tbl_company', 'tbl_company.com_id = tbl_user.com_id');
    	    $this->db->where('tbl_user.com_id', $_SESSION['comId']);
    	    $this->db->where('tbl_user.useYn', 'Y');
    	    $this->db->where('tbl_user.sta_id', $_SESSION['usrId']);
    	    
    	    return $this->db->get()->result();
    	}

    	public function update($data){
            $this->db->where('com_id', $_SESSION['comId']);
            $this->db->where('sta_id', $_SESSION['usrId']);
            $this->db->update('tbl_user',$data);
        }	
    }