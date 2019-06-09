<?php include 'v_popup_header.php';?>
		  <!-- general form elements -->
		  <input type="hidden" id="cusId" name="cusId" value="<?php if(isset($_GET["id"])){ echo $_GET["id"]; }?>"/>
		  <input type="hidden" id="frmAct" name="frmAct" value="<?php if(isset($_GET["action"])){ echo $_GET["action"]; }?>"/>
      <input type="hidden" id="parentId" name="parentId" value="<?php if(isset($_GET["parentId"])){ echo $_GET["parentId"]; }?>"/>
		  <!-- form start -->
          <form role="form" class="form-horizontal" id="frmCustomer" action="" style="display: none">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnExit">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="popupTitle">Default Modal</h4>
          </div>
          
          <div class="modal-body" id="modalMdBody">
          		<!-- modal body  -->
            	
            	<div class="row">
            		<div class="col-xs-12 row" style="padding:0px; margin-bottom: 20px;">
            		
            			<div class="col-xs-4 padding-forms-left" style="padding-left: 35px;">
                			<div class="image" style="text-align: center">
                            	<img id="cusImgView" src="<?php echo base_url('assets/image/default-staff-photo.png') ?>" class="img-circle" style="width: 150px;height: 150px;" alt="User Image">
                            	<input type="hidden" class="form-control" id="cusImgPath" name="cusImgPath">
                            </div>
                            <div style="text-align: center;margin-top: 5px;">
                            	<button  type="button" class="btn btn-info btn-xs" id="btnSelectPhoto"><i class="fa fa-image" aria-hidden="true"></i> <span data-i18ncd="lb_select_img">Select Image</span></button>
                            	<input type="file" style="display: none" class="form-control" accept="image/*"  id="fileCusPhoto" name="fileCusPhoto" autocomplete="off" />
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">                			
                			<div class="form-group">
                              <label for="braNm" data-i18ncd="lb_name">Name</label>
                              <input type="text" class="form-control" id="txtCustomerNm" name="txtCustomerNm" autocomplete="off" />
                            </div>
                		</div>
                		
                		<div class="col-xs-4 padding-forms-right">                	
                			<div class="form-group">
                               	<label for="txtCustomerNmKh" data-i18ncd="lb_name_kh">Khmer Name</label>
                            	<input type="text" class="form-control" id="txtCustomerNmKh" name="txtCustomerNmKh" required="required" autocomplete="off" />
                            </div>
                		</div>
                		
                		<div class="col-xs-8 padding-forms-right">
                			<div class="form-group">
                               	<label for="txtIdentityNmKh" data-i18ncd="lb_identity">Identity</label>
                            	<input type="text" class="form-control" id="txtIdentityNmKh" name="txtIdentityNmKh" required="required" maxlength="9" autocomplete="off" />
                            </div>
                		</div>
                		
                		
                	</div>
                
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                              <label for="cboGender" data-i18ncd="lb_gender">Gender</label>
                              <select class="form-control" id="cboGender" name="cboGender">
	                    			<option value="Male" data-i18ncd="lb_Male">Male</option>
			                    	<option value="Female" data-i18ncd="lb_Female" selected>Female</option>
			                  </select>
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                               	<label for="txtDob" data-i18ncd="lb_dob">DOB</label>
			                	<div class="input-group date">
				                  	<div class="input-group-addon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;" id="dobIcon">
				                    	<i class="fa fa-calendar"></i>
				                  	</div>
				                  	<input type="text" class="form-control pull-right date-pick" id="txtDob" name="txtDob" required="required" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="" autocomplete="off" />
				                </div>
                            </div>
                		</div>
                		
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                				<label for="txtDes" data-i18ncd="lb_des">Description</label>
                              	<input type="text" class="form-control" id="txtDes" name="txtDes" autocomplete="off" />
                			</div>
                		</div>
                	</div>
                	
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                              <label for="txtPhone1" data-i18ncd="lb_phone">Phone</label>
                              <input type="text" class="form-control" id="txtPhone1" name="txtPhone1" required="required" autocomplete="off" />
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                              <label for="txtPhone2" data-i18ncd="lb_phone2">Phone2</label>
                              <input type="text" class="form-control" id="txtPhone2" name="txtPhone2" autocomplete="off" />
                            </div>
                		</div>
                		<div class="col-xs-4 padding-forms-right">
                			<div class="form-group">
                				<label for="txtEmail" data-i18ncd="lb_email">Email</label>
                              	<input type="email" class="form-control" id="txtEmail" name="txtEmail" autocomplete="off" />
                			</div>
                		</div>
                	</div>
                	
                	<div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-12 padding-forms-left padding-forms-right">
                			<div class="form-group">
                               	<label for="txtAddr" data-i18ncd="lb_addr">Address</label>
                            	<input type="text" class="form-control" id="txtAddr" name="txtAddr" autocomplete="off" />
                            </div>
                		</div>
                	</div>
                	
                	
                	<!-- <div class="col-xs-12 row" style="padding:0px">
                		<div class="col-xs-4 padding-forms-left">
                			<div class="form-group">
                				<label for="txtStartDate" data-i18ncd="cusStartDate">Start Date</label>
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
                				<label for="txtStopDate" data-i18ncd="cusEndDate">Stop Date</label>
                              	<div class="input-group date">
				                  	<div class="input-group-addon" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;">
				                    	<i class="fa fa-calendar"></i>
				                  	</div>
				                  	<input type="text" class="form-control pull-right date-pick" id="txtStopDate" name="txtStopDate" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="">
				                </div>
                			</div>
                		</div>
                	</div>  -->
           
                	
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
<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_form_customer.js"></script>