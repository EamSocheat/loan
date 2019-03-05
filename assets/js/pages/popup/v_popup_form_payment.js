var _btnId;
var _this;
$(document).ready(function() {
	_thisPage.init();
});

var _thisPage = {
		init : function(){
			_this = this;
			_this.onload();
			_this.event();
		},
		onload : function(){
			parent.$("#loading").hide();
			clearForm();
			if($("#frmAct").val() == "U"){
			    getDataEdit($("#contId").val());
			    $("#popupTitle").html("<i class='fa fa-handshake-o'></i> "+$.i18n.prop("btn_edit")+" "+ $.i18n.prop("lb_contract"));
			}else{
				stock.comm.todayDate("#txtContSD","-");
			    $("#btnSaveNew").show();
			    $("#popupTitle").html("<i class='fa fa-handshake-o'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_contract"));
			}
			$("#frmPayment").show();
			$("#braNm").focus();
			//
			$('#txtContSD').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd-mm-yyyy"
		    }).on('show', function(e) {
		        console.log("Hello");
		        $(".datepicker").css("top","-4px");
		    });
			$("#txtContSD").inputmask();
			//
			stock.comm.inputPhoneKhmer("txtPhone1");
			stock.comm.inputPhoneKhmer("txtPhone2");
			
		},
		event : function(){
			//
			$("#btnClose,#btnExit").click(function(e){
				//parent.$("#modalMd").modal('hide');
				parent.stock.comm.closePopUpForm("PopupFormPayment", parent.popupContractCallback);
			});
			//
			$("#frmPayment").submit(function(e){
				e.preventDefault();
				if(_btnId == "btnSave"){
			    	saveData();
				}else{
			    	saveData("new");
				}
			});
			//
			$("#btnSave").click(function(e){
				_btnId = $(this).attr("id");
			});
			//
			$("#btnSaveNew").click(function(e){
				_btnId = $(this).attr("id");
			});
			//
			$("#btnPopupPayment").click(function(e){
				var data = "parentId=ifameStockForm";
				data+="&dataSrch="+$("#txtContCode").val();
				var controllerNm = "PopupSelectContract";
				var option = {};
				option["height"] = "450px";
			    stock.comm.openPopUpSelect(controllerNm, option, data, "modal-md");
			});
			$("#txtContSD").on("change", function(e){
				calPayInterestAmt();
			});
			$("#txtContSDIcon").click(function(e){
				$(this).next().focus();
			});	
			
		}
};


function saveData(str){
	// $("#payId").appendTo("#frmPayment");
    parent.$("#loading").show();
    // console.log(new FormData($("#frmPayment")[0]).serialize())
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Payment/savePayment",
		data: new FormData($("#frmPayment")[0]),
		cache: false,
        contentType: false,
        processData: false,
		success: function(res) {
			console.log(res);
		    parent.$("#loading").hide();
			if(res =="OK"){
				parent.stock.comm.alertMsg($.i18n.prop("msg_save_com"),"braNm");
				if(str == "new"){
				    clearForm();
				}else{
				    //close popup
				    parent.stock.comm.closePopUpForm("PopupFormPayment",parent.popupContractCallback);
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function getDataEdit(cont_id){
    //
    $("#loading").show();
    $.ajax({
		type: "POST",
		url: $("#base_url").val() +"Contract/getContract",
		data: {"contId":cont_id},
		dataType: "json",
		async: false,
		success: function(res) {
			if(res.OUT_REC != null && res.OUT_REC.length > 0){
			    $("#txtBraNm").val(res.OUT_REC[0]["bra_nm"]);
			    $("#txtBraId").val(res.OUT_REC[0]["bra_id"]);
			    $("#txtContractNm").val(res.OUT_REC[0]["cont_nm"]);
			    $("#txtPosNm").val(res.OUT_REC[0]["pos_nm"]);
			    $("#txtPosId").val(res.OUT_REC[0]["pos_id"]);
			    $("#txtContractNmKh").val(res.OUT_REC[0]["cont_nm_kh"]);
			    $("#cboGender").val(res.OUT_REC[0]["cont_gender"]);
			    $("#txtDob").val(moment(res.OUT_REC[0]["cont_dob"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtAddr").val(res.OUT_REC[0]["cont_addr"]);
			    $("#txtPhone1").val(res.OUT_REC[0]["cont_phone1"]);
			    $("#txtPhone2").val(res.OUT_REC[0]["cont_phone2"]);
			    $("#txtEmail").val(res.OUT_REC[0]["cont_email"]);
			    $("#txtStartDate").val(moment(res.OUT_REC[0]["sta_start_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtEndDate").val(moment(res.OUT_REC[0]["sta_end_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtDes").val(res.OUT_REC[0]["sta_des"]);
			    if(res.OUT_REC[0]["sta_photo"] != null && res.OUT_REC[0]["sta_photo"] != ""){
			    	$("#staImgView").attr("src",$("#base_url").val()+"upload"+res.OUT_REC[0]["sta_photo"]);
			    }
			    
			    $("#txtContractNm").focus();
			}else{
			    console.log(res);
			    stock.comm.alertMsg($.i18n.prop("msg_err"));
			}
			$("#loading").hide();
		},
		error : function(data) {
		    console.log(data);
		    stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});

}

function clearForm(){
    $("#frmContract input").val("");
    $("#frmContract textarea").val("");
    $("#staImgView").attr("src",$("#base_url").val()+"assets/image/default-staff-photo.png");
    $("#txtContractNm").focus();
}

function selectConractCallback(data){
	$("#txtContId").val(data["con_id"]);
	$("#txtContCode").val(data["con_no"]);	

	$("#txtCusName").val(data["con_customer"]);
	$("#txtCusId").val(data["con_customer_id"]);

	$("#txtCusPhone").val(data["con_customer_phone"]);
	$("#txtLoanInter").val(data["con_inter"]);
	$("#txtLoanInter2").val(data["con_inter"]);

	$("#txtloanInterType").val(data["con_inter_type"]);
	$("#txtIntTypeCur").val(data["con_inter_cur"]);
	$("#txtLastPay").val(stringDate(data["con_pay_last_date"]));
	$("#txtCurrency").val(data["con_currency"]);
	$("#txtLoanAmt").val(stock.comm.formatCurrency(data["con_principle"]));
	$("#txtLoanAmtLeft").val(stock.comm.formatCurrency(data["loan_amount_left"]));

	calPayInterestAmt();
}

function calPayInterestAmt(){
	var currDay   = $("#txtContSD").val();
	var lastPay   = $("#txtLastPay").val();
	var interest  = stock.comm.replaceAll($("#txtLoanInter2").val(), ",", "");
	var loanAmt   = stock.comm.replaceAll($("#txtLoanAmt").val(), ",", "");
	var interType = $("#txtloanInterType").val();
	var calDay    = "";
	var interPerDay  = "";
	var interPayAmt  = 0;

	(interType == "Monthly") ? Number(interest) : interest = Number(interest) / 12;

	interPerDay = (Number(loanAmt) * (interest / 100)) / 30;
	calDay      = calDayBetweenTwoDate(currDay, lastPay, "-");

	interPayAmt = interPerDay * calDay;
	interPayAmt = String(interPayAmt);
	$("#txtPayInterAmt").val(interPayAmt);
	$("#txtPayInterAmt2").val(interPayAmt);
}

function calDayBetweenTwoDate(date1,date2,str){
	if(!date1 || !date2) return;
	date1 = String(date1).substr(0,10).split(str);
	date2 = String(date2).substr(0,10).split(str);
	
	var d1 = new Date(date1[2], date1[1]-1, date1[0]);
	var d2 = new Date(date2[2], date2[1]-1, date2[0]);

	var msDiff = d1 - d2;
	var daysDiff = msDiff / 1000 / 60 / 60 / 24;
	return daysDiff;
}

function stringDate(str){
	if(str == '') return '';
	return str = str.substr(8,10) +'-'+ str.substr(5,2) +'-'+ str.substr(0,4);
}
