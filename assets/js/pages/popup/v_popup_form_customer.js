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
			    getDataEdit($("#cusId").val());
			    $("#popupTitle").html("<i class='fa fa-users'></i> "+$.i18n.prop("btn_edit")+" "+ $.i18n.prop("lb_customer"));
			}else{
			    $("#btnSaveNew").show();
			    $("#popupTitle").html("<i class='fa fa-users'></i> "+$.i18n.prop("btn_add_new")+" "+ $.i18n.prop("lb_customer"));
			}
			
			$("#frmCustomer").show();
			$("#braNm").focus();
			
			$('#txtDob').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				format: "dd/mm/yyyy",
			    startView: 'decade',
			    viewSelect: 'decade',
			    minView: 2,
			    autoclose: true
		    });
			$("#txtDob").inputmask();
			
			$("#txtStartDate").datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd/mm/yyyy",
			});
			$("#txtStartDate").inputmask();
			
			$("#txtStopDate").datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: true,
				forceParse: 0,
				sideBySide: true,
				format: "dd/mm/yyyy",
			});
			$("#txtStopDate").inputmask();
			
			stock.comm.inputPhoneKhmer("txtPhone1");
			stock.comm.inputPhoneKhmer("txtPhone2");
			
		},
		event : function(){
			$("#btnClose,#btnExit").click(function(e){
				//parent.$("#modalMd").modal('hide');
				parent.stock.comm.closePopUpForm("PopupFormCustomer",parent.popupCustomerCallback);
			});
			
			$("#frmCustomer").submit(function(e){
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
				$("#fileCusPhoto").trigger( "click" );
			});
			//
			$("#fileCusPhoto").change(function(){
			    readURL(this);
			});
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
			//
			$("#dobIcon").click(function(){
				$(this).next().focus();
			});
		}
};


function saveData(str){
	$("#cusId").appendTo("#frmCustomer");
    parent.$("#loading").show();
	$.ajax({
		type : "POST",
		url  : $("#base_url").val() +"Customer/save",
		data : new FormData($("#frmCustomer")[0]),
		cache: false,
        contentType: false,
        processData: false,
		success: function(res) {
		    parent.$("#loading").hide();
			if(res =="OK"){
				parent.stock.comm.alertMsg($.i18n.prop("msg_save_com"),"cusNm");
				if(str == "new"){
				    clearForm();
				}else{
					//close popup
					var parentFrame = "";
					var callbackFunction = null;
					if($("#parentId").val() != "" && $("#parentId").val() != null){
						parentFrame = $("#parentId").val();
						callbackFunction = parent.$("#"+parentFrame)[0].contentWindow.popupCustomerCallback
					}else{
						callbackFunction = parent.popupCustomerCallback;
					}

				    parent.stock.comm.closePopUpForm("PopupFormCustomer", callbackFunction);
				}
			}
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function getDataEdit(cus_id){
    $("#loading").show();
    $.ajax({
		type: "POST",
		url : $("#base_url").val() +"Customer/getCustomer",
		data: {"cusId":cus_id},
		dataType: "json",
		async: false,
		success: function(res) {
			if(res.OUT_REC != null && res.OUT_REC.length >0){
			    $("#txtCustomerNm").val(res.OUT_REC[0]["cus_nm"]);
			    $("#txtCustomerNmKh").val(res.OUT_REC[0]["cus_nm_kh"]);
			    $("#txtIdentityNmKh").val(res.OUT_REC[0]["cus_idnt_num"]);
			    $("#cboGender option[value='"+res.OUT_REC[0]["cus_gender"]+"']").attr("selected",true);
			    $("#txtDob").val(moment(res.OUT_REC[0]["cus_dob"], "YYYY-MM-DD").format("DD-MM-YYYY"));
			    $("#txtAddr").val(res.OUT_REC[0]["cus_addr"]);
			    $("#txtPhone1").val(res.OUT_REC[0]["cus_phone1"]);
			    $("#txtPhone2").val(res.OUT_REC[0]["cus_phone2"]);
			    $("#txtEmail").val(res.OUT_REC[0]["cus_email"]);
			    $("#txtDes").val(res.OUT_REC[0]["cus_des"]);
			    if(res.OUT_REC[0]["cus_photo"] != null && res.OUT_REC[0]["cus_photo"] != ""){
			    	$("#cusImgView").attr("src", $("#base_url").val()+"upload"+res.OUT_REC[0]["cus_photo"]);
			    	$("#cusImgPath").val(res.OUT_REC[0]["cus_photo"]);
			    }
			
			    $("#txtCustomerNm").focus();
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
    $("#frmCustomer input").val("");
    $("#frmCustomer textarea").val("");
    $("#cusImgView").attr("src",$("#base_url").val()+"assets/image/default-staff-photo.png");
    $("#txtCustomerNm").focus();
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
        	$("#cusImgView").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

