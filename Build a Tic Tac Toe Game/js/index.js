$(function() {
	var role1 = null;
	var role2 = null;
	var value = null;
	//角色选择方法
	function chooseRole() {
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
		if(that.children().length === 0) {
			that.append(qizi);
		}

	}

	function endGame(that) {
		var qizishuliang = $(".qizi").length;
		if(qizishuliang === 9) {
//			var endflag = confirm("游戏结束!立即开始新游戏?");
//			endflag === true ? chooseRole() : null;
		}
	}
})