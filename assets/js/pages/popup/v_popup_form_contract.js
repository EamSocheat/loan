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
			    $("#btnSaveNew").show();
			    $("#popupTitle").html("<i class='fa fa-handshake-o'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_contract"));
			}
			$("#frmContract").show();
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
				format: "dd/mm/yyyy",
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
			$("#btnPopupBranch").click(function(e){
				var data="parentId=ifameStockForm";
				data+="&dataSrch="+$("#txtBraNm").val();
				var controllerNm = "PopupSelectBranch";
				var option={};
				option["height"] = "450px";
			    stock.comm.openPopUpSelect(controllerNm,option, data,"modal-md");
			});
			
			//
			$("#btnPopupPosition").click(function(e){
				var data="parentId=ifameStockForm";
				data+="&dataSrch="+$("#txtPosNm").val();
				var controllerNm = "PopupSelectPosition";
				var option={};
				option["height"] = "450px";
			    stock.comm.openPopUpSelect(controllerNm,option, data,"modal-md");
			});
			
			
			$("#btnCal").click(function(e){
				//
				//resetEmi();
				calculateEMI();
			});
			
			$("#btnReset").click(function(e){
				resetEmi();
			});
			
		}
};


function saveData(str){
	$("#contId").appendTo("#frmContract");
    parent.$("#loading").show();
	$.ajax({
		type: "POST",
		url: $("#base_url").val() +"Contract/save",
		data: new FormData($("#frmContract")[0]),
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
			
			if(res.OUT_REC != null && res.OUT_REC.length >0){
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

function selectBranchCallback(data){
	$("#txtBraNm").val(data["bra_nm"]);
	$("#txtBraId").val(data["bra_id"]);
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


