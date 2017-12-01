$(function() {
	var InnerFunction = {
		changeSongInfo: function(singer, songName) {
			singer = singer ? singer : "佚名";
			songName = songName ? songName : "无名曲";
			$("#singer").text(singer);
			$("#song-name").text(songName);
		},
		changeCover: function() {
			$(".cover>img").attr({
				"src": url
			});
		},
		progressBar: function(currentTime, endTime) {
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
			if(flag === 0) {
				$("#play").hasClass("fa-play") ? $("#play").removeClass("fa-play").addClass("fa-pause") :
					$("#play").removeClass("fa-pause").addClass("fa-play");
			} else if(flag === 1) {
				$("#like").hasClass("fa-heart-o") ? $("#like").removeClass("fa-heart-o").addClass(
						"fa-heart") :
					$("#like").removeClass("fa-heart").addClass("fa-heart-o");

			} else if(flag === 2) {
				$("#random").hasClass("fa-random") ? $("#random").removeClass("fa-random").addClass(
						"fa-refresh") :
					$("#random").removeClass("fa-refresh").addClass("fa-random");
			}

		}

	};

	//调试方法
	(function() {

	})();

})