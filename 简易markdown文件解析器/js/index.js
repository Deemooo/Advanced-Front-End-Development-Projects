$(function() {
	var html = '';
	var editor = $("#editor");
	setInterval(function() {
		var value = editor.val();
		html = marked(value);
		$("#preview").html(html);
	}, 1000);

})