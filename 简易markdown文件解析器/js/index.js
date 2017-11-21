$(function() {
	var html = null;
	var editor = $("#editor");
	setInterval(function() {
		markdownChange(editor.val());
		$("#preview").html(html);
	}, 1000);

	function markdownChange(value) {		
		//解析标题
		var titleReg = /^#{1,6} \w+\n$/;
		if(titleReg.test(value)){
			var titleStr = value.match(titleReg);
			
		}
		//解析列表(有序&无序)
		//解析引用&代码块
	}

})