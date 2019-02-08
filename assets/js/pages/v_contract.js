
var _pageNo = 1;
$(document).ready(function(){
	_thisPage.onload();
	console.log("CHECKOUT")
	console.log(true)
});

var _thisPage = {
		onload : function(){
			_thisPage.event();
			stock.comm.checkAllTblChk("chkAllBox","tblContract","chk_box");
		}, loadData : function(page_no){
			
		}, editData : function(pos_id){
			
		}, addNewData : function(){
			
		}, deleteData : function(dataArr){
			
		}, event : function(){
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
				getData(1);
			});
			
			//
			$("#btnReset").click(function(e){
				resetFormSearch();
			});
		}
}

function popupPositionCallback(){
	
}
