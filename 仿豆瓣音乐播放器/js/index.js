$(function() {
	var musicArry = [{
		singer: '曹格',
		songName: '背叛',
		musicSrc: 'song/曹格 - 背叛.mp3',
		imgSrc: 'images/曹格.jpg'
	}, {
		singer: '赵雷',
		songName: '成都',
		musicSrc: 'song/赵雷 - 成都.mp3',
		imgSrc: 'images/赵雷.jpg'
	}, {
		singer: 'alan-walker',
		songName: 'Faded',
		musicSrc: 'song/Faded.mp3',
		imgSrc: 'images/alan-walker.jpg'
	}];

	//播放器內部功能
	var InnerFunction = {
		changeSongInfo: function(audio) {
			var songName = audio.dataset.songName;
			var singer = audio.dataset.singer;
			singer = singer ? singer : "佚名";
			songName = songName ? songName : "无名曲";
			$("#singer").text(singer);
			$("#song-name").text(songName);
		},
		changeCover: function(audio) {
			var imgSrc = audio.dataset.imgSrc;
			imgSrc = imgSrc ? imgSrc : "src/images/default.jpg";
			$(".cover>img").attr({
				"src": imgSrc
			});
		},
		progressBar: function(audio) {
			var endTime = audio.duration;
			var currentTime = audio.currentTime;
			if($("#progressbar").attr("width") <= 200 && $("#progressbar-cycle").attr("left") <= 200) {
				var value = (currentTime / endTime * 100).toFixed(2) + '%'
				$("#progressbar").attr({
					"width": value
				});
				$("#progressbar-cycle").attr({
					"left": value
				});
			}
		},
		moveProgressBar: function() {
			var progressbarCycle = $("#progressbar-cycle");
			var progressbarWidth = $("#song-progressbar-bg").clientWidth;
			progressbarCycle.mousedown(function(event) {
				offLeft = getPyl.getScreenOffsetLeft(progressbarCycle);
				differWidth = event.clientX - offLeft;
				width = ((progressbarCycle.offsetLeft + differWidth) / progressbarWidth * 100).toFixed(2) +
					'%';
				audio.currentTime = ((progressbarCycle.offsetLeft + differWidth) / progressbarWidth) *
					audio.duration;
				bar.style.width = width;
				progressbarCycle.style.left = width;

			});
		},
		getPyl: function() {
			getScreenOffsetLeft: function(ele) { // 获取相对于屏幕的左偏移量
				var left = 0;
				while(ele) {
					left += ele.offsetLeft;
					ele = ele.offsetParent;
				}
				return left;
			},
			getScreenOffsetTop: function(ele) { // 获取相对于屏幕的上偏移量
				var top = 0;
				while(ele) {
					top += ele.offsetTop;
					ele = ele.offsetParent;
				}
				return top;
			}

		},
		changeTime: function(audio) {
			setInterval(function() {
				time = Math.floor(audio.currentTime);
				m = Math.floor(time / 60);
				s = time % 60;
				m = m >= 10 ? m : '0' + m;
				s = s >= 10 ? s : '0' + s;
				$("#end-time").text(m + ':' + s);
			}, 500);

		},
		changeIcon: function(flag) {
			if(flag === "play") {
				$("#play").hasClass("fa-play") ? $("#play").removeClass("fa-play").addClass("fa-pause") :
					$("#play").removeClass("fa-pause").addClass("fa-play");
			} else if(flag === "like") {
				$("#like").hasClass("fa-heart-o") ? $("#like").removeClass("fa-heart-o").addClass(
						"fa-heart") :
					$("#like").removeClass("fa-heart").addClass("fa-heart-o");

			} else if(flag === "random") {
				$("#random").hasClass("fa-random") ? $("#random").removeClass("fa-random").addClass(
						"fa-refresh") :
					$("#random").removeClass("fa-refresh").addClass("fa-random");
			}

		}

	};
	//其他工具
	var extraFunction = {
		addLocationFiles: function() {

		},
		musicDownload: function() {

		},
		collectMusic: function() {

		},
		valumeControl: function() {

		}
	};
	//播放控制功能
	var playbackControl = {
		play: function() {

		},
		pause: function() {

		},
		forward: function() {

		},
		backward: function() {

		},
		fastForward: function() {

		},
		randomPlay: function() {

		}

	};

	//调试方法
	(function() {

	})();

})