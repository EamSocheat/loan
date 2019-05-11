var _btnId;
var _this;
var data_amout = {};
var _data_rate_amount = "";
var _data_rate_id	  = "";
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
				$("#paymentNo").hide();
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
				getRateAmount();
				fn_calculatePayment();
			});
			
			$("#txtCustPayment").keyup(function(e){
				getRateAmount();
				fn_calculatePayment();
			});

			$("#custCurrencyType").on("change", function(e){
				getRateAmount();
				fn_calculatePayment();
			});
			
		}
};

function getRateAmount(){
	parent.$("#loading").hide();

	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Payment/getRateAmount",
		data: '',
		cache: false,
		dataType: "json",
		async:false,
		success: function(res) {
		    parent.$("#loading").hide();
		    
		    if(res.OUT_REC != null && res.OUT_REC.length > 0){
				for(var i = 0; i < res.OUT_REC.length; i++){
					_data_rate_amount = res.OUT_REC[i]['rate_amount'];
					_data_rate_id	  = res.OUT_REC[i]['rate_id'];
					$("#customerRateAmount").val(_data_rate_amount);
					data_amout["RATE_AMOUNT"] = res.OUT_REC[i]['rate_amount'];
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}


function fn_calculatePayment(){
	var contractCurrency = $("#txtCurrency").val();
	var paymentCurrency  = $("#custCurrencyType option:selected").data("sign");
	var txtTotalInterAmt = $("#txtTotalInterAmt").val().trim();
	var txtCustPayReturn = $("#txtCustPayReturn").val().trim();
	var txtCustPayment	 = $("#txtCustPayment").val().trim();
	
	var calculatePayAmt  = 0, txtCustPayReturnAmt = "";
	if(contractCurrency != paymentCurrency){
		if(paymentCurrency == "$"){
			calculatePayAmt = parseFloat(txtTotalInterAmt) / parseFloat(_data_rate_amount);
		}else if(paymentCurrency == "៛"){
			calculatePayAmt = parseFloat(txtTotalInterAmt) * parseFloat(_data_rate_amount);
		}
		txtCustPayReturnAmt = parseFloat(txtCustPayment) - parseFloat(calculatePayAmt);
		if((txtCustPayment != 0 || txtCustPayment != "") && (txtCustPayReturnAmt != "" || txtCustPayReturnAmt != 0)){
			$("#txtCustPayReturn").val(stock.comm.formatCurrency(txtCustPayReturnAmt)+paymentCurrency);
			$("#txtCustPayReturn2").val(txtCustPayReturnAmt);
		}
		$("#txtCustCalcuPay").val(stock.comm.formatCurrency(stock.comm.null2Void(calculatePayAmt, ''))+paymentCurrency);
		$("#txtCustCalcuPay2").val(calculatePayAmt);
	}else{
		$("#txtCustCalcuPay").val(stock.comm.formatCurrency(stock.comm.null2Void(txtTotalInterAmt, ''))+contractCurrency);
		$("#txtCustCalcuPay2").val(txtTotalInterAmt);
		$("#txtCustPayReturn").val("");
		$("#txtCustPayReturn2").val("");

		txtCustPayReturnAmt = parseFloat(txtCustPayment) - parseFloat(txtTotalInterAmt);
		if((txtCustPayment != 0 || txtCustPayment != "") && (txtCustPayReturnAmt != "" || txtCustPayReturnAmt != 0)){
			$("#txtCustPayReturn").val(Number(txtCustPayReturnAmt).toFixed(2)+paymentCurrency);
			$("#txtCustPayReturn2").val(Number(txtCustPayReturnAmt).toFixed(2));
		}
	}

	
	// calculate_pay_amt = if(currencyPayment != customerCurrency){currency == $ ? total_payment * tbl_rate : total_payment / tbl_rate}else{calculate_pay_amt = total_payment}
}

function saveData(str){
    parent.$("#loading").show();
    var totalPayment = $("#txtTotalInterAmt").val();
    if(parseFloat(totalPayment) <= 0){
    	parent.stock.comm.alertMsg($.i18n.prop("msg_pay_save"));
    	parent.$("#loading").hide();
    	return;
    }

	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Payment/savePayment",
		data: new FormData($("#frmPayment")[0]),
		cache: false,
        contentType: false,
        processData: false,
		success: function(res) {
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

			if(res.OUT_REC != null && res.OUT_REC.length > 0){
				for(var i = 0; i < res.OUT_REC.length; i++){
					$("#paymentNo").text("Payment No: "+res.OUT_REC[i]['pay_no']);
					$("#txtContCode").val(res.OUT_REC[i]['con_no']);
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
					$("#txtLoanAmtLeft2").val(stock.comm.formatCurrency(res.OUT_REC[i]['loan_amount_left']));
					$("#txtPayInterAmt").val(stock.comm.formatCurrency(res.OUT_REC[i]['pay_int']));
					$("#txtLastPay").val(stringDate(res.OUT_REC[i]['last_pay_date'].substr(0,10)));
					$("#txtLoanAmt").val(stock.comm.formatCurrency(res.OUT_REC[i]["con_principle"]));
					$("#txtLoanAmt2").val(stock.comm.formatCurrency(res.OUT_REC[i]["con_principle"]));
					$("#txtTotalInterAmt").val(stock.comm.formatCurrency(parseFloat(res.OUT_REC[i]["pay_loan"])+parseFloat(res.OUT_REC[i]["pay_int"])));

					$("#txtCustPayment").val(stock.comm.formatCurrency(res.OUT_REC[i]["pay_usr_amount"]));
					$("#txtCustCalcuPay").val(stock.comm.formatCurrency(res.OUT_REC[i]["pay_usr_amount_calculate"]));
					$("#txtCustPayReturn").val(stock.comm.formatCurrency(res.OUT_REC[i]["pay_usr_amount_return"]));
					$("#custCurrencyType option[value='"+res.OUT_REC[i]["cur_id"]+"']").attr("selected", true);


					$("#txtPayDesc").val(res.OUT_REC[i]["pay_des"]);
					$("#txtPayDesc").attr("disabled", true);

					$("#txtCustPayment").attr("disabled", "disabled");
					$("#custCurrencyType").attr("disabled", "disabled");
					$("#txtCustPayReturn").attr("disabled", "disabled");

					$("#btnSave").hide();					
					
				}
			}else{
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
    $("#txtLoanAmtLeft2").val("");
    $("#txtPayInterAmt").val("");
    $("#txtPayInterAmt2").val("");
    $("#txtLastPay").val("");
    $("#txtLoanAmt").val("");
    $("#txtLoanAmt2").val("");
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
	$("#txtLoanAmt2").val(stock.comm.formatCurrency(data["con_principle"]));
	$("#txtLoanAmtLeft").val(stock.comm.formatCurrency(data["loan_amount_left"]));
	$("#txtLoanAmtLeft2").val(stock.comm.formatCurrency(data["loan_amount_left"]));

	$("#txtCustPayment").val();
	$("#txtCustPayment2").val();
	$("#cboCurrencyType").val();
	$("#txtCustPayReturn").val();
	$("#txtCustPayReturn2").val();

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

	return parseFloat(a) + parseFloat(b);
}

function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}
