$(function() {
	//定义游戏中需要用到的对象属性
	//游戏等级、方块颜色、游戏顺序数组、玩家顺序数组、方块颜色对应的音效
	var game = {
		level: 0,
		colorArr: ["#0", "#1", "#2", "#3"],
		currentGame: [],
		player: [],
		sound: {
			green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
			red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
			blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
			yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
		},
	}
	//开始一局新游戏，就是把所有属性重置还原
	function newGame() {
		resetStartValue(1);
		clearGame();
		addCount();
	}

	function clearGame() {
		game.currentGame = [];
		game.level = 0;
		$("#level").text(0);
	}
	//游戏等级自加后继续游戏
	function addCount() {
		game.level++;
		$("#level").text(game.level);

		generateMove();
	}
	//随机获取一个颜色，让它闪烁
	function generateMove() {
		game.currentGame.push(game.colorArr[Math.floor(Math.random() * 4)]);
		showMoves();
	}
	//按先后次序轮流闪烁游戏顺序数组中的所有颜色方块
	//全部闪烁完后，清空玩家顺序数组
	function showMoves() {
		var i = 0;
		var moves = setInterval(function() {
			playGame(game.currentGame[i]);
			i++;
			if(i >= game.currentGame.length) {
				clearInterval(moves);
			}
		}, 800);

		clearPlayer();
	}
	//闪烁方块动效及音效
	function playGame(block) {
		$(block).fadeOut(150).fadeIn(150);
		sound(block);
	}
	//播放音效函数
	function sound(block) {
		switch(block) {
			case "#1":
				game.sound.green.play();
				break;
			case "#2":
				game.sound.red.play();
				break;
			case "#3":
				game.sound.blue.play();
				break;
			case "#4":
				game.sound.yellow.play();
				break;
		}
	}
	//重置玩家顺序数组
	function clearPlayer() {
		game.player = [];
	}
	//点击任意方块时执行该函数
	//获取被点击方块的id后，播放音效，并把id放入玩家顺序数组后，开始判断是否与游戏顺序数组匹配
	function addToPlayer(id) {
		var block = "#" + id;
		sound(block);
		game.player.push(block);
		playerTurn();
	}
	//每点击一次方块，被点击的方块都会被记录在玩家顺序数组的尾部
	function playerTurn() {
		//判断每一次点击的方块，和游戏顺序数组内相对应的那个方块颜色是否一致，同则继续游戏，不同则重新开始游戏
		if(game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
			layer.alert('走错了,游戏结束!');
		} else {
			//让玩家点玩该点的次数之后，判断是否够20次
			var check = game.player.length === game.currentGame.length;
			if(check) {
				if(game.count === 20) {
					resetStartValue(0);
					layer.alert('恭喜你!完成挑战!');
				} else {
					//不够20次，则等级提升，继续游戏
					addCount();
				}
			}
		}
	}
	//单击色块事件
	$(".color-block").click(function() {
		var flag = $("#start").attr("flag");
		flag === "1" ? addToPlayer(this.id) : null;
	});
	//开始游戏
	$("#start").click(function() {
		if($("#level").text() === "0") {
			newGame();
		}
	});
	//重置游戏
	$("#reset").click(function() {
		resetStartValue(1);
		clearGame();
	});

	function resetStartValue(value) {
		$("#start").attr("flag", value);
	}

})