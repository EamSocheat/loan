var _pageNo=1;
var _perPage=6;
$(document).ready(function() {
	_thisPage.init();
});


var _thisPage = {
	init : function(){
		_this = this;
		_this.onload();
		_this.event();
		//
	    stock.comm.checkAllTblChk("chkAllCustomer","tblCustomer","chk_box");	    
	},
	onload : function(){
		parent.parent.$("#loading").hide();
		$("#frmStaff").show();
		//
		parent.$("#loading").show();
	    setTimeout(getData(),20000);
	    parent.$("#loading").hide();
	},event : function(){
		$("#btnClose,#btnExit").click(function(e){
			parent.parent.stock.comm.closePopUpForm("PopupSelectCustomer");
		});
		//
		$("#btnAddNew").click(function(){
			parent.$("#loading").show();
			var controllerNm = "PopupFormCustomer";
			var option = {};
			option["height"] = "570px";
			var data = "parentId="+"ifameStockSelect";
			
			parent.stock.comm.openPopUpForm(controllerNm,option, data,null,"modalMdBranch","modalMdContentBranch","ifameStockFormBranch");
		});
		//
		$("#btnEdit").click(function(){
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="radio"]:checked');
			if(chkVal.length != 1){
			    parent.stock.comm.alertMsg($.i18n.prop("msg_con_edit1"));
				return;
			}
			
			var tblTr = chkVal.parent().parent();
			var braId=tblTr.attr("data-id");
			editData(braId);
		});
		//
		$("#btnDelete").click(function(e){
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="radio"]:checked');
			
			if(chkVal.length <= 0){
				parent.stock.comm.alertMsg($.i18n.prop("msg_con_del"));
				return;
			}
			
			parent.stock.comm.confirmMsg($.i18n.prop("msg_sure_del"));
			parent.$("#btnConfirmOk").unbind().click(function(e){
				parent.$("#mdlConfirm").modal('hide');
				
				var delArr = [];
				var delObj = {};
				chkVal.each(function(i){
					var delData = {};
					var tblTr = $(this).parent().parent();
					var cusId = tblTr.attr("data-id");
					delData["cusId"] = cusId;
					delArr.push(delData);
				});
				
				delObj["delObj"] = delArr;
				deleteDataArr(delObj);
			});
		});
		//
		$("#btnSearch").click(function(e){
			_pageNo  = 1;
			_perPage = 6;
			getData();
		});
		//
		$("#txtSearch").keypress(function(e) {
		    if(e.which == 13) {
		    	_pageNo=1;
		    	_perPage=6;
			    getData();
		    }
		});
		//on scroll event
		var lastScrollTop = 0;
		$(".fix-header-tbl").scroll(function(e) {
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
					_pageNo+=1;
		            getData();
		        }
			} 
			lastScrollTop = st;
			
		});
		//
		$("#btnChoose").click(function(e) {
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="radio"]:checked');
			if(chkVal.length != 1){
			    parent.stock.comm.alertMsg($.i18n.prop("msg_con_choose1"));
				return;
			}
			
			var tblTr = chkVal.parent().parent();
			var data={};
			data["cus_nm"] = tblTr.find("td.cus_nm").html();
			data["cus_nm_kh"] = tblTr.find("td.cus_nm_kh").html();
			data["cus_id"] = tblTr.attr("data-id");
			data["cus_phone1"] = tblTr.find("td.cus_phone1").html();
			
			var parentFrame="";
			var callbackFunction=null;
			if($("#parentId").val() !="" && $("#parentId").val() !=null){
				parentFrame= $("#parentId").val();
				callbackFunction=parent.$("#"+parentFrame)[0].contentWindow.selectCustomerCallback
			}
			parent.stock.comm.closePopUpForm("PopupSelectCustomer",callbackFunction,data);
		});
		
		//
		$("#tblCustomer tbody").on("dblclick", "tr td:not(.chk_box,.act_btn)", function() {
			var tblTr = $(this).parent();
			var data={};
			data["bra_nm"] = tblTr.find("td.bra_nm").html();
			data["bra_id"] = tblTr.attr("data-id");
			
			var parentFrame="";
			var callbackFunction=null;
			if($("#parentId").val() !="" && $("#parentId").val() !=null){
				parentFrame= $("#parentId").val();
				callbackFunction=parent.$("#"+parentFrame)[0].contentWindow.selectBranchCallback
			}
			parent.stock.comm.closePopUpForm("PopupSelectBranch",callbackFunction,data);
		});
	}
};

function getData(){
	var dat = {};
	//paging
    dat["perPage"] = _perPage;
    dat["offset"]  = _perPage * ( _pageNo - 1);
    //searching
    dat["srchAll"] = $("#txtSearch").val().trim();	
    
    // parent.$("#loading").show();
    $.ajax({
		type: "POST",
		url : $("#base_url").val() +"Customer/getCustomer",
		data: dat,
		dataType: "json",
		success: function(res) {
			// parent.$("#loading").hide();
			if(dat["offset"] == 0){
				$("#tblCustomer tbody").html("");
			}
			
			if(res.OUT_REC != null && res.OUT_REC.length >0){
			    for(var i=0; i<res.OUT_REC.length;i++){
			        var html = "<tr class='dataRow pointer' data-id='"+res.OUT_REC[i]["cus_id"]+"'>";
			        var urlPhoto ="";
			        if(res.OUT_REC[i]["cus_photo"] != null && res.OUT_REC[i]["cus_photo"] != ""){
			        	urlPhoto = $("#base_url").val()+"/upload"+ res.OUT_REC[i]["cus_photo"];
			        }else{
			        	urlPhoto = $("#base_url").val()+"/assets/image/default-staff-photo.png";
			        }
			        // html += "<td class='chk_box'><input type='checkbox'></td>";
			        html += "<td class='chk_box' style='text-align:center;'><input type='radio' name='customer' style='margin-top: 10px;'></td>";
			        html += "<td class='cus_image'><img style='width: 35px;height: 35px;' src='"+ urlPhoto +"' class='img-circle' /></td>";
			        html += "<td class='cus_iden'>"+stock.comm.nullToEmpty(res.OUT_REC[i]["cus_idnt_num"])+"</td>";
			        html += "<td class='cus_nm'>"+res.OUT_REC[i]["cus_nm"]+"</td>";
			        html += "<td class='cus_nm_kh'>"+res.OUT_REC[i]["cus_nm_kh"]+"</td>";
			        html += "<td class='cus_phone1'>"+res.OUT_REC[i]["cus_phone1"]+"</td>";			       
			        html += "</tr>";
			        
			        $("#tblCustomer tbody").append(html);
			    }    
			}else{
				if($("#tblCustomer tbody tr").length <= 0){
					$("#tblCustomer tbody").append("<tr><td colspan='9' style='    text-align: center;'>"+$.i18n.prop("lb_no_data")+"</td></tr>");
				}
			    
			}
			
		},
		error : function(data) {
		    console.log(data);
            parent.stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}
function deleteData(bra_id){
    parent.stock.comm.confirmMsg($.i18n.prop("msg_sure_del"));
    parent.$("#btnConfirmOk").unbind().click(function(e){
		parent.$("#mdlConfirm").modal('hide');
		
		var delArr=[];
		var delObj={};
		var delData={};
		
		delData["braId"] = bra_id;
		delArr.push(delData);
		delObj["delObj"]= delArr;
		//
		deleteDataArr(delObj);
	});
}

function editData(bra_id){
	var data="id="+bra_id;
	data+="&action=U";
	data+="&parentId="+"ifameStockSelect";
	var controllerNm = "PopupFormBranch";
	var option={};
	option["height"] = "460px";
    parent.stock.comm.openPopUpForm(controllerNm,option, data,null,"modalMdBranch","modalMdContentBranch","ifameStockFormBranch");
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
		        parent.stock.comm.alertMsg(res+$.i18n.prop("msg_del_com"));
		        _pageNo  = 1;
		    	_perPage = $("#tblCustomer tbody tr").length;
		        getData();
		    }else{
		        parent.stock.comm.alertMsg($.i18n.prop("msg_err_del"));
		        return;
		    }
		    parent.$("#loading").hide();
		},
		error : function(data) {
			console.log(data);
			parent.stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

/**
 * 
 */
function resetFormSearch(){
	$("#txtSrchBraNm").val("");
    $("#txtSrchBraNmKh").val("");
    $("#txtSrchBraPhone").val("");
    $("#cbxSrchBraType").val("");
}

/**
 * 
*/
function popupCustomerCallback(){
	console.log("log testing");
	_pageNo  = 1;
	_perPage = $("#tblCustomer tbody tr").length;
    getData();
}
