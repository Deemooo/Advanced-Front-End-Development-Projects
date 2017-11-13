$(function() {
	var lightingVoice = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var erroVoice = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var endVoice = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	$("#start").click(controls);

	function controls() {
		zoumadeng();
	}
	//走马灯
	function zoumadeng() {
		var dengFlag = Math.floor(Math.random() * 4);
		switch(dengFlag) {
			case 0:
				lighting(0);
				break;
			case 1:
				lighting(1);
				break;
			case 2:
				lighting(2);
				break;
			case 3:
				lighting(3);
				break;
			default:
				lighting(0);
		}
	}
	//亮灯
	function lighting(id) {
		$("#" + id).addClass("light");
	}
	//音效
	function voice(flag) {
		if(flag === 0) {
			lightingVoice.play();

		} else if(flag === 1) {
			erroVoice.play();

		} else if(flag === 2) {
			endVoice.play();
		}

	}
})