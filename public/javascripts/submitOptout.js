$(document).ready(main);

function main(){

	$('button[name="submitShift"]').click(function() {
		/*var shifts = [];
		var schedule = {};
		$.each($("input[name='shift']:checked"), function (){
			shifts.push($(this).val());
		});*/

		var data = { 
			Name: $("#nameOptout").val(), 
			ATTU_ID: $("#ATTUIDOptout").val()
		}; 
		$.post("/optout", data, function(){}, 'json');
	});
/*
	$('button[name="submitDay"]').click(function() {
		var shifts = [];
		var schedule = {};
		$.each($("input[name='shift']:checked"), function (){
			shifts.push($(this).val());
		});

		schedule []

		var data = { 
			Name: $("#name").val(), 
			ATTU_ID: $("#ATTUID").val(), 
			day: shifts
		}; 
		$.post("/optout", data, function(){}, 'json');
	});
*/

}