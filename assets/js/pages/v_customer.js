var _pageNo=1;
var _this;
$(document).ready(function(){
	_thisPage.init();
});

var _thisPage = {
	init : function(){
		_this = this;
		_this.onload();
		_this.event();
	},
	onload : function(){
		getData(); 
		stock.comm.inputNumber("txtSrchBraPhone");
		stock.comm.checkAllTblChk("chkAllBox","tblCustomer","chk_box");
		
	},event : function(){
		$("#perPage").change(function(e){
			_pageNo=1;
			getData();
		});

		//--pagination
		$("#paging").on("click", "li a", function(e) {
			var pageNo = $(this).html();
			_pageNo = pageNo;
			getData(pageNo);
		});
		
		$(".box-footer").on("click", "#btnGoToPage", function(e) {
			var pageNo = $("#txtGoToPage").val();
			getData(pageNo);
		}); 
		
		//
		$("#btnAddNew").click(function(){
			$("#loading").show();
			var controllerNm = "PopupFormCustomer";
			var option = {};
			option["height"] = "570px";
			
			stock.comm.openPopUpForm(controllerNm, option, null, "modal-md");
		});
		
		//
		$("#btnEdit").click(function(){
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="checkbox"]:checked');
			if(chkVal.length != 1){
				stock.comm.alertMsg($.i18n.prop("msg_con_edit1"));
				return;
			}
			var tblTr = chkVal.parent().parent();
			var braId = tblTr.attr("data-id");
			editData(braId);
		});
		
		//
		$("#btnDelete").click(function(e){
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="checkbox"]:checked');
			
			if(chkVal.length <= 0){
				stock.comm.alertMsg($.i18n.prop("msg_con_del"));
				return;
			}
			
			stock.comm.confirmMsg($.i18n.prop("msg_sure_del"));
			$("#btnConfirmOk").unbind().click(function(e){
				$("#mdlConfirm").modal('hide');
				
				var delArr = [];
				var delObj = {};
				chkVal.each(function(i){
					var delData = {};
					var tblTr   = $(this).parent().parent();
					var data_id = tblTr.attr("data-id");
					delData["cusId"] = data_id;
					delArr.push(delData);
				});
				
				delObj["delObj"]= delArr;
				deleteDataArr(delObj);
			});
		});
		
		//
		$("#btnSearch").click(function(e){
			getData(1);
		});
		
		//
		$("#btnReset").click(function(e){
			resetFormSearch();
		});

		$("#btnDownExcel").click(function(){
			downloadExcel();
		});
	}
};

function getData(page_no){
	$("#chkAllBox").prop( "checked", false );
    var pageNo = 1;
    if(page_no != "" && page_no != null && page_no != undefined){
        if(page_no <=0){
            page_no = 1;
        }
        pageNo = page_no;
    }
    var dat = {};
    //paging
    dat["perPage"] = $("#perPage").val();
    dat["offset"] = parseInt($("#perPage").val())  * ( pageNo - 1);
    //searching
    dat["cusNm"]	= $("#txtSrchCusNm").val().trim();
    dat["cusNmKh"]	= $("#txtSrchCusNmKh").val().trim();
    dat["cusPhone"] = $("#txtSrchCusPhone").val().trim();
    dat["cusIdentityNmKh"] = $("#txtSrchIdentityNmKh").val().trim();
        
    $("#loading").show();
    $.ajax({
		type: "POST",
		url : $("#base_url").val() +"Customer/getCustomer",
		data: dat,
		dataType: "json",
		success: function(res) {
			$("#loading").hide();
			$("#tblCustomer tbody").html("");
			if(res.OUT_REC != null && res.OUT_REC.length >0){
			    for(var i=0; i<res.OUT_REC.length;i++){
			        var html = "<tr data-id='"+res.OUT_REC[i]["cus_id"]+"'>";
			        var urlPhoto ="";
			        if(res.OUT_REC[i]["cus_photo"] != null && res.OUT_REC[i]["cus_photo"] != ""){
			        	urlPhoto = $("#base_url").val()+"/upload"+ res.OUT_REC[i]["cus_photo"];
			        }else{
			        	urlPhoto = $("#base_url").val()+"/assets/image/default-staff-photo.png";
			        }
			        html += "<td class='chk_box'><input type='checkbox'></td>";
			        html += "<td class='cus_image'><img style='width: 35px;height: 35px;' src='"+ urlPhoto +"' class='img-circle' /></td>";
			        html += "<td class='cus_iden'>"+stock.comm.nullToEmpty(res.OUT_REC[i]["cus_idnt_num"])+"</td>";
			        html += "<td class='cus_nm'>"+res.OUT_REC[i]["cus_nm"]+"</td>";
			        html += "<td class='cus_nm_kh'>"+res.OUT_REC[i]["cus_nm_kh"]+"</td>";
			        html += "<td class='cus_gender'>"+res.OUT_REC[i]["cus_gender"]+"</td>";
			        html += "<td class='cus_phone1'>"+res.OUT_REC[i]["cus_phone1"]+"</td>";
			        html += "<td class='cus_email'>"+res.OUT_REC[i]["cus_email"]+"</td>";
			        html += "<td class='cus_addr'>"+res.OUT_REC[i]["cus_addr"]+"</td>";
			        html += "<td class='cus_des'>"+res.OUT_REC[i]["cus_des"]+"</td>";
			        html += "<td class='act_btn text-center'><button onclick='editData("+res.OUT_REC[i]["cus_id"]+")' type='button' class='btn btn-primary btn-xs'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
			        html += "</tr>";
			        
			        $("#tblCustomer tbody").append(html);
			    }    
			    
			    stock.comm.renderPaging("paging",$("#perPage").val(),res.OUT_REC_CNT[0]["total_rec"],pageNo);
			}else{
			    $("#tblCustomer tbody").append("<tr><td colspan='9' style='    text-align: center;'>"+$.i18n.prop("lb_no_data")+"</td></tr>");
			    //--pagination
			    stock.comm.renderPaging("paging",$("#perPage").val(),0,pageNo);
			}
			
		},
		error : function(data) {
		    console.log(data);
            stock.comm.alertMsg($.i18n.prop("msg_err"));
            $("#loading").hide();
        }
	});
}

function editData(cus_id){
	var data = "id="+cus_id;
	data += "&action=U";
	
	var controllerNm = "PopupFormCustomer";
	var option = {};
	option["height"] = "570px";
    stock.comm.openPopUpForm(controllerNm,option, data,"modal-md");
}

/**
 * 
 */
function deleteDataArr(dataArr){
	$.ajax({
		type: "POST",
		url: $("#base_url").val() +"Customer/delete",
		data: dataArr,
		success: function(res) {
		    if(res > 0){
		        stock.comm.alertMsg(res+$.i18n.prop("msg_del_com"));
		        getData(_pageNo);
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

function downloadExcel(page_no){
	var pageNo = 1;
    if(page_no != "" && page_no != null && page_no != undefined){
        if(page_no <=0){
            page_no = 1;
        }
        pageNo = page_no;
    }
    var dat = {};
    //paging
    dat["perPage"] = $("#perPage").val();
    dat["offset"]  = parseInt($("#perPage").val())  * ( pageNo - 1);
    //searching
    dat["cusNm"]	= $("#txtSrchCusNm").val().trim();
    dat["cusNmKh"]	= $("#txtSrchCusNmKh").val().trim();
    dat["cusPhone"] = $("#txtSrchCusPhone").val().trim();
    dat["cusIdentityNmKh"] = $("#txtSrchIdentityNmKh").val().trim();

	console.log($("#base_url").val());
	$.ajax({
		type: "POST",
		url: $("#base_url").val() +"Customer/download_excel",
		data: dat,
		contentType: "application/vnd.ms-excel",
		dataType: "text",
		success: function(res) {
		   	console.log(res);
		    $("#loading").hide();
		},
		error : function(data) {
			console.log(data);
			stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

/**
 * 
 */
function resetFormSearch(){
	$("#txtSrchCusNm").val("");
    $("#txtSrchCusNmKh").val("");
    $("#txtSrchCusPhone").val("");
    $("#cbxSrchBranch").val("");
    $("#cbxSrchPos").val("");
    $("#txtSrchIdentityNmKh").val("");
}

/**
 * 
*/
function popupCustomerCallback(){
    getData(_pageNo);
}