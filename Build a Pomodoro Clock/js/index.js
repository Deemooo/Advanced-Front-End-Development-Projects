$(function() {
	var workTime = $("#workTime").val();
	var breakTime = $("#breakTime").val();
	$(".reduce").click(reduceTimeValue);
	$(".plus").click(plusTimeValue);
	//时间加减方法
	function reduceTimeValue() {
		var flag = $(this).attr("value");
		$("#workTime").val(flag === "work" ? --workTime : workTime);
		$("#breakTime").val(flag === "break" ? --breakTime : breakTime);
	}
	function plusTimeValue() {
		var flag = $(this).attr("value");
		$("#workTime").val(flag === "work" ? ++workTime : workTime);
		$("#breakTime").val(flag === "break" ? ++breakTime : breakTime);
	}
	
	$(".clock").click(startClock);

	function startClock() {
		var showCondition = $(".showCondition").text().replace(/\s/g, "");
		$(".showCondition").text(showCondition === "Work" ? "Break" : "Work");
	}
})