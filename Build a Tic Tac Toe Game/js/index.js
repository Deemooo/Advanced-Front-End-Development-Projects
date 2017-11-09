$(function() {
	var role1 = null;
	var role2 = null;
	var value = null;
	//角色选择方法
	function chooseRole() {
		//清空棋盘
		$(".col-md-4").empty();
		role1 = prompt("请输入您选择的角色(O或X):", "X");
		role1 = (role1 === null ? "X" : role1.toUpperCase());
		value = role1;
		if(!(role1 === "X" || role1 === "O")) {
			alert("请输入正确的角色名称!");
			chooseRole();
		}
	}
	chooseRole();
	$(".col-md-4").click(controls);
	//总的控制函数
	function controls(e) {
		var that = $(this);
		luozi(that);
		endGame(that);

		e.stopPropagation();
	}
	//落子
	function luozi(that) {
		role2 = role1 === "X" ? "O" : "X";
		var qizi = $("<div class='qizi'>" + value + "</span>");
		value = (role1 === value ? role2 : role1);
		//限制在一格内重复落子
		that.children().length === 0 ? that.append(qizi) : null;
		//判断三子是否连线
		//横排
		var heng = that.siblings().find(".qizi");
		var hengLength = heng.length;
		var hengQiziValue = $(".qizi", that).text();
		var newArr = [];
		if(hengLength === 2) {
			for(let i = 0; i < hengLength; i++) {
				heng[i].innerText === hengQiziValue ? newArr.push(heng[i]) : null;
			}
			newArr.length === 2 ? endGame(1) : null;
		}
		//竖排
		var newArr1 = [];
		var index = that.index();
		var shuQiziValue = that.children().text();
		var shu1 = that.parent().siblings().eq(0).children(":eq(" + index + ")").children();
		var shu2 = that.parent().siblings().eq(1).children(":eq(" + index + ")").children();
		//非空判断
		if(shuQiziValue) {
			var res1 = (shu1.text() === shuQiziValue);
			var res2 = (shu2.text() === shuQiziValue);
			(res1 && res2) === true ? endGame(1) : null;
		}
		//斜线
		var newArr2 = [];
		var centerQizi = $(".center-block").children(".qizi");
		var centerQiziValue = centerQizi.text();
		var r11 = $("#row-1-1").text();
		var r13 = $("#row-1-3").text();
		var r31 = $("#row-3-1").text();
		var r33 = $("#row-3-3").text();
		//非空判断
		if(centerQiziValue) {
			var res3 = (centerQiziValue === r11 && centerQiziValue === r33);
			var res4 = (centerQiziValue === r13 && centerQiziValue === r31);
			(res3 || res4) === true ? endGame(1) : null;
		}

	}
	//结束游戏方法
	function endGame(endFlag) {
		var qizishuliang = $(".qizi").length;
		if(qizishuliang === 9 || endFlag === 1) {
			var endflag = confirm("游戏结束!立即开始新游戏?");
			endflag === true ? chooseRole() : null;

		}
	}
	//自定义弹窗
	function setWindow(){
		
	}
})