var _dataTable;
$(document).ready(function() {
	
	land.comm.inputCurrency("lAmt");
	land.comm.inputCurrency("lRate");
	land.comm.inputNumber("lYear");
	land.comm.inputNumber("lMonth");
	
	$('#datetimepicker10').datetimepicker({
		weekStart: 1,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		sideBySide: true,
		icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            prev: "fa fa-arrow-up",
            next: "fa fa-arrow-down"
        }
    });
	
	
	$(".prev span").addClass("fa fa-arrow-circle-left");
	$(".next span").addClass("fa fa-arrow-circle-right");
	
	$("#sellDate").val($("#sellDate1").val());
	
	/**
	 * 
	 */
	$("#lAmt").keyup(function(e){
		$(this).val(land.comm.formatCurrency( $(this).val() ));
	});
	
	$("#btnCal").click(function(e){
		//
		calculateEMI();
	});
	
	
	$("#btnReset").click(function(e){
		resetEmi();
	});

});

function calculateEMI(){
	
	if($("#lAmt").val()==""){
		
		land.comm.alertMsg($.i18n.prop("msg_cal_amt"));
	   
		$("#lAmt").focus();
		return;
	}
	
	if($("#lRate").val()==""){
		
		land.comm.alertMsg($.i18n.prop("msg_cal_iamt"));
		/*alert("Please input interest.");*/
		$("#lRate").focus();
		return;
	}
	
	if($("#lYear").val()=="" && $("#lMonth").val()==""){
		
		land.comm.alertMsg($.i18n.prop("msg_cal_MY"));
		$("#lMonth").focus();
		return;
	}
	
	var loanAmount = $("#lAmt").val()=="" ?"0" : $("#lAmt").val().replace(/,/g,"");
	var numberOfMonths = parseInt($("#lMonth").val()=="" ? "0" : $("#lMonth").val() ) + (parseInt( $("#lYear").val() =="" ? "0" : $("#lYear").val()) *  12);
	var rateOfInterest = $("#lRate").val() =="" ? "0" : $("#lRate").val();
	
	var monthlyInterestRatio = (rateOfInterest/100)/12;
	
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
	var sellDate= $("#sellDate").val().replace(/[^0-9]/gi, '');
	console.log(sellDate);
	if(sellDate.length !=8 ){
		
		land.comm.alertMsg($.i18n.prop("msg_cal_select"));
		
		$("#sellDate").focus();
		return;
	}
	var dd = sellDate.substring(0,2);
	var mm = sellDate.substring(2,4)
	var yyyy = sellDate.substring(4,8)
	
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
		
		int_dd = bb * ((rateOfInterest/100)/12) ;
		pre_dd = emi.toFixed(2) - int_dd.toFixed(2);
		end_dd = bb - pre_dd.toFixed(2) ;
		if(end_dd <0){
			end_dd=0;
		}
		
		if(j==numberOfMonths){
			end_dd=0;
		}
	
		detailDesc += "<tr><td class='lNo'>"+j+"</td><td class='dt-right lPrin'>"+land.comm.formatCurrency(pre_dd.toFixed(2))+"</td><td class='dt-right lRate'>"+land.comm.formatCurrency(int_dd.toFixed(2))+"</td><td class='dt-right lBal'>"+land.comm.formatCurrency(end_dd.toFixed(2))+"</td><td class='dt-right lDate'>"+newDate+"</td></tr>";
		bb = bb - pre_dd.toFixed(2);
		
		
	}
	detailDesc += "</tbody>";
	$("#tblPayDetail").html(detailDesc);
	$("#tblPayDetail tr:odd").css("background-color","rgb(244, 244, 255)");
	$("#tblPayDetail td").css("padding","6px");
}

function resetEmi(){
	$("#calBlock").show();
	$("#btnCalBlock").show();
	$("#detailCalBlock").css("margin-top","50px");
	
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