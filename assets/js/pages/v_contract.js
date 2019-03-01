
var _pageNo = 1;
$(document).ready(function(){
	_thisPage.onload();
});

var _thisPage = {
		onload : function(){
			this.event();
			this.loadData();
			stock.comm.checkAllTblChk("chkAllBox","tblContract","chk_box");

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
		}, loadData : function(page_no){
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
		    dat["offset"]  = parseInt($("#perPage").val())  * ( pageNo - 1);
		    //searching
		    // dat["txtSrchContNm"]	= $("#txtSrchContNm").val();
		    dat["txtSrchContCode"]	= $("#txtSrchContCode").val();
		    dat["txtSrchContSD"]	= $("#txtSrchContSD").val();
		    dat["txtSrchContED"]	= $("#txtSrchContED").val();

		    $("#loading").show();
		    $.ajax({
				type: "POST",
				url : $("#base_url").val() +"Contract/getContract",
				data: dat,
				dataType: "json",
				success: function(res) {
					var html = "";
					$("#loading").hide();
					$("#tblContract tbody").html("");
					if(res.OUT_REC != null && res.OUT_REC.length >0){
					    for(var i=0; i<res.OUT_REC.length;i++){
					    	html += '<tr data-id='+res.OUT_REC[i]["con_id"]+'>';
					        html += 	'<td class="chk_box"><input type="checkbox"></td>';
							html += 	'<td><div>'+stock.comm.nullToEmpty(res.OUT_REC[i]["con_no"])+'</div></td>';
							html += 	'<td><div class="txt_c">'+stringDate(res.OUT_REC[i]["con_start_dt"].substr(0,10))+'</div></td>';
							html += 	'<td><div class="txt_r">'+commaAmt(res.OUT_REC[i]["con_principle"])+res.OUT_REC[i]["cur_syn"]+'</div></td>';
							html += 	'<td><div class="txt_r">'+res.OUT_REC[i]["con_interest"]+'%</div></td>';
							html += 	'<td><div class="txt_c">'+res.OUT_REC[i]["con_interest_type"]+'</div></td>';
							html += 	'<td><div class="txt_c">'+showPeriod(res.OUT_REC[i]["con_per_year"], res.OUT_REC[i]["con_per_month"])+'</div></td>';
							html += 	'<td><div class="txt_c">'+res.OUT_REC[i]["cus_nm"]+'</div></td>';
							html += 	'<td class="text-center">';
							html +=			'<button onclick="editData('+res.OUT_REC[i]["con_id"]+')" type="button" class="btn btn-primary btn-xs">';
							html += 		'<i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
							html += 	'</td>';
							html += '</tr>';
					    }
					    $("#tblContract tbody").html(html);
					    stock.comm.renderPaging("paging",$("#perPage").val(),res.OUT_REC_CNT[0]["total_rec"],pageNo);
					}else{
					    $("#tblContract tbody").append("<tr><td colspan='9' style='text-align: center;'>"+$.i18n.prop("lb_no_data")+"</td></tr>");
					    stock.comm.renderPaging("paging",$("#perPage").val(),0,pageNo);
					}
				},
				error : function(data) {
				    console.log(data);
		            stock.comm.alertMsg($.i18n.prop("msg_err"));
		            $("#loading").hide();
		        }
			});
		}, editData : function(pos_id){
			
		}, addNewData : function(){
			
		}, deleteData : function(dataArr){
			
		}, event : function(){
			$("#perPage").change(function(e){
				_pageNo = 1;
				_thisPage.loadData();
			});

			//--pagination
			$("#paging").on("click", "li a", function(e) {
				var pageNo = $(this).html();
				_pageNo = pageNo;
				_thisPage.loadData(pageNo);
			});
			$(".box-footer").on("click", "#btnGoToPage", function(e) {
				var pageNo = $("#txtGoToPage").val();
				_thisPage.loadData(pageNo);
			});
			
			//
			$("#btnAddNew").click(function(){
				$("#loading").show();
				var controllerNm = "PopupFormContract";
				var option = {};
				option["height"] = "445px";
				
				stock.comm.openPopUpForm(controllerNm, option, null, "modal-lg");
			});
			
			//
			$("#btnEdit").click(function(){
				var chkVal = $('#tblContract tbody tr td.chk_box input[type="checkbox"]:checked');
				if(chkVal.length != 1){
					stock.comm.alertMsg($.i18n.prop("msg_con_edit1"));
					return;
				}
				
				var tblTr   = chkVal.parent().parent();
				var constId = tblTr.attr("data-id");
				editData(constId);
			});
			
			//
			$("#btnDelete").click(function(e){
				var chkVal = $('#tblContract tbody tr td.chk_box input[type="checkbox"]:checked');
				
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
						var contId  = tblTr.attr("data-id");
						delData["contId"] = contId;
						delArr.push(delData);
					});
					
					delObj["delObj"] = delArr;
					deleteDataArr(delObj);
				});
				
			});
			
			//
			$("#btnSearch").click(function(e){
				_thisPage.loadData(1);
			});
			
			//
			$("#btnReset").click(function(e){
				resetFormSearch();
			});			
			//
			$("#txtContSDIcon, #txtContEDIcon").click(function(e){
				$(this).next().focus();
			});
		}
}

function popupContractCallback(){
    _thisPage.loadData(_pageNo);
}

function reverseString(str) {
	return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function stringDate(str){
	if(str == '') return '';

	return str = str.substr(8,10) +'-'+ str.substr(5,2) +'-'+ str.substr(0,4);
}

function deleteDataArr(dataArr){
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Contract/delete",
		data: dataArr,
		contentType:false,
		cache:false,
		processData:false,
		success: function(res) {
		    if(res > 0){
		        stock.comm.alertMsg(res+$.i18n.prop("msg_del_com"));
		        _thisPage.loadData(_pageNo);
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

function editData(cont_id){	
    $("#loading").show();
	var controllerNm = "PopupFormContract";
	var option = {};
	var data   = "id="+cont_id+"&action=U";
	option["height"] = "445px";
	
	stock.comm.openPopUpForm(controllerNm, option, data, "modal-lg");
}

function showPeriod(y,m){
	var strPer = '';
	if((y != null && y != 0) && (m != null && m != 0)){
		strPer = showYear(y) + showMonth(m);
	}else if(y != null && y != 0){
		strPer = showYear(y);
	}else if(m != null && m != 0){
		strPer = showMonth(m);
	}else{
		strPer = '';
	}
	return strPer;
}

function showYear(y){
	var year = '';
	if(y > 1){
		year = y+"&nbsp;<span data-i18ncd='lb_years'>Years</span>";
	}else{
		year = y+"&nbsp;<span data-i18ncd='lb_year'>Year</span>&nbsp;";
	}
	return year;
}

function showMonth(m){
	var month = '';
	if(m > 1){
		month = m+"&nbsp;<span data-i18ncd='lb_months'>Months</span>";
	}else{
		month = m+"&nbsp;<span data-i18ncd='lb_month'>Month</span>";
	}
	return month;
}

function commaAmt(str){
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}