$(function() {
	var audio = $("audio")[0];
	var musicArry = [{
		singer: '曹格',
		songName: '背叛',
		musicSrc: 'src/songs/背叛.mp3',
		imgSrc: 'src/images/曹格.jpg'
	}, {
		singer: '赵雷',
		songName: '成都',
		musicSrc: 'src/songs/成都.mp3',
		imgSrc: 'src/images/赵雷.jpg'
	}, {
		singer: 'alan-walker',
		songName: 'Faded',
		musicSrc: 'src/songs/Faded.mp3',
		imgSrc: 'src/images/alan-walker.jpg'
	}];

	function initPlayer(index) {
		var firstSong = musicArry[index];
		audio.dataset.index = index;
		for(var key in firstSong) {
			if(key) {
				attr = 'data-' + key;
				audio.setAttribute(attr, firstSong[key]);
			}

		}
	}
	initPlayer(0);

	//播放器內部功能
	var innerFunction = {
		changeSongInfo: function() {
			var songName = audio.dataset.songname;
			var singer = audio.dataset.singer;
			singer = singer ? singer : "佚名";
			songName = songName ? songName : "无名曲";
			$("#singer").text(singer);
			$("#song-name").text(songName);
		},
		changeCover: function() {
			var imgSrc = audio.dataset.imgsrc;
			imgSrc = imgSrc ? imgSrc : "src/images/default.jpg";
			$(".cover>img").attr({
				"src": imgSrc
			});
		},
		progressBar: function() {
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
		moveProgressBar: function(event) {
			var progressbarCycle = $("#progressbar-cycle");
			var progressbarWidth = $("#song-progressbar-bg").clientWidth;
			offLeft = innerFunction.getScreenOffsetLeft(progressbarCycle);
			differWidth = event.clientX - offLeft;
			width = ((progressbarCycle.offsetLeft + differWidth) / progressbarWidth * 100).toFixed(2) +
				'%';
			audio.currentTime = ((progressbarCycle.offsetLeft + differWidth) / progressbarWidth) *
				audio.duration;
			bar.style.width = width;
			progressbarCycle.style.left = width;
		},
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
		},
		changeTime: function() {
			time = Math.floor(audio.currentTime);
			m = Math.floor(time / 60);
			s = time % 60;
			m = m >= 10 ? m : '0' + m;
			s = s >= 10 ? s : '0' + s;
			$("#end-time").text(m + ':' + s);
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
			$(".upload").click();

		},
		musicDownload: function(event) {
			event.href = audio.musicSrc;
		},
		collectMusic: function() {
			var collectFlag = audio.dataset.collect;
			collectFlag = collectFlag === 'collect' ? 'cancel' : 'collect';
			audio.dataset.collect = collectFlag;
		},
		valumeControl: function(event) {
			var volumeProgressbarBg = $("#volume-progressbar-bg");
			var volumeProgressbar = $("#volume-progressbar");
			var volumeProgressbarCycle = $("#volume-progressbar-cycle");
			volumeProgressbarBg.show();
			var barBgHeight = volumeProgressbarBg[0].clientHeight; // 喇叭背景进度条高度
			var barHeight = volumeProgressbar[0].clientHeight; // 喇叭进度条高度
			var offTop = innerFunction.getScreenOffsetTop(volumeProgressbarCycle[0]); // 相对于屏幕的偏移量
			var differHeight = offTop - event.clientY;
			var percent = (barHeight + differHeight) / barBgHeight;
			if(percent < 0) {
				percent = 0;
			} else if(percent > 1) {
				percent = 1;
			}
			audio.volume = percent; // 音量
			volumeProgressbar.attr({
				"height": percent * 100 + '%'
			});
			volumeProgressbarCycle.attr({
				"bottom": percent * 100 + '%'
			});

		}
	};
	//播放控制功能
	var playbackControl = {
		play: function() {
			audio.play();
		},
		pause: function() {
			innerFunction.changeIcon("play");
			audio.pause();
		},
		forward: function() {
			var index = audio.dataset.index;
			index = index >= musicArry.length - 1 ? 0 : index + 1;
			initPlayer(index);
			audio.src = audio.dataset.musicsrc;
			innerFunction.changeSongInfo();
			innerFunction.changeCover();
			audio.play();
			setInterval(function() {
				innerFunction.changeTime();
				innerFunction.progressBar();
			}, 500);

		},
		backward: function() {
			var index = audio.dataset.index;
			index = index <= 0 ? musicArry.length - 1 : index - 1;
			initPlayer(index);
			audio.src = audio.dataset.musicsrc;
			innerFunction.changeSongInfo();
			innerFunction.changeCover();
			audio.play();
			setInterval(function() {
				innerFunction.changeTime();
				innerFunction.progressBar();
			}, 500);

		},
		fastForward: function() {
			var songTime = audio.duration;
			var currentTime = audio.currentTime;
			if(currentTime < songTime) {
				audio.currentTime = currentTime + 1;
			}

		},
		randomPlay: function() {
			audio.loop = true;
		}

	};
	//绑定点击事件
	$("#random").click(function() {
		innerFunction.changeIcon("random");
		playbackControl.randomPlay();
	});
	$(".fa-volume-up").click(function(event) {
		extraFunction.valumeControl(event);
	});
	$("#like").click(function() {
		innerFunction.changeIcon("like");
		extraFunction.collectMusic();
	});
	$(".fa-download").click(function(event) {
		extraFunction.musicDownload(event);
	});
	$(".fast-forward").click(function() {
		playbackControl.fastForward();
	});
	$(".backward").click(function() {
		playbackControl.backward();
	});
	$(".play").click(function() {
		innerFunction.changeIcon("play");
		playbackControl.play();
	});
	$(".forward").click(function() {
		playbackControl.forward();
	});
	$(".upload").click(function() {
		extraFunction.addLocationFiles();
	});

})