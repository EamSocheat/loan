
var _pageNo = 1;
$(document).ready(function(){
	_thisPage.onload();
});

var _thisPage = {
		onload : function(){
			_this = this;
			_this.loadData();
			_this.event();
			_this.init();
			stock.comm.checkAllTblChk("chkAll","tblPayment","chk_box");

			$('#txtSrchContSD').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd-mm-yyyy",
		    });
			$("#txtSrchContSD").inputmask();

			$('#txtSrchContED').datepicker({
				language: (getCookie("lang") == "kh" ? "kh" : "en"),
				weekStart: true,
		        todayBtn:  true,
				autoclose: true,
				todayHighlight: 1,
				forceParse: 0,
				sideBySide: true,
				format: "dd-mm-yyyy",
		    });
			$("#txtSrchContED").inputmask();
		}, init : function(){
			 /*stock.comm.getBrnachType("cbxSrchBraType");
			 $("#cbxSrchBraType").prepend("<option value='' selected='selected'></option>");*/

		}, loadData : function(page_no){
			var pageNo = 1;
		    if(page_no != "" && page_no != null && page_no != undefined){
		        if(page_no <= 0){
		            page_no = 1;
		        }
		        pageNo = page_no;
		    }
			
			var input = {};

			input["limit"]	 = $("#perPage").val();
			input["offset"]	 = parseInt($("#perPage").val())  * ( pageNo - 1);
			input["txtSrchPayCode"]	= $("#txtSrchPayCode").val();
		    input["txtSrchContSD"]	= $("#txtSrchContSD").val();
		    input["txtSrchContED"]	= $("#txtSrchContED").val();
			
		    $("#loading").show();
		    $.ajax({
				type: "POST",
				url: $("#base_url").val() +"Payment/getPaymentData",
				data: input,
				dataType: "json",
				success: function(data) {
					$("#loading").hide();
					var html = "";
					$("#tblPayment tbody").empty();
					console.log(data.OUT_REC);
					if(data.OUT_REC.length > 0){
						$.each(data.OUT_REC, function(i,v){
							html += '<tr data-id='+v.pay_id+'>';
    					  	html += '	<td><input type="checkbox" id="chkAll"></td>';
    					  	html += '	<td><div>'+v.pay_no+'</div></td>';
                          	html += '	<td><div>'+v.con_no+'</div></td>';
    					  	html += '	<td><div>'+stock.comm.formatCurrency(stock.comm.null2Void(v.pay_loan))+'</div></td>';
    					  	html += '	<td><div>'+stock.comm.formatCurrency(stock.comm.null2Void(v.pay_int))+'</div></td>';
                          	html += '	<td><div>'+stringDate(v.pay_date.substr(0,10))+'</div></td>';
                          	html += '	<td><div>'+ stock.comm.formatCurrency( (parseInt(stock.comm.null2Void(v.pay_loan)) + parseInt(stock.comm.null2Void(v.pay_int))) )+'</div></td>';
                          	html += '	<td><div>'+v.cus_nm+'</div></td>';
    					  	html += '	<td class="text-center"><button onclick="editData('+v.pay_id+') type="button" class="btn btn-primary btn-xs">';
    					  	html += '		<i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
							html += '	</td>';
    						html += '</tr>';
						});

						$("#tblPayment tbody").append(html);
						$("#chkAll").show();
						$("#chkAll").prop("checked",false);
						stock.comm.renderPaging("paging",$("#perPage").val(),data.OUT_REC_CNT[0]["total_rec"],pageNo);
					}else{
						$("#chkAll").hide();
						$("#tblPayment tbody").append("<tr><td colspan='7' style='text-align:center;'>No data to show.</td></tr>");
						stock.comm.renderPaging("paging",$("#perPage").val(),0,pageNo);
					}
					
				}, error : function(data) {
				    console.log(data);
				    $("#loading").hide();
				    stock.comm.alertMsg($.i18n.prop("msg_err"));
		        }
			});
		}, editData : function(pos_id){
			$("#loading").show();
			var option = {};
			var data = "id="+pos_id;
			var controllerNm = "PopupFormPayment";
			option["height"] = "520px";
			
			stock.comm.openPopUpForm(controllerNm, option, data, "modal-lg");
		}, addNewData : function(){
			$("#loading").show();
			var controllerNm = "PopupFormPayment";
			var option = {};
			option["height"] = "520px";
			
			stock.comm.openPopUpForm(controllerNm, option, null, "modal-lg");
		}, deleteData : function(dataArr){
			$.ajax({
				type: "POST",
				url: $("#base_url").val() +"Position/deletePosition",
				data: dataArr,
				success: function(res) {
				    if(res > 0){
				        stock.comm.alertMsg(res+$.i18n.prop("msg_del_com"));
				        if($("#chkAll").is(":checked")){
				        	_pageNo = 1;
				        }
				        _this.loadData(_pageNo);
				    }else{
				    	stock.comm.alertMsg($.i18n.prop("msg_err_del"));
				        return;
				    }
				}, error : function(data) {
					console.log(data);
					stock.comm.alertMsg($.i18n.prop("msg_err"));
		        }
			});
		}, event : function(){
			$("#chkAll").on("click", function(){
				$("#tblPosition tbody input:checkbox").prop("checked", this.checked);
			});
			$("#txtSrchPosNm").on("keypress", function(e){
				if(e.which == 13){
					_this.loadData(1);
				}
			});
			$("#txtSrchPosNmKh").on("keypress", function(e){
				if(e.which == 13){
					_this.loadData(1);
				}
			});
			$("#perPage").change(function(e){
				_this.loadData(1);
			});
			$("#paging").on("click", "li a", function(e) {
		        var pageNo = $(this).html();
		        _pageNo = pageNo;
		        _this.loadData(pageNo);
		    });
		    $(".box-footer").on("click", "#btnGoToPage", function(e) {
		        var pageNo = $("#txtGoToPage").val();
		        _this.loadData(pageNo);
		    });
		}
}

function fn_delete(){
	var chkItem = $("#tblPosition tbody input[type=checkbox]:checked");
	
	if(chkItem.length == 0){
		stock.comm.alertMsg($.i18n.prop("msg_con_del"));
		return;
	}
	
	stock.comm.confirmMsg($.i18n.prop("msg_sure_del"));
	$("#btnConfirmOk").unbind().click(function(e){
		$("#mdlConfirm").modal('hide');
		
		var delArr = [];
		var delObj = {};
		chkItem.each(function(i){
			var delData = {};
			var tblTr = $(this).parent().parent();
			var braId = tblTr.attr("data-id");
			delData["posId"] = braId;
			delArr.push(delData);
		});
		
		delObj["delObj"] = delArr;
		_thisPage.deleteData(delObj);
	});
}

function setChk(){
	var cntChk = $("#tblPosition tbody input[type=checkbox]").length;
	var cntUnchk = $("#tblPosition tbody input[type=checkbox]:checked").length;
	(cntChk == cntUnchk) ? $("#chkAll").prop("checked", true) : $("#chkAll").prop("checked", false);
}

function null2Void(dat){
	if(dat == null || dat == undefined || dat == "null" || dat == "undefined"){
		return "";
	}
	return dat;
}

function popupPaymentCallback(){
	_thisPage.loadData(_pageNo);
}

function stringDate(str){
	if(str == '') return '';
	return str = str.substr(8,10) +'-'+ str.substr(5,2) +'-'+ str.substr(0,4);
}


















