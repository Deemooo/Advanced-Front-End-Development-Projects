$(function() {
	var html = '';
	var editor = $("#editor");
	setInterval(function() {
		markdownChange(editor.val());
		$("#preview").html(html);
	}, 1000);

	function markdownChange(value) {
		//解析标题
		var valueArr = value.split(/\n/);
		var titleReg = /^#{1,6} \w+$/;
		valueArr.forEach(function(item) {
			if(titleReg.test(item)) {
				html = html + parseTitle(item) + '<br>';
			}
		});

		//解析列表(有序&无序)
		//解析引用&代码块
	}
	function parseTitle(value){
		var index = value.indexOf(" ");
		var titleRes = '';
		switch (index){
			case 1:titleRes ='<h6>'+value+'</h6>' ;break;
			case 2:titleRes ='<h5>'+value+'</h5>' ;break;
			case 3:titleRes ='<h4>'+value+'</h4>' ;break;
			case 4:titleRes ='<h3>'+value+'</h3>' ;break;
			case 5:titleRes ='<h2>'+value+'</h2>' ;break;
			case 6:titleRes ='<h1>'+value+'</h1>' ;break;
		}
		return titleRes;
	}

})