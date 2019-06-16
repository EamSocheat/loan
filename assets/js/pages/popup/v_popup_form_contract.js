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
			loadCurrencyData();
			stock.comm.inputCurrency("lRate");
			stock.comm.inputCurrency("lAmt");
			
			//
			$('#txtContSD').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd-mm-yyyy",
		    });
			$("#txtContSD").inputmask();

			if($("#frmAct").val() == "U"){
			    getDataEdit($("#contId").val());
			    $("#lAmt").attr("readonly","readonly");
			    $("#popupTitle").html("<i class='fa fa-handshake-o'></i> "+$.i18n.prop("btn_edit")+" "+ $.i18n.prop("lb_contract"));
			}else{
				stock.comm.todayDate("#txtContSD","-");
			    $("#btnSaveNew").show();			    
			    $("#popupTitle").html("<i class='fa fa-handshake-o'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_contract"));
			}
			$("#frmContract").show();
			$("#braNm").focus();						
			stock.comm.inputPhoneKhmer("txtPhone1");
			stock.comm.inputPhoneKhmer("txtPhone2");
			
			
		},
		event : function(){
			//
			$("#btnClose,#btnExit").click(function(e){
				//parent.$("#modalMd").modal('hide');
				parent.stock.comm.closePopUpForm("PopupFormContract",parent.popupContractCallback);
			});
			//
			$("#frmContract").submit(function(e){
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
			$("#btnSelectPhoto").click(function(e){
				$("#fileContPhoto").trigger( "click" );
				
			});
			//
			$("#fileContPhoto").change(function(){
			    readURL(this);
			});
			//
			//
			$("#btnPopupCusch").click(function(e){
				var data="parentId=ifameStockForm";
				data+="&dataSrch="+$("#txtCusNm").val();
				var controllerNm = "PopupSelectCustomer";
				var option={};
				option["height"] = "445px";
			    stock.comm.openPopUpSelect(controllerNm,option, data,"modal-md");
			});
			//
			$("#btnPopupPosition").click(function(e){
				var data = "parentId=ifameStockForm";
				data+="&dataSrch="+$("#txtPosNm").val();
				var controllerNm = "PopupSelectPosition";
				var option = {};
				option["height"] = "445px";
			    stock.comm.openPopUpSelect(controllerNm,option, data,"modal-md");
			});
			//
			$("#btnCal").click(function(e){
				//resetEmi();
				calculateEMI();
			});
			//
			$("#btnReset").click(function(e){
				resetEmi();
			});
			//
			$("#txtContSDIcon").click(function(e){
				$(this).next().focus();
			});
			//
			$("#btnStatusActive, #btnStatusClose").click(function(e){
				var statusID = $("#statusID").val();
				if(statusID == "0" || statusID == 0){
					top.stock.comm.confirmMsg($.i18n.prop("msg_sure_close"));
				}else{
					top.stock.comm.confirmMsg($.i18n.prop("msg_sure_active"));
				}
				
				top.$("#btnConfirmOk").unbind().click(function(e){
					top.$("#mdlConfirm").modal('hide');
					updateContractStatus(statusID);
				});
			});

			$("input").focus(function(){
				$("#lRate").css("border","1px solid #d2d6de");
			});
			
		}
};

function loadCurrencyData(){
    parent.$("#loading").show();
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Currency/getCurrency",
		// data: new FormData($("#frmContract")[0]),
		dataType: "json",
		async: false,
		success: function(res) {
		    parent.$("#loading").hide();
		    $("#cboCurrency").html("");
		    var html = '';
			if(res.OUT_REC != null && res.OUT_REC.length > 0){
				$.each(res.OUT_REC, function(i,v){
					html += '<option value="'+v.cur_id+'">'+ (getCookie("lang") == "kh" ? v.cur_nm_kh : v.cur_nm) +'</option>';
				});
				$("#cboCurrency").html(html);
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function saveData(str){
	$("#contId").appendTo("#frmContract");    
    
    var isCusomterEmpty = $("#txtCusNm").val().trim();
    var loanInter = $("#lRate").val().trim();

    if(stock.comm.isNull(isCusomterEmpty) || stock.comm.isEmpty(isCusomterEmpty)) return;
    if(loanInter == "null" || stock.comm.isNull(loanInter) || Number(loanInter) < 0){
    	$("#lRate").css("border","1px solid red");
    	stock.comm.alertMsg($.i18n.prop("msg_err_interest"));
    	return;
    }

    $("#lAmt").val($("#lAmt").val().replace(/[^0-9]/gi, ''));
    
	parent.$("#loading").show();
	$.ajax({
		type : "POST",
		url  : $("#base_url").val() +"Contract/saveContract",
		data : new FormData($("#frmContract")[0]),
		cache: false,
        contentType: false,
        processData: false,
		success: function(res) {
		    parent.$("#loading").hide();
		    console.log(res)
			if(res =="OK"){
				parent.stock.comm.alertMsg($.i18n.prop("msg_save_com"),"braNm");
				if(str == "new"){
				    clearForm();
				}else{					
				    parent.stock.comm.closePopUpForm("PopupFormContract",parent.popupContractCallback);
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function updateContractStatus(status){
	var input = {};
	input["contId"] = $("#contId").val();
	input["statusID"] = $("#statusID").val();
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Contract/udpateStatus",
		data: input,
		dataType: "json",
		success: function(res) {
			console.log(res);
		    if(res > 0){
		    	if(status == "0"){
		    		parent.stock.comm.alertMsg($.i18n.prop("msg_close"),"braNm");
		    	}else{
		    		parent.stock.comm.alertMsg($.i18n.prop("msg_active"),"braNm");
		    	}
				
				parent.stock.comm.closePopUpForm("PopupFormContract",parent.popupContractCallback);
			}else{
				stock.comm.alertMsg($.i18n.prop("msg_err_del"));
		        return;
			}
		    $("#loading").hide();
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
		url : $("#base_url").val() +"Contract/getContract",
		data: {"conId":cont_id},
		dataType: "json",
		async: false,
		success: function(res) {
			//$("#btnSave").hide();
			if(res.OUT_REC != null && res.OUT_REC.length >0){
				
				var status = res.OUT_REC[0]["con_status"];
				$("#balanceLeft").text( $.i18n.prop("lb_pay_balance") +" : "+ stock.comm.formatCurrency(res.OUT_REC[0]["loan_amount_left"])+res.OUT_REC[0]["cur_syn"]);	
				$("#contractNo").text( $.i18n.prop("lb_contract_no") +" : "+ res.OUT_REC[0]["con_no"]);		
				
			    $("#txtCusNm").val(res.OUT_REC[0]["cus_nm_kh"]);
			    $("#txtCusId").val(res.OUT_REC[0]["cus_id"]);
			    $("#txtCusPhone").val(res.OUT_REC[0]["cus_phone1"]);
			    $("#cboCurrency option[value='"+res.OUT_REC[0]["cur_id"]+"']").attr("selected",true);
			    //$("#cboCurrency").val(res.OUT_REC[0]["cur_id"]);
			    $("#txtContSD").val(moment(res.OUT_REC[0]["con_start_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#lAmt").val(stock.comm.formatCurrency(res.OUT_REC[0]["con_principle"]));
			    $("#lRate").val(res.OUT_REC[0]["con_interest"]);
				$("#cbointerestType option[value='"+res.OUT_REC[0]["con_interest_type"]+"']").attr("selected",true);
			    $("#lYear").val(res.OUT_REC[0]["con_per_year"]);
			    $("#lMonth").val(res.OUT_REC[0]["con_per_month"]);
			    
			    $("#txtContED").val(moment(res.OUT_REC[0]["con_end_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
		    	$("#totalLAmt").val(stock.comm.formatCurrency(res.OUT_REC[0]["total_paid_amt"]));
		    	var totalPaidAmt = parseFloat(res.OUT_REC[0]["total_paid_int"]) + parseFloat(res.OUT_REC[0]["total_paid_prin"]);
		    	var totalIncome = totalPaidAmt - parseFloat(res.OUT_REC[0]["con_principle"]);
		    	if(totalIncome  < 0){
		    		totalIncome = 0;
				}
		    	if(res.OUT_REC[0]["cur_id"] == 1){
		    		$("#totalLRate").val(stock.comm.formatCurrency(calRielsCurrency(totalPaidAmt)) +"៛");
		    		$("#totalIncome").val(stock.comm.formatCurrency(calRielsCurrency(totalIncome)) +"៛");
		    	}else{
		    		$("#totalLRate").val(stock.comm.formatCurrency(totalPaidAmt)+"$");
		    		$("#totalIncome").val(stock.comm.formatCurrency(totalIncome)+"$");
		    	}
			    
			    
			    $("#divEnd1").show();
		    	$("#divEnd2").show();
			    $("#divEnd3").show();
			    
			    if(status == "0"){
			    	$("#btnStatusActive").show();
			    	$("#btnStatusClose").hide();
			    	$("#statusID").val("1");
			    	$("#btnSave").hide();

				    $("#divEnd1").show();
				   /* $("#divEnd2").show();
				    $("#divEnd3").show();*/
				    
			    	// $("#btnStatus").attr("data-i18ncd", "btn_status_closed");
			    }else{
			    	$("#divEnd1").hide();
			    	/*$("#divEnd2").hide();
				    $("#divEnd3").hide();*/
				    
			    	$("#btnStatusActive").hide();
			    	$("#btnStatusClose").show();
			    	$("#statusID").val("0");
			    	// $("#btnStatus").attr("data-i18ncd", "btn_status_active");
			    	$("#btnSave").show();
			    }

			    /*$("#txtAddr").val(res.OUT_REC[0]["cont_addr"]);
			    $("#txtPhone1").val(res.OUT_REC[0]["cont_phone1"]);
			    $("#txtPhone2").val(res.OUT_REC[0]["cont_phone2"]);
			    $("#txtEmail").val(res.OUT_REC[0]["cont_email"]);
			    $("#txtStartDate").val(moment(res.OUT_REC[0]["sta_start_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtEndDate").val(moment(res.OUT_REC[0]["sta_end_dt"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtDes").val(res.OUT_REC[0]["sta_des"]);*/
			    
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

function selectCustomerCallback(data){
	if(data["cus_nm"] == "" || data["cus_nm"] == null || stock.comm.isEmpty(data["cus_nm"])){
		$("#txtCusNm").val(data["cus_nm_kh"]);
	}else{
		$("#txtCusNm").val(data["cus_nm"]);		
	}
	
	$("#txtCusId").val(data["cus_id"]);
	$("#txtCusPhone").val(data["cus_phone1"]);
}

function selectPositionCallback(data){
	$("#txtPosNm").val(data["pos_nm"]);
	$("#txtPosId").val(data["pos_id"]);
}

/**
 * 
 */
//
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#contImgView').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function calculateEMI(){
	
	if($("#lAmt").val()==""){
		
		parent.stock.comm.alertMsg($.i18n.prop("msg_cal_amt"),"lAmt");
		return;
	}
	
	if($("#lRate").val()==""){
		
		parent.stock.comm.alertMsg($.i18n.prop("msg_cal_iamt"),"lRate");
		/*alert("Please input interest.");*/
		return;
	}
	
	if($("#lYear").val()=="" && $("#lMonth").val()==""){
		
		parent.stock.comm.alertMsg($.i18n.prop("msg_cal_MY"),"lMonth");
		return;
	}
	
	var txtContSD= $("#txtContSD").val().replace(/[^0-9]/gi, '');
	if(txtContSD.length !=8 ){
		parent.stock.comm.alertMsg($.i18n.prop("Please Select contract start date"),"txtContSD");
		return;
	}
	
	var loanAmount = $("#lAmt").val()=="" ?"0" : $("#lAmt").val().replace(/,/g,"");
	var numberOfMonths = parseInt($("#lMonth").val()=="" ? "0" : $("#lMonth").val() ) + (parseInt( $("#lYear").val() =="" ? "0" : $("#lYear").val()) *  12);
	var rateOfInterest = $("#lRate").val() =="" ? "0" : $("#lRate").val();
	rateOfInterest = rateOfInterest/12;
	var monthlyInterestRatio = (rateOfInterest/100)/12;
	//check monthly or yearly rate
	alert($("#cbointerestType").val());
	if($("#cbointerestType").val() == "M"){
		rateOfInterest = $("#lRate").val() =="" ? "0" : $("#lRate").val();
		monthlyInterestRatio =rateOfInterest/100;
	}
	//
	if(rateOfInterest <=0){
		var top = 0;
		var bottom = 0;
		var sp = 0;
		var emi = loanAmount /numberOfMonths;
		var full = parseInt(loanAmount);
		var interest = 0;
		var int_pge =  (interest / full) * 100;
		//$("#tbl_int_pge").val(int_pge.toFixed(2)+" %");
		
	}else{
		var top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
		var bottom = top -1;
		var sp = top / bottom;
		var emi = ((loanAmount * monthlyInterestRatio) * sp);
		var full = numberOfMonths * emi;
		var interest = full - loanAmount;
		var int_pge =  (interest / full) * 100;
		//$("#tbl_int_pge").val(int_pge.toFixed(2)+" %");
		
	}
	
	var emi_str = emi.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	var full_str = full.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	var int_str = interest.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
	$("#monEmi").html(""+emi_str);
	$("#tbl_emi").html(""+emi_str);
	$("#tbl_la").html(""+loanAmount_str);
	$("#tbl_nm").html(numberOfMonths);
	$("#tbl_roi").html(rateOfInterest);
	$("#tbl_full").html(""+full_str);
	$("#tbl_int").html(""+int_str);
	
	var detailDesc = "<thead><tr class='success'>" +
					         	 "<th>"+$.i18n.prop("tb_cl_lmno")+"</th>" +
						         "<th class='dt-right'>"+$.i18n.prop("tb_cl_lpnt")+"</th>" +
						         "<th class='dt-right'>"+$.i18n.prop("tb_cl_lints")+"</th>" +
						         "<th class='dt-right'>"+$.i18n.prop("tb_cl_lbal")+"</th>" +
						         "<th class='dt-right'>"+$.i18n.prop("tb_cl_ldt")+"</th>" +
					         "</tr>" +
					  "</thead><tbody>";
	var bb=parseInt(loanAmount);
	var int_dd =0;var pre_dd=0;var end_dd=0;
	/*	
	//
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	//
	*/
	
	var dd = txtContSD.substring(0,2);
	var mm = txtContSD.substring(2,4)
	var yyyy = txtContSD.substring(4,8)
	
	var newDay= dd;
	var newMonth=parseInt(mm);
	var newYear = parseInt(yyyy);
	for (var j=1;j<=numberOfMonths;j++){
		
		newMonth +=1;
		if(newMonth > 12){
			newMonth=1;
			newYear+=1;
		}
		newM = newMonth < 10 ? "0"+newMonth : newMonth; 
		var newDate= newDay +"-"+newM +"-"+newYear;
		//
		
		int_dd = bb * rateOfInterest/100 ;
		pre_dd = emi.toFixed(2) - int_dd.toFixed(2);
		end_dd = bb - pre_dd.toFixed(2) ;
		if(end_dd <0){
			end_dd=0;
		}
		
		if(j==numberOfMonths){
			end_dd=0;
		}
	
		detailDesc += "<tr><td class='lNo'>"+j+"</td><td class='dt-right lPrin'>"+parent.stock.comm.formatCurrency(pre_dd.toFixed(2))+"</td><td class='dt-right lRate'>"+parent.stock.comm.formatCurrency(int_dd.toFixed(2))+"</td><td class='dt-right lBal'>"+parent.stock.comm.formatCurrency(end_dd.toFixed(2))+"</td><td class='dt-right lDate'>"+newDate+"</td></tr>";
		bb = bb - pre_dd.toFixed(2);
		
		
	}
	detailDesc += "</tbody>";
	$("#tblPayDetail").html(detailDesc);
	$("#tblPayDetail tr:odd").css("background-color","rgb(244, 244, 255)");
	$("#tblPayDetail td").css("padding","6px");
}

function resetEmi(){
	
	$("#lAmt").val("");
	$("#lRate").val("");
	$("#lYear").val("");
	$("#lMonth").val("");
	
	$("#monEmi").html("");
	$("#tbl_emi").html("");
	$("#tbl_la").html("");
	$("#tbl_nm").html("");
	$("#tbl_roi").html("");
	$("#tbl_full").html("");
	$("#tbl_int").html("");
	
	$("#tblPayDetail").html("");
	
	$("#lAmt").focus();
}
function calRielsCurrency(val){
	
	if(val <=0 || val == 'null' || val == null ||  val == undefined || val == "undefined"){
		return 0;
	}
	val = parseInt(val);
	val = val.toString();
	
	if(val.substr((length-2),2) != "00"){
    	val = val.substr(0,val.length-2) + "00";
		val = parseInt(val) + 100;
    }else{
    	val = parseInt(val);
    }
    
	return val;
}
