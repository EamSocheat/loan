<?php include 'v_popup_header.php';?>
    <!-- general form elements -->
	<input type="hidden" id="contId" name="contId" value="<?php if(isset($_GET["id"])){ echo $_GET["id"]; }?>"/>
	<input type="hidden" id="frmAct" name="frmAct" value="<?php if(isset($_GET["action"])){ echo $_GET["action"]; }?>"/>
    <!-- form start -->
	<form role="form" class="form-horizontal" id="frmContract" action="" style="display: none">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnExit">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="popupTitle">Default Modal</h4>
		</div>

		<div class="modal-body" id="modalMdBody">
		<!-- modal body  -->
			<div class="row">
				<div class="col-xs-12 row" style="padding:0px">
            		<div class="col-xs-4 padding-forms-left">
            			<div class="form-group">
							<label for="cusNm2" data-i18ncd="lb_customer_name">Customer Name</label>
							<div class="input-group">
								<input type="text" style="height: 34px;" class="form-control input-sm" disabled="disabled" id="txtCusNm" name="txtCusNm">
									<span id="btnPopupCusch" class="input-group-addon label-info" style="border-top-right-radius: 5px;border-bottom-right-radius: 5px;cursor: pointer;border-color: #46b8da !important;"><i class="fa fa-search-plus"></i></span>
							</div>
							<input type="hidden" id="txtCusNameId" name="txtCusNameId">
						</div>
            		</div>

            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
							<label for="txtCusPhone" data-i18ncd="lb_customer_phone">Customer Phone</label>
							<div class="input-group" style="width:100%;">
								<input style="height: 34px; border-radius: 3px;" type="text"  class="form-control input-sm" disabled="disabled" id="txtCusPhone" name="txtCusPhone">
							</div>
						</div>
            		</div>

            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
                           	<label for="cboCurrency" data-i18ncd="">Currency</label>
                        	<select class="form-control" id="cboCurrency" name="cboCurrency" style="font-size: 14px;">
                        		<option value="M">Please Select</option>
	                    		<option value="M">Reil</option>
			                </select>
                        </div>
            		</div>
            	</div>

            	<!-- second row -->
            	<div class="col-xs-12 row" style="padding:0px">
            		<div class="col-xs-4 padding-forms-left">
            			<div class="form-group">
            				<label for="txtContSD" data-i18ncd="contSTART">Contract StartDate</label>
							<div class="input-group date">
								<div class="input-group-addon" id="txtContSDIcon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
									<i class="fa fa-calendar"></i>
								</div>
								<input type="text" class="form-control pull-right date-pick" id="txtContSD" name="txtContSD" required="required" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
							</div>
            			</div>
            		</div>
            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
				      		<label  for="lAmt" data-i18nCd="lb_cl_lamt" >Loan Amount $:</label>
				        	<input type="text" class="form-control" id="lAmt" placeholder="Enter loan amount" name="lAmt" >
				    	</div>
            		</div>
            		
            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
				    		<label for="lRate" data-i18nCd="lb_cl_lint" >Interest %:</label>
					      	<input type="text" maxlength="2" class="form-control" id="lRate" placeholder="Enter interest" name="lRate" >
				      	</div>  
            		</div>
            	</div>
            	<!-- 3 row -->
            	<div class="col-xs-12 row" style="padding:0px">
            		<div class="col-xs-4 padding-forms-left">
            			<div class="form-group">
				      		<label  for="lRate" data-i18nCd="lb_cl_lint" >Interest Type:</label>
                			 <select class="form-control" id="cbointerestType" name="cboCurrency" style="font-size: 14px;">
	                    		<option value="M">Monthly</option>
	                    		<option value="Y">Yearly</option>
			                </select>
				    	</div>
            		</div>
            		
            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
				      		<label for="lYear" data-i18nCd="lb_cl_ly" >Year:</label> 		      		          
				        	<input type="text" maxlength="2" class="form-control" id="lYear" placeholder="Enter year" name="lYear"  >
				    	</div> 
            		</div>
            		
            		<div class="col-xs-4 padding-forms-right">
            			<div class="form-group">
				    		<label for="lMonth" data-i18nCd="lb_cl_lm">Month:</label>
					      	<input type="text" maxlength="2" class="form-control" id="lMonth" placeholder="Enter month" name="lMonth" >
				      	</div> 	
            		</div>
            	</div>
                <!-- data readonly -->
                <div class="col-xs-12 row" style="padding:0;display: block;">
                    <div class="col-xs-4 padding-forms-left">
                        <div class="form-group">
                            <label for="txtContSD" data-i18ncd="contSTART">Contract End Date</label>
                            <div class="input-group date">
                                <div class="input-group-addon" id="txtContEDIcon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right date-pick" id="txtContED" name="txtContED" disabled="disabled" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xs-4 padding-forms-right">
                        <div class="form-group">
                            <label  for="totalLAmt" data-i18nCd="lb_cl_lamt" >Total Loaned Amount $</label>
                            <input type="text" class="form-control" id="totalLAmt" placeholder="Loaned amount" name="totalL" disabled="disabled">
                        </div> 
                    </div>
                    
                    <div class="col-xs-4 padding-forms-right">
                        <div class="form-group">
                            <label for="totalLRate" data-i18nCd="lb_cl_lint" >Total Interest %</label>
                            <input type="text" maxlength="2" class="form-control" id="totalLRate" placeholder="Enter interest" name="totalLRate" disabled="disabled">
                        </div>  
                    </div>
                </div>
                <!-- // data readonly -->
            <!-- end modal body  -->
        </div>
     
        <div class="modal-footer" style="text-align: center;">
            <button data-i18ncd="btn_save_new"  type="submit" class="btn btn-success btn-sm" id="btnSaveNew" style="display:none">Save + New</button>
            <button data-i18ncd="btn_save" type="submit" class="btn btn-primary btn-sm" id="btnSave">Save</button>
            <button data-i18ncd="btn_close" type="button" class="btn btn-default btn-sm" id="btnClose">Close</button>
        </div>
    </form>
    <!-- form end --> 
    <!-- end general form elements -->
<?php include 'v_popup_footer.php';?>
<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_form_contract.js"></script>