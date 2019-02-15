
var _pageNo = 1;
$(document).ready(function(){
	_thisPage.onload();
});

var _thisPage = {
		onload : function(){
			this.event();
			this.loadData();
			stock.comm.checkAllTblChk("chkAllBox","tblContract","chk_box");
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
							html += 	'<td><div>000000000'+stock.comm.nullToEmpty(res.OUT_REC[i]["con_no"])+'</div></td>';
							html += 	'<td><div>'+strinngDate(res.OUT_REC[i]["con_start_dt"].substr(0,10))+'</div></td>';
							html += 	'<td><div>'+res.OUT_REC[i]["con_principle"]+'$</div></td>';
							html += 	'<td><div>'+res.OUT_REC[i]["con_interest"]+'%</div></td>';
							html += 	'<td><div>'+res.OUT_REC[i]["con_interest_type"]+'</div></td>';
							html += 	'<td><div>'+res.OUT_REC[i]["con_per_month"]+'</div></td>';
							html += 	'<td><div>customer 00001</div></td>';
							html += 	'<td class="text-center">';
							html +=			'<button onclick="" type="button" class="btn btn-primary btn-xs">';
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
				_pageNo=1;
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
				option["height"] = "440px";
				
				stock.comm.openPopUpForm(controllerNm, option, null, "modal-lg");
			});
			
			//
			$("#btnEdit").click(function(){
				var chkVal = $('#tblStaff tbody tr td.chk_box input[type="checkbox"]:checked');
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
				var chkVal = $('#tblStaff tbody tr td.chk_box input[type="checkbox"]:checked');
				
				if(chkVal.length <= 0){
					stock.comm.alertMsg($.i18n.prop("msg_con_del"));
					return;
				}
				
				stock.comm.confirmMsg($.i18n.prop("msg_sure_del"));
				$("#btnConfirmOk").unbind().click(function(e){
					$("#mdlConfirm").modal('hide');
					
					var delArr=[];
					var delObj={};
					chkVal.each(function(i){
						var delData={};
						var tblTr = $(this).parent().parent();
						var braId=tblTr.attr("data-id");
						delData["staId"] = braId;
						delArr.push(delData);
					});
					
					delObj["delObj"]= delArr;
					//
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
		}
}

function popupPositionCallback(){
	
}

function reverseString(str) {
	return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function strinngDate(str){
	if(str == '') return '';

	return str = str.substr(8,10) +'-'+ str.substr(5,7);// +'-'+ str.substr(0,4);
}