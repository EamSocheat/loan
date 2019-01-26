<?php include 'v_popup_header.php';?>
    <!-- general form elements -->
	<input type="hidden" id="contId" name="contId" value="<?php if(isset($_GET["id"])){ echo $_GET["id"]; }?>"/>
	<input type="hidden" id="frmAct" name="frmAct" value="<?php if(isset($_GET["action"])){ echo $_GET["action"]; }?>"/>
    <!-- form start -->
	<form role="form" class="form-horizontal" id="frmContract" action="" style="display: none">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnExit">
				<span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="popupTitle">Default Modal</h4>
		</div>

		<div class="modal-body" id="modalMdBody">
		<!-- modal body  -->

			<div class="row" style="margin: 0;">
				<div class="col-xs-12">
					<div class="col-xs-6 padding-forms-right">
						<div class="form-group">
							<label for="cusNm2" data-i18ncd="lb_customer_name">Customer Name</label>
							<div class="input-group">
								<input type="text" class="form-control input-sm" disabled="disabled" id="txtCusNm" name="txtCusNm">
									<span id="btnPopupCusch" class="input-group-addon label-info" style="border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;cursor: pointer;border-color: #46b8da !important;"><i class="fa fa-search-plus"></i></span>
							</div>
							<input type="hidden" id="txtCusNameId" name="txtCusNameId">
						</div>
	                    <!--  -->
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

					<div class="col-xs-6 padding-forms-right">
						<div class="form-group">
							<label for="txtCusPhone" data-i18ncd="lb_customer_phone">Customer Phone</label>
							<div class="input-group">
								<input type="text" class="form-control input-sm" disabled="disabled" id="txtCusPhone" name="txtCusPhone">
								<span id="btnPopupPosition" class="input-group-addon label-info" style="border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;cursor: pointer;border-color: #46b8da !important;"><i class="fa fa-search-plus"></i></span>
							</div>
							<input type="hidden" id="txtCusPhoneId" name="txtCusPhoneId">
						</div>
						<!--  -->
						<div class="form-group">
                               	<label for="txtContractNmKh" data-i18ncd="lb_name_kh">Khmer Name</label>
                            	<input type="text" class="form-control" id="txtContractNmKh" name="txtContractNmKh" required="required">
                            </div>
                		</div>
					
					</div>
                
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                              <label for="cboGender" data-i18ncd="cboGender">Gender</label>
                              <select class="form-control" id="cboGender" name="cboGender">
	                    			<option value="M">Male</option>
			                    	<option value="F" selected>Female</option>
			                  </select>
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                               	<label for="txtDob" data-i18ncd="contDob">DOB</label>
			                	<div class="input-group date">
				                  	<div class="input-group-addon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
				                    	<i class="fa fa-calendar"></i>
				                  	</div>
				                  	<input type="text" class="form-control pull-right date-pick" id="txtDob" name="txtDob" required="required" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
				                </div>
                            </div>
                		</div>
                		
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                				<label for="txtDes" data-i18ncd="contDes">Description</label>
                              	<input type="text" class="form-control" id="txtDes" name="txtDes" />
                			</div>
                		</div>
                	</div>
                	
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                              <label for="txtPhone1" data-i18ncd="lb_phone">Phone</label>
                              <input type="text" class="form-control" id="txtPhone1" name="txtPhone1"  required="required">
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                              <label for="txtPhone2" data-i18ncd="lb_phone2">Phone2</label>
                              <input type="text" class="form-control" id="txtPhone2" name="txtPhone2" />
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                				<label for="txtEmail" data-i18ncd="lb_email">Email</label>
                              	<input type="email" class="form-control" id="txtEmail" name="txtEmail" />
                			</div>
                		</div>
                	</div>
                	
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-12 padding-forms-left padding-forms-right">
                			<div class="form-group">
                               	<label for="txtAddr" data-i18ncd="txtAddr">Address</label>
                            	<input type="text" class="form-control" id="txtAddr" name="txtAddr">
                            </div>
                		</div>
                	</div>
                	
                	
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                				<label for="txtStartDate" data-i18ncd="contStartDate">Start Date</label>
                              	<div class="input-group date">
				                  	<div class="input-group-addon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
				                    	<i class="fa fa-calendar"></i>
				                  	</div>
				                  	<input type="text" class="form-control pull-right date-pick" id="txtStartDate" name="txtStartDate" required="required" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
				                </div>
                			</div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                				<label for="txtStopDate" data-i18ncd="contEndDate">Stop Date</label>
                              	<div class="input-group date">
				                  	<div class="input-group-addon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
				                    	<i class="fa fa-calendar"></i>
				                  	</div>
				                  	<input type="text" class="form-control pull-right date-pick" id="txtStopDate" name="txtStopDate" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
				                </div>
                			</div>
                		</div>
                		
                	</div>
           
                	
            	</div>
                <!-- end modal body  -->
          </div>
     
          <div class="modal-footer">
          	<button data-i18ncd="btn_save_new"  type="submit" class="btn btn-success btn-sm" id="btnSaveNew" style="display:none">Save + New</button>
            <button data-i18ncd="btn_save" type="submit" class="btn btn-primary btn-sm" id="btnSave">Save</button>
            <button data-i18ncd="btn_close" type="button" class="btn btn-default btn-sm" id="btnClose">Close</button>
          </div>
          </form>
          <!-- form end --> 
          <!-- end general form elements -->
<?php include 'v_popup_footer.php';?>
<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_form_contract.js"></script>