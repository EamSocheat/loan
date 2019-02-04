$(document).ready(function() {
	
	renderPersonalData();
	stock.comm.inputNumber("usrPhone");
	
	/*$('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
        //optional
    });*/	
	$("#regPwdCon").keyup(function(e){
		if($("#regPwd").val() != $("#regPwdCon").val()){
			showPwdErr();
		}else{
			$("#msgErr").hide();
			$("#regPwd").css("border-color","#ced4da");
			$("#regPwdCon").css("border-color","#ced4da");
		}
	});
	$("#regPwd").keyup(function(e){
		if($("#regPwd").val() != $("#regPwdCon").val()){
			showPwdErr();
		}else{
			$("#msgErr").hide();
			$("#regPwd").css("border-color","#ced4da");
			$("#regPwdCon").css("border-color","#ced4da");
		}
	});
	$("#chkTerm").click(function(e){
		console.log("OK");
		if($(this).is(":checked")){
			$("#msgErr").hide();
		}
	});
	$('input#chkTerm').on('ifClicked', function() {
		if(!$(this).is(":checked") && $("#regPwd").css("border-color") != "rgb(255, 0, 0)"){
			$("#msgErr").hide();
		}
	});
	$("#btnCalcel").on("click", function(e){
		console.log(true);
		parent.stock.comm.closePopUpForm("PopupFormUpdate", '');
	});
	$("#lastPwd").on("keyup", function(){
		var paramPwd = $(this).val();
		chkPwd(paramPwd);
	});
	$("#frmReg").submit(function(e){
		e.preventDefault();
		updateUser();
	});
});

function renderPersonalData(){
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"UserAccountUpdate/selectUserAccData",
		data: {},
		dataType: "json",
		success: function(res) {
			for(var i=0; i<res.OUT_REC.length; i++){
				$("#regLogNm").val(res.OUT_REC[i]["usr_nm"]);
			}
		},
		error : function(data) {
			console.log(data);
            stock.comm.alertMsg("System Error!!! PLease connect again.");
        }
	});
}

function chkPwd(data){
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"UserAccountUpdate/chkPwdChange",
		data: {"pwdNew":data},
		success: function(isOk) {
			if(isOk > 0){
				$("#lastPwd").css("border-color","lightblue");
			}else{
				$("#lastPwd").css("border-color","red");
			}
		},
		error : function(data) {
			console.log(data);
            stock.comm.alertMsg("System Error!!! PLease connect again.");
        }
	});
}

function updateUser(){
	
	if($("#regPwd").val() != $("#regPwdCon").val()){
		showPwdErr();
		return;
	}
	
	$('#loading').show();
	$.ajax({
		type: "POST",
		url: $("#base_url").val() +"UserAccountUpdate/update",
		data: $("#frmReg").serialize(),
		success: function(res) {
			$('#loading').hide();
			console.log(res);
			if (res == "OK"){
				parent.stock.comm.closePopUpForm("PopupFormUpdate", "");
				parent.window.location.href = $("#base_url").val()+"Login";
			}else{
				console.log(res);
	            stock.comm.alertMsg("System Error!!! PLease connect again.");
			}
		},
		error : function(data) {
			console.log(data);
            stock.comm.alertMsg("System Error!!! PLease connect again.");
        }
	});
}

function showPwdErr(){
	$("#regPwd").css("border-color","red");
	$("#regPwdCon").css("border-color","red");
	$("#msgShw").html("Password do not match!!!");
	$("#msgErr").show();
	
}
