<?php include 'v_popup_header.php';?>
    <!--  -->
    <div class="row" style="position: relative;">
    	<div class="alert alert-danger" style="position: fixed;text-align:center;padding-left: 30px;padding-right: 30px;display: none;border-radius: 0px;" id="msgErr"> 
    		<strong style="margin: 0 auto;"> <i class="fa fa-warning"></i> Danger : </strong> 
    		<span id="msgShw"></span>
    	</div>
	</div>
    <!--  -->
	<div class="register-box">
		<div class="register-logo">

  		</div>

  		<div class="register-box-body">
    		<h3 class="login-box-msg" data-i18ncd="lb_profile">Personal Information</h3>
    		<form id="frmReg" method="post">
      			<div class="form-group has-feedback">
        			<input type="text" class="form-control" placeholder="Company name" required="required" id="regComNm" name="regComNm">
        			<span class="glyphicon glyphicon-home form-control-feedback"></span>
      			</div>
      			<div class="form-group has-feedback">
      				<label for="regLogNm" style="display: none;">User Name</label>
        			<input type="text" class="form-control" placeholder="Login name" required="required" id="regLogNm" name="regLogNm">
        			
      			</div>      			
      			<div class="form-group has-feedback">
      				<label for="lastPwd" style="display: none;">Old Password</label>
	              	<input type="password" class="form-control" placeholder="Last Password" id="lastPwd" name="lastPwd">
	              	
	            </div>
            <div class="form-group has-feedback">
            		<label for="regPwd" style="display: none;">New Password</label>
        			<input type="password" class="form-control" placeholder="Password" id="regPwd" name="regPwd">
        			
      			</div>
      			<div class="form-group has-feedback">
      				<label for="regPwdCon" style="display: none;">Confirm new Password</label>
        			<input type="password" class="form-control" placeholder="Retype password" id="regPwdCon" name="regPwdCon">
        			
      			</div>
      			<div class="row text-center">
                <!-- <div class="col-xs-8">
                        <div class="checkbox icheck">
                            <label>
                                <input type="checkbox" id="chkTerm"> I agree to the terms
                            </label>
                        </div>
                </div> -->
                    <!-- /.col -->
        			<div class="col-xs-3"></div>
        			<div class="col-xs-3"><button type="submit" class="btn btn-primary " data-i18ncd="btn_update">Update</button></div>
        			<div class="col-xs-3"><button type="button" class="btn btn-default " data-i18ncd="btn_cancl" id="btnCalcel">Cancel</button></div>
        			<div class="col-xs-3"></div>
                    <!-- /.col -->
      			</div>
			</form>
	       <!-- div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign up using Facebook</a>
            <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign up using Google+</a>
            </div> -->
            <!-- <a href="login" class="text-center">I already have a membership</a> -->
		</div>
        <!-- /.form-box -->
	</div>
    <!-- /.register-box -->

    <!-- Modal land.comm.alertMsg -->
	<div class="modal fade mdl-msg" id="mdlAlert" role="dialog" >
		<div class="modal-dialog modal-lg">
        <!-- Modal content-->
			<div class="modal-content">
        		<div class="modal-header" style="background-color: #007bff;color: white;">
          			<h4 class="modal-title" id=""><i class="fa fa-info-circle"></i> Information</h4>
          			<button type="button" class="close" data-dismiss="modal" id="btnExitland.comm.alertMsg">&times;</button>
        		</div>
        		<div class="modal-body">
        		
		        </div>
				<div class="modal-footer">
        			<button type="button" class="btn btn-primary btn-sm" id="alertMsgOk" data-dismiss="modal"><i class="fa fa-check"></i> OK</button>
        		</div>
      		</div>
		</div>
	</div>
    <!-- end modal  --> 


<?php include 'v_popup_footer.php';?>
<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_udpate_user.js"></script>
<input type="hidden" id="base_url" value="<?php echo base_url() ?>"/>

</body>
</html>
