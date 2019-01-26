<?php echo $header; ?>


  <div class="content-wrapper">
    <div class="container-fluid">
      
      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="<?php echo base_url('Admin') ?>" data-i18nCd="lb_dasbord" >Dashboard</a>
        </li>
        <li class="breadcrumb-item active" data-i18nCd="lb_cl_prpt" >Payment Report</li>
      </ol>
      <!-- Breadcrumbs-->
      
      
      
      
    <!-- second row  -->
	<div class="row">
    	<div class="col-lg-12">
          	<!-- user info-->
          	<div class="card mb-3">
            	<div class="card-header">
              		<i class="fa fa-fw fa-calculator"></i><span data-i18nCd="lb_cl"> Calculator </span> 
              		<span style="float: right">
              			<!-- 
              			<button type="button" class="btn btn-success btn-sm" id="btnNew" data-target="#mdlProject" data-toggle="modal">Add New</button>
              			<button type="button" class="btn btn-danger btn-sm" id="btnDelete">Delete</button>
              			<button type="button" class="btn btn-primary btn-sm" id="btnEdit">Edit</button>
              			 <button type="button" class="btn btn-primary btn-sm" id="btnApprove">Approve</button>
              			 -->
              		</span>
              	</div>
            	<div class="card-body">
	              	<div class="row">
	                	<div class="col-sm-12 my-auto">
	                  	
	                  	<!-- calculator -->
						<!--  -->
						<div class="col-sm-12 row" style="margin: 0px;">
							<div class="col-sm-4">
							</div>
							<div class="col-sm-4">
								
										
					      		<input type="hidden" class="form-control" value="<?php  echo date('d-m-Y');?>" id="sellDate1"/>    		          
						    	
						    	<label class="control-label" for="sellDate" data-i18nCd="lb_cl_sdt" >Sell Date:</label> 
						    	<div class='input-group date' id='datetimepicker10' data-date-format="dd-mm-yyyy">
						    	 	
				                    <input type='text' class="form-control" value="" id="sellDate" required/>
				                    <span class="input-group-addon"><span class="fa fa-calendar"></span>
				                    </span>
				                </div>
							</div>
							<div class="col-sm-4">
							</div>
							
						</div>
							
	                	<div class="col-sm-12 row" style="margin: 0px;" id="calBlock">
	                  		<div class="col-sm-3">
					 			<div class="form-group">
						      		<label class="control-label" for="lAmt" data-i18nCd="lb_cl_lamt" >Loan Amount $:</label> 		      		          
						        	<input type="text" class="form-control" id="lAmt" placeholder="Enter loan amount" name="lAmt" >
						    	</div>
						    </div>
						    <div class="col-sm-3">
						    	<div class="form-group">
						    		<label class="control-label " for="lRate" data-i18nCd="lb_cl_lint" >Interest %:</label>
							      	<input type="text" maxlength="2" class="form-control" id="lRate" placeholder="Enter interest" name="lRate" >
						      	</div>   
					   		</div>
					   		
					   		<div class="col-sm-3">
					 			<div class="form-group">
						      		<label class="control-label" for="lYear" data-i18nCd="lb_cl_ly" >Year:</label> 		      		          
						        	<input type="text" maxlength="2" class="form-control" id="lYear" placeholder="Enter year" name="lYear"  >
						    	</div>
						    </div>
						    <div class="col-sm-3">
						    	<div class="form-group">
						    		<label class="control-label " for="lMonth" data-i18nCd="lb_cl_lm">Month:</label>
							      	<input type="text" maxlength="2" class="form-control" id="lMonth" placeholder="Enter month" name="lMonth" >
						      	</div>   
					   		</div>
	                	</div>
	                	<!--  -->
	                	<!--  -->
	                	<div class="col-sm-12" style="margin: 0px;" id="btnCalBlock">
	                		<div class="col-sm-12">
		                  		
		                  		<button type="button" class="btn btn-info btn-sm" style="color: white;float: right;" id="btnCal" onclick="calculateEMI()"><i class="fa fa-fw fa-money"></i> <span data-i18nCd="btn_cal" > Calculate </span></button>
		                  		<button type="button" class="btn btn-warning  btn-sm" style="color: white;float: right;margin-right: 8px;" id="btnReset" ><i class="fa fa-undo"></i> <span data-i18nCd="btn_reset" > Reset </span> </button>
		                  		
		                	</div>
	                	</div>
	                	
	                	<!--  -->
	              		
	              		
	              		
	              		<!-- table  -->
	              		<div class="col-sm-12" style="margin-top: 50px;" id="detailCalBlock">
	              			
	              			<div class="col-sm-12" style="text-align: center;">
		              			<h3> <span data-i18nCd="lb_lp_emi" > EMI $: </span> <span id="monEmi"></span></h3>
		              		</div>
	              		
	              			<div class="table-responsive">
	              				<table class="table table-bordered">
	              					<colgroup >
  									<col width="250"/>
  									<col />
  								</colgroup>
								  	<tbody>
								    	<tr>
								      		<th scope="row" data-i18nCd="tb_cl_lamt" >Loan Amount $</th>
								      		<td id="tbl_la"></td>
								   		</tr>
								   	 	<tr>
								      		<th scope="row" data-i18nCd="tb_cl_lint" >Interest %</th>
								      		<td id="tbl_roi"></td>
								   		</tr>
								   		<tr>
								      		<th scope="row" data-i18nCd="tb_lp_lper" > Period (Months) $ </th>
								      		<td id="tbl_nm"></td>
								   	 	</tr>
								    	<tr>
								      		<th scope="row" data-i18nCd="tb_cl_lmem" >Monthly EMI $</th>
								      		<td id="tbl_emi"></td>
								   	 	</tr>
								   	 	
								   	 	<tr>
								      		<th scope="row" data-i18nCd="tb_cl_ltin">Total Interest $</th>
								      		<td id="tbl_int"></td>
								   	 	</tr>
								   	 	
								   	 	<tr>
								      		<th scope="row" data-i18nCd="tb_cl_ltpay">Total Payment $</th>
								      		<td id="tbl_full"></td>
								   	 	</tr>
								   	 	
								  	</tbody>
								</table>
	              			</div>
		              		<!--  -->
		              		
		              		<!--  -->
							<div class="table-responsive">
								<table id="tblPayDetail" class="table">
	              			
	              				</table>
							</div>
	              			<!--  -->
	              			
	              		</div>
	              		<!--  -->
							  

					<!--  -->
	                </div>
	              </div>
            	</div>
            <div class="card-footer big" style="text-align: right;font-weight: bold;" >  </div>
        	</div>
        </div>
        <!-- end user info.-->
        
	</div>
	<!-- end second row  -->
      
      
    
      
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
	<?php echo $footer; ?>
	<!-- <script src="<?php echo base_url('assets/admin/js/page/calculator.js') ?>"></script> -->
	<script src="<?php echo base_url('assets/') ?>js/pages/calculator.js"></script>
	<?php echo $iframe; ?>
  </div>
  
  
  <input type="hidden" id="pageActive">
  <!--  -->
<!-- </body>

</html> -->
