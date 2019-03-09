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
	    stock.comm.checkAllTblChk("chkAllContract","tblContract","chk_box");
	},
	onload : function(){
		parent.parent.$("#loading").hide();
		$("#frmStaff").show();

		loadContractData();
	},event : function(){
		$("#btnClose,#btnExit").click(function(e){
			parent.parent.stock.comm.closePopUpForm("PopupSelectContract");
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
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="checkbox"]:checked');
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
			var chkVal = $('#tblCustomer tbody tr td.chk_box input[type="checkbox"]:checked');
			
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
			loadContractData();
		});
		//
		$("#txtSearch").keypress(function(e) {
		    if(e.which == 13) {
		    	_pageNo=1;
		    	_perPage=6;
			    loadContractData();
		    }
		});
		//on scroll event
		var lastScrollTop = 0;
		$(".fix-header-tbl").scroll(function(e) {
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
					_pageNo+=1;
		            loadContractData();
		        }
			} 
			lastScrollTop = st;
			
		});
		//
		$("#btnChoose").click(function(e) {
			var chkVal = $('#tblContract tbody tr td.chk_box input[type="checkbox"]:checked');
			if(chkVal.length != 1){
			    parent.stock.comm.alertMsg($.i18n.prop("msg_con_choose1"));
				return;
			}
			
			var tblTr = chkVal.parent().parent();
			var data  = {};
			data["con_id"] = tblTr.attr("data-id");
			data["con_no"] = tblTr.find("td.con_no div").text();
			data["con_customer"] = tblTr.find("input.con_customer").val();
			data["con_customer_id"] = tblTr.find("input.con_customer_id").val();
			data["con_customer_phone"] = tblTr.find("input.con_customer_phone").val();
			data["con_inter"] = tblTr.find("input.con_inter").val();
			data["con_inter_type"] = tblTr.find("input.con_inter_type").val();
			data["con_inter_cur"] = tblTr.find("input.con_inter_cur").val();
			data["con_currency"] = tblTr.find("input.con_currency").val();
			data["con_pay_last_date"] = tblTr.find("input.con_pay_last_date").val();
			data["con_principle"] = tblTr.find("input.con_principle").val();
			data["loan_amount_left"] = tblTr.find("input.loan_amount_left").val();
			
			var parentFrame = "";
			var callbackFunction = null;
			if($("#parentId").val() !="" && $("#parentId").val() !=null){
				parentFrame = $("#parentId").val();
				callbackFunction = parent.$("#"+parentFrame)[0].contentWindow.selectConractCallback
			}
			parent.stock.comm.closePopUpForm("PopupSelectContract", callbackFunction, data);
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

function loadContractData(){
	var dat = {};
	//paging
    dat["perPage"] = _perPage;
    dat["offset"]  = _perPage * ( _pageNo - 1);
    //searching
    dat["srchAll"]  = $("#txtSearch").val().trim();	
    dat["srch_status"] = "0";	
    
    console.log(dat);
    // parent.$("#loading").show();
    $.ajax({
		type: "POST",
		url : $("#base_url").val() +"Contract/getContract",
		data: dat,
		dataType: "json",
		success: function(res) {
			// parent.$("#loading").hide();
			if(dat["offset"] == 0){
				$("#tblContract tbody").html("");
			}

			if(res.OUT_REC != null && res.OUT_REC.length >0){
			    for(var i=0; i<res.OUT_REC.length;i++){
			    	var html = '<tr data-id='+res.OUT_REC[i]["con_id"]+'>';
			        html += 	'<td class="chk_box"><input type="checkbox"></td>';
					html += 	'<td class="con_no"><div>'+stock.comm.nullToEmpty(res.OUT_REC[i]["con_no"])+'</div></td>';
					html += 	'<td><div class="txt_c">'+stringDate(res.OUT_REC[i]["con_start_dt"].substr(0,10))+'</div></td>';
					html += 	'<td><div class="txt_r">'+stock.comm.formatCurrency(res.OUT_REC[i]["con_principle"])+res.OUT_REC[i]["cur_syn"]+'</div></td>';
					html += 	'<td><div class="txt_r">'+res.OUT_REC[i]["con_interest"]+'%</div></td>';
					html += 	'<td><div class="txt_c">'+res.OUT_REC[i]["cus_nm"]+'</div></td>';
					html += 	'<input type="hidden" class="con_customer" value='+res.OUT_REC[i]["cus_nm"]+' />';
					html += 	'<input type="hidden" class="con_customer_id" value='+res.OUT_REC[i]["cus_id"]+' />';
					html += 	'<input type="hidden" class="con_customer_phone" value='+res.OUT_REC[i]["cus_phone1"]+' />';
					html += 	'<input type="hidden" class="con_inter" value='+res.OUT_REC[i]["con_interest"]+' />';
					html += 	'<input type="hidden" class="con_inter_type" value='+res.OUT_REC[i]["con_interest_type"]+' />';
					html += 	'<input type="hidden" class="con_inter_cur" value='+res.OUT_REC[i]["cur_id"]+' />';
					html += 	'<input type="hidden" class="con_currency" value='+res.OUT_REC[i]["cur_syn"]+' />';
					html += 	'<input type="hidden" class="con_pay_last_date" value='+res.OUT_REC[i]["pay_last_date"]+' />';
					html += 	'<input type="hidden" class="con_principle" value='+res.OUT_REC[i]["con_principle"]+' />';
					html += 	'<input type="hidden" class="loan_amount_left" value='+res.OUT_REC[i]["loan_amount_left"]+' />';					

					html += '</tr>';
			        
			        $("#tblContract tbody").append(html);
			    }    
			}else{
				if($("#tblContract tbody tr").length <= 0){
					$("#tblContract tbody").append("<tr><td colspan='9' style='    text-align: center;'>"+$.i18n.prop("lb_no_data")+"</td></tr>");
				}
			    
			}
			
		},
		error : function(data) {
		    console.log(data);
            parent.stock.comm.alertMsg($.i18n.prop("msg_err"));
        }
	});
}

function stringDate(str){
	if(str == '') return '';

	return str = str.substr(8,10) +'-'+ str.substr(5,2) +'-'+ str.substr(0,4);
}