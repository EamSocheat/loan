<?php
class M_currency extends CI_Model{
	
	function __construct() 
	{
    	parent::__construct();
    	
	}

	function selectCurrencyData(){
	    $this->db->select('*');
        //$this->db->from('tbl_currency');           
        $this->db->where('tbl_currency.com_id', $_SESSION['comId']);
        
        $this->db->order_by("cur_id", "asc");
        return $this->db->get('tbl_currency')->result();
	}

}