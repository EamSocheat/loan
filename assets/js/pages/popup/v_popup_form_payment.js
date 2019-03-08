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
			    getDataView($("#payId").val());
			    $("#popupTitle").html("<i class='fa fa-pie-chart'></i> "+$.i18n.prop("btn_edit")+" "+ $.i18n.prop("lb_payment"));
			}else{
				stock.comm.todayDate("#txtPaySD","-");
			    $("#btnSaveNew").show();
			    $("#popupTitle").html("<i class='fa fa-pie-chart'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_payment"));
			}
			$("#frmPayment").show();
			$("#braNm").focus();
			//
			$('#txtPaySD').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd-mm-yyyy"
		    });
			$("#txtPaySD").inputmask();
			//
			stock.comm.inputPhoneKhmer("txtPhone1");
			stock.comm.inputPhoneKhmer("txtPhone2");
			stock.comm.inputCurrency("txtpayLoanAmt");
			
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
			$("#txtPaySD").on("change", function(e){
				calPayInterestAmt();
			});
			$("#txtPaySDIcon").click(function(e){
				$(this).next().focus();
			});
			$("#txtpayLoanAmt").keyup(function(e){				
				var payLoan     = $(this).val();
				var interPayAmt = $("#txtPayInterAmt").val();
				var totalAmtVal = totalAmt(interPayAmt,payLoan);
				$("#txtTotalInterAmt").val(stock.comm.formatCurrency(totalAmtVal.toFixed(2)));
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
			if(res == "OK"){
				parent.stock.comm.alertMsg($.i18n.prop("msg_save_com"),"braNm");
				if(str == "new"){
				    clearForm();
				}else{
				    //close popup
				    parent.stock.comm.closePopUpForm("PopupFormPayment", parent.popupPaymentCallback);
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function getDataView(pay_id){
    $("#loading").show();
    $.ajax({
		type: "POST",
		url : $("#base_url").val() +"Payment/getPaymentData",
		data: {"payId":pay_id},
		dataType: "json",
		async: false,
		success: function(res) {
			console.log(res.OUT_REC)

			if(res.OUT_REC != null && res.OUT_REC.length > 0){
				for(var i = 0; i < res.OUT_REC.length; i++){
					$("#paymentNo").text("Payment No: "+res.OUT_REC[i]['pay_no']);
					$("#txtContCode").val(res.OUT_REC[i]['pay_no']);
					$("#txtContId").val(res.OUT_REC[i]['pay_id']);
					$("#txtCusName").val(res.OUT_REC[i]['cus_nm']);
					$("#txtCusId").val(res.OUT_REC[i]['cus_id']);
					$("#txtPaySD").val(stringDate(res.OUT_REC[i]['pay_date']));
					$("#txtPaySD").attr("disabled", true);
					$("#txtPaySDIcon").css("background-color", "rgb(235, 235, 228)");
					$("#txtLoanInter").val(res.OUT_REC[i]['pay_loan_int']);
					$("#txtLoanInter2").val(res.OUT_REC[i]['pay_loan_int']);
					$("#txtloanInterType").val(res.OUT_REC[i]['con_interest_type']);
					$("#txtpayLoanAmt").val(stock.comm.formatCurrency(res.OUT_REC[i]['pay_loan']));
					$("#txtpayLoanAmt").attr("disabled", true);
					$("#txtCurrency").val(res.OUT_REC[i]['cur_syn']);
					$("#txtLoanAmtLeft").val(stock.comm.formatCurrency(res.OUT_REC[i]['loan_amount_left']));
					$("#txtPayInterAmt").val(stock.comm.formatCurrency(res.OUT_REC[i]['pay_int']));
					$("#txtLastPay").val(stringDate(res.OUT_REC[i]['last_pay_date'].substr(0,10)));
					$("#txtLoanAmt").val(stock.comm.formatCurrency(res.OUT_REC[i]["con_principle"]));
					$("#txtTotalInterAmt").val(stock.comm.formatCurrency(parseFloat(res.OUT_REC[i]["pay_loan"])+parseFloat(res.OUT_REC[i]["pay_int"])));
					$("#txtPayDesc").val(res.OUT_REC[i]["pay_des"]);
					$("#txtPayDesc").attr("disabled", true);
					$("#btnSave").hide();					
					
				}
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
    $("#txtContCode").val("");
    $("#txtCusName").val("");
    $("#txtLoanInter").val("");
    $("#txtLoanInter2").val("");
    $("#txtCusName").val("");
    $("#txtloanInterType").val("");
    $("#txtIntTypeCur").val("");
    $("#txtpayLoanAmt").val("");
    $("#txtCurrency").val("");
    $("#txtLoanAmtLeft").val("");
    $("#txtPayInterAmt").val("");
    $("#txtPayInterAmt2").val("");
    $("#txtLastPay").val("");
    $("#txtLoanAmt").val("");
    $("#txtTotalInterAmt").val("");
    $("#txtPayDesc").val("");

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
	var currDay   = $("#txtPaySD").val();
	var lastPay   = $("#txtLastPay").val();
	var interest  = stock.comm.replaceAll($("#txtLoanInter2").val(), ",", "");
	var loanAmt   = stock.comm.replaceAll($("#txtLoanAmtLeft").val(), ",", "");
	var interType = $("#txtloanInterType").val();
	var payLoan   = $("#txtpayLoanAmt").val();
	var calDay    = "";
	var interPerDay  = "";
	var interPayAmt  = 0;

	(interType == "Monthly" || interType == "M") ? Number(interest) : interest = Number(interest) / 12;

	interPerDay = (Number(loanAmt) * (interest / 100)) / 30;
	calDay      = calDayBetweenTwoDate(currDay, lastPay, "-");

	interPayAmt = interPerDay * calDay;
	interPayAmt = interPayAmt.toFixed(2);
	interPayAmt = stock.comm.null2Void(interPayAmt,"");
	var totalAmtVal = totalAmt(interPayAmt,payLoan);
	
	$("#txtPayInterAmt").val(interPayAmt);
	$("#txtPayInterAmt2").val(interPayAmt);
	$("#txtTotalInterAmt").val(stock.comm.formatCurrency(totalAmtVal.toFixed(2)));
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

function totalAmt(a,b){
	if(isNaN(a) || a == ""){
		a = 0
	}
	if(isNaN(b) || b == ""){
		b = 0
	}

	console.log("a:  "+a)
	console.log("b:  "+b)

	return parseFloat(a) + parseFloat(b);
}
