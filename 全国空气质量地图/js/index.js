$(function() {
	var dom = document.getElementById("container");
	var myChart = echarts.init(dom);
	myChart.setOption({
		series: [{
			type: 'map',
			map: 'china'
		}]
	});
})