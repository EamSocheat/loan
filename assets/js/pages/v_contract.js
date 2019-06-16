
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
		        if(page_no <= 0){
		            page_no = 1;
		        }
		        pageNo = page_no;
		    }
		    var dat = {};
		    //paging
		    dat["perPage"] = $("#perPage").val();
		    dat["offset"]  = parseInt($("#perPage").val())  * ( pageNo - 1);
		    dat["txtSrchContCode"]	= $("#txtSrchContCode").val();
		    dat["txtSrchContSD"]	= $("#txtSrchContSD").val();
		    dat["txtSrchContED"]	= $("#txtSrchContED").val();
		    dat["txtSrchCusNm"]		= $("#txtSrchCusNm").val();
		    dat["cboStatus"]		= $("#cboStatus").val();
		    
		    $("#loading").show();
		    $.ajax({
				type: "POST",
				url : $("#base_url").val() +"Contract/getContract",
				data: dat,
				dataType: "json",
				success: function(res) {
					var html = "", strTotal = "", totalDollar = 0, totalRiels = 0;
					var strTotalPaidInt="",strTotalPaidPrin="",totalPaidIntDollar = 0,totalPaidIntRiels = 0,totalPaidPrinDollar=0, totalPaidPrinRiels=0;
					$("#loading").hide();
					$("#tblContract tbody").html("");
					if(res.OUT_REC != null && res.OUT_REC.length >0){
						
					    for(var i=0; i<res.OUT_REC.length;i++){
					    	if(res.OUT_REC[i]["cur_id"] == "1"){
								totalRiels += parseFloat(stock.comm.null2Void(res.OUT_REC[i]["con_principle"], 0));
								totalPaidIntRiels+= parseFloat(stock.comm.null2Void(res.OUT_REC[i]["total_paid_int"], 0));
								totalPaidPrinRiels+= parseFloat(stock.comm.null2Void(res.OUT_REC[i]["total_paid_prin"], 0));
							}else if(res.OUT_REC[i]["cur_id"] == "2"){
								totalDollar += parseFloat(stock.comm.null2Void(res.OUT_REC[i]["con_principle"], 0));
								totalPaidIntDollar+= parseFloat(stock.comm.null2Void(res.OUT_REC[i]["total_paid_int"], 0));
								totalPaidPrinDollar+= parseFloat(stock.comm.null2Void(res.OUT_REC[i]["total_paid_prin"], 0));
							}

					    	html += '<tr data-id='+res.OUT_REC[i]["con_id"]+'>';
					        html += 	'<td class="chk_box"><input type="checkbox"></td>';
							html += 	'<td><div>'+stock.comm.nullToEmpty(res.OUT_REC[i]["con_no"])+'</div></td>';
							html += 	'<td><div class="txt_c">'+stringDate(res.OUT_REC[i]["con_start_dt"].substr(0,10))+'</div></td>';
							html += 	'<td><div class="txt_r">'+stock.comm.formatCurrency(res.OUT_REC[i]["con_principle"])+res.OUT_REC[i]["cur_syn"]+'</div></td>';
							html += 	'<td><div class="txt_r">'+res.OUT_REC[i]["con_interest"]+'%</div></td>';
							html += 	'<td><div class="txt_c">'+$.i18n.prop("lb_interest_type_"+res.OUT_REC[i]["con_interest_type"])+'</div></td>';
							html += 	'<td><div class="txt_c">'+showPeriod(res.OUT_REC[i]["con_per_year"], res.OUT_REC[i]["con_per_month"])+'</div></td>';
							html += 	'<td><div class="txt_c">'+(getCookie("lang") == "kh" ? res.OUT_REC[i]["cus_nm_kh"] : res.OUT_REC[i]["cus_nm"]) +'</div></td>';
							html += 	'<td><div class="txt_c">'+chkContStatus(res.OUT_REC[i]["con_status"])+'</div></td>';
							html += 	'<td class="text-center">';
							html +=			'<button onclick="editData('+res.OUT_REC[i]["con_id"]+')" type="button" class="btn btn-primary btn-xs">';
							html += 		'<i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
							html += 	'</td>';
							html += '</tr>';
							
							
					    }

					    strTotal +='<tr class="total" style="height: 20px;"><td colspan="2"><button onclick="reportShowHide()" style="width:100%" type="button" class="btn btn-default btn-sm" id="btnReportClose"><i class="fa fa-cog" aria-hidden="true"></i> '+$.i18n.prop("lb_report")+'</button></td></tr>';
					    strTotal += '<tr class="total total_hide" >';
						strTotal += '	<td colspan="2" ><b>'+$.i18n.prop("lb_cal_loan_amt_total")+'</b></td>';
						strTotal += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_khmer")+':</b></td>';
						strTotal += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(totalRiels))+addCurrency("1", totalRiels)+'</b></td>';
						strTotal += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_dollar")+':</b></td>';
						strTotal += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(totalDollar))+addCurrency("2", totalDollar)+'</b></td>';
						strTotal += '<td colspan="4"></td>';
						strTotal += '</tr>';
						
						strTotalPaidInt += '<tr class="total total_hide" >';
						strTotalPaidInt += '	<td colspan="2"><b>'+$.i18n.prop("lb_int_income_total")+'</b></td>';
						strTotalPaidInt += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_khmer")+':</b></td>';
						strTotalPaidInt += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(calRielsCurrency(totalPaidIntRiels)))+addCurrency("1", totalPaidIntRiels)+'</b></td>';
						strTotalPaidInt += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_dollar")+':</b></td>';
						strTotalPaidInt += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(totalPaidIntDollar))+addCurrency("2", totalPaidIntDollar)+'</b></td>';
						strTotalPaidInt += '<td colspan="4"></td>';
						strTotalPaidInt += '</tr>';
						
						strTotalPaidPrin += '<tr class="total total_hide" >';
						strTotalPaidPrin += '	<td colspan="2"><b>'+$.i18n.prop("lb_prin_income_total")+'</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_khmer")+':</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(calRielsCurrency(totalPaidPrinRiels)))+addCurrency("1", totalPaidPrinRiels)+'</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_dollar")+':</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(totalPaidPrinDollar))+addCurrency("2", totalPaidPrinDollar)+'</b></td>';
						strTotalPaidPrin += '<td colspan="4"></td>';
						strTotalPaidPrin += '</tr>';
						
						var incomeAmtRiels = (totalPaidIntRiels +totalPaidPrinRiels) - totalRiels;
						var incomeAmtDollar = (totalPaidIntDollar+totalPaidPrinDollar)-totalDollar;
						if(incomeAmtDollar  < 0){
							incomeAmtDollar = 0;
						}
						strTotalPaidPrin += '<tr class="total total_hide" >';
						strTotalPaidPrin += '	<td colspan="2"><b>'+$.i18n.prop("lb_income_total")+'</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_khmer")+':</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(calRielsCurrency(incomeAmtRiels)))+addCurrency("1", incomeAmtRiels)+'</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="opacity: 0.7;">'+$.i18n.prop("lb_money_dollar")+':</b></td>';
						strTotalPaidPrin += '	<td style="text-align:right"><b style="margin-left: 10px;">'+null2Zero(stock.comm.formatCurrency(incomeAmtDollar))+addCurrency("2", incomeAmtDollar)+'</b></td>';
						strTotalPaidPrin += '<td colspan="4"></td>';
						strTotalPaidPrin += '</tr>';
					    
					    $("#chkAllBox").show();
					    $("#tblContract tbody").html(html);
					    $("#tblContract tbody").append(strTotal);
					    $("#tblContract tbody").append(strTotalPaidInt);
					    $("#tblContract tbody").append(strTotalPaidPrin);
					    stock.comm.renderPaging("paging",$("#perPage").val(),res.OUT_REC_CNT[0]["total_rec"],pageNo);
					}else{
						$("#chkAllBox").hide();
					    $("#tblContract tbody").append("<tr><td colspan='10' style='text-align: center;'>"+$.i18n.prop("lb_no_data")+"</td></tr>");
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
			$("#txtSrchCusNm, #txtSrchContCode").on("keypress", function(e){
				if(e.which == 13){
					_thisPage.loadData(1);
				}
			});
			//
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
				option["height"] = "520px";
				
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
			// 
			$("#btnDownExcel").click(function(e){
				e.preventDefault();
				var chkVal = $('#tblContract tbody tr td.chk_box input[type="checkbox"]:checked');

				if(chkVal.length <= 0){
					stock.comm.alertMsg($.i18n.prop("msg_down_excel"));
					return;
				}
				
				var objArr = [];
				chkVal.each(function(i){
					var tblTr   = $(this).parent().parent();
					var data_id = tblTr.attr("data-id");
					objArr.push(Number(data_id));
				});
				console.log(objArr);
				$("#contId").val(objArr);
				$("#btnExcel").submit();
			});
			
			//
			$("#btnShowRecord").click(function(e){
				$( "#tblContract tr:not(.total)" ).toggle( "fast", function() {
				    // Animation complete.
				});
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
	console.log(dataArr)
	$.ajax({
		type: "POST",
		url : $("#base_url").val() +"Contract/delete",
		data: dataArr,		
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
	option["height"] = "520px";
	
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

function addCurrency(curId,amt){
	if(curId == "1" && !stock.comm.isEmpty(amt) && amt != 0){
		return "៛";	
	}else if(curId == "2" && !stock.comm.isEmpty(amt) && amt != 0){
		return "$";
	}else{
		return "";
	}
}

function showYear(y){
	var year = '';
	if(y > 1){
		year = y+"&nbsp;"+$.i18n.prop("lb_years")+"&nbsp;";
	}else{
		year = y+"&nbsp;"+$.i18n.prop("lb_year")+"&nbsp;";
	}
	return year;
}

function showMonth(m){
	var month = '';
	if(m > 1){
		month = m+"&nbsp;"+$.i18n.prop("lb_months")+"&nbsp;";
	}else{
		month = m+"&nbsp;"+$.i18n.prop("lb_month")+"&nbsp;";
	}
	return month;
}

function commaAmt(str){
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function null2Zero(dat){
	if(dat == null || dat == undefined || dat == "null" || dat == "undefined" || dat == ""){
		return 0;
	}
	return dat;
}

function chkContStatus(s){
	var statusStr = '';
	if(s != "0" || s != 0){
		statusStr = '<span class="label label-success">'+$.i18n.prop("lb_active")+'</span>';
	}else{		
		statusStr = '<span class="label label-danger">'+$.i18n.prop("lb_close")+'</span>';
	}
	return statusStr;
}

function calDayBetweenTwoDate(date1,date2,str){
	if(!date1 || !date2) return;
	date1 = String(date1).substr(0,10).split(str);
	date2 = String(date2).substr(0,10).split(str);

	var d1 = new Date(date1[0], date1[1]-1, date1[2]);
	var d2 = new Date(date2[0], date2[1]-1, date2[2]);

	var msDiff = d1 - d2;
	var daysDiff = msDiff / 1000 / 60 / 60 / 24;
	return daysDiff;
}

/**
 * 
 */
function resetFormSearch(){
	$("#txtSrchContCode").val("");
    $("#txtSrchContSD").val("");
    $("#txtSrchContED").val("");
    $("#txtSrchCusNm").val("");
    $("#cboStatus").val("");
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

function reportShowHide(){
	$( ".total_hide" ).toggle( "fast", function() {
	    // Animation complete.
	});
}