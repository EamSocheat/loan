<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>NokorAPP | Registration Page</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="<?php echo base_url('assets/') ?>bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
	<link rel="stylesheet" href="<?php echo base_url('assets/') ?>bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
	<link rel="stylesheet" href="<?php echo base_url('assets/') ?>bower_components/Ionicons/css/ionicons.min.css">
    <!-- Theme style -->
	<link rel="stylesheet" href="<?php echo base_url('assets/') ?>dist/css/AdminLTE.min.css">
    <!-- iCheck -->
	<link rel="stylesheet" href="<?php echo base_url('assets/') ?>plugins/iCheck/square/blue.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

	<style type="text/css">
        .mdl-msg.modal{ text-align: center; }
        .mdl-msg.modal::before { content: "";display: inline-block;height: 100%;margin-right: -4px;vertical-align: middle; }
        .mdl-msg .modal-dialog {	display: inline-block;text-align: left;vertical-align: middle;max-width: 400px; }
        .mdl-msg .modal-body { padding-top: 30px;padding-left: 50px;padding-right: 50px; }
        .mdl-msg{ z-index: 9999999; }
        .modal-header .close {  margin-top: -25px; }
        .btn{ border-radius: 0px; }
        .unlock-size{ font-size: 19px; }
  </style>
  
</head>
<body class="hold-transition register-page">
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
    		<a href="javascript:"><b>Nokor<span style="color: #555299">APP</span></b></a>
  		</div>

  		<div class="register-box-body">
    		<p class="login-box-msg">Personal Information</p>
    		<form id="frmReg" method="post">
      			<div class="form-group has-feedback">
        			<input type="text" class="form-control" placeholder="Company name" required="required" id="regComNm" name="regComNm">
        			<span class="glyphicon glyphicon-home form-control-feedback"></span>
      			</div>
      			<div class="form-group has-feedback">
        			<input type="text" class="form-control" placeholder="Login name" required="required" id="regLogNm" name="regLogNm">
        			<span class="glyphicon glyphicon-user form-control-feedback"></span>
      			</div>      			
      			<div class="form-group has-feedback">
              <input type="password" class="form-control" placeholder="Last Password" id="lastPwd" name="lastPwd">
              <span class="fa fa-unlock-alt form-control-feedback unlock-size"></span>
            </div>
            <div class="form-group has-feedback">
        			<input type="password" class="form-control" placeholder="Password" id="regPwd" name="regPwd">
        			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
      			</div>
      			<div class="form-group has-feedback">
        			<input type="password" class="form-control" placeholder="Retype password" id="regPwdCon" name="regPwdCon">
        			<span class="glyphicon glyphicon-log-in form-control-feedback"></span>
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
        			<div class="col-xs-3"><button type="submit" class="btn btn-primary btn-block btn-flat">Update</button></div>
        			<div class="col-xs-3"><button type="button" class="btn btn-primary btn-block btn-flat" id="btnCalcel">Cancel</button></div>
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



<!-- ./wrapper -->
<!-- jQuery 3 -->
<script src="<?php echo base_url('assets/') ?>bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="<?php echo base_url('assets/') ?>bower_components/jquery-ui/jquery-ui.min.js"></script>

<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="<?php echo base_url('assets/') ?>bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- daterangepicker -->
<script src="<?php echo base_url('assets/') ?>bower_components/moment/min/moment.min.js"></script>
<!-- datepicker -->
<script src="<?php echo base_url('assets/') ?>bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo base_url('assets/') ?>bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.kh.js"></script>

<!-- FastClick -->
<script src="<?php echo base_url('assets/') ?>bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="<?php echo base_url('assets/') ?>dist/js/adminlte.min.js"></script>

<!-- fullCalendar -->
<script src="<?php echo base_url('assets/') ?>bower_components/moment/moment.js"></script>
<script src="<?php echo base_url('assets/') ?>bower_components/fullcalendar/dist/fullcalendar.min.js"></script>

<!--Multi language  -->
<script src="<?php echo base_url('assets/') ?>lib/jquery.i18n.properties-min.js"></script>
<script src="<?php echo base_url('assets/') ?>js/comm/stock.comm.js"></script>

<!--inputmask  -->
<script src="<?php echo base_url('assets/') ?>plugins/input-mask/jquery.inputmask.js"></script>
<script src="<?php echo base_url('assets/') ?>plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="<?php echo base_url('assets/') ?>plugins/input-mask/jquery.inputmask.extensions.js"></script>

<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_udpate_user.js"></script>
<input type="hidden" id="base_url" value="<?php echo base_url() ?>"/>

</body>
</html>
