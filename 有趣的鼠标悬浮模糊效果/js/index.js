$(function() {
	var img = $("img");
	img.hover(
		function() {
			imgMouseOver();
		},
		function() {
			imgMouseOut();
		}
	);

	function imgMouseOver() {
		img.animate({
			opacity: "0.4"
		}, 1000);
		$("#textContent").show().addClass("other").animate({});
	}
	function imgMouseOut(){
		
	}
})