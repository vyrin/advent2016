advent.day05 = advent.Day.extend({
	solve : function () {
		var seed = this.input;
		var answer1 = "";
		var answer2 = [];
		var salt = 0;
		var allDone = false;
		for (var i = 0; i < 100; i++) {
			for (var j = 0; j < 10000000; j++) {
				salt++;
				var md = md5(seed + salt);
				if (j % 1000000 == 0) {
					console.log(i + ", " + j);
				}
				if (md.slice(0, 5) == "00000") {
					console.log("found: " + md);
					var c = md.charAt(5);
					answer1 += c;
					if (answer1.length == 8) {
						this.answer(1, answer1);
					}
					if ("01234567".indexOf(c) != -1) {
						var index = parseInt(c);
						if (answer2[index] === undefined) {
							answer2[index] = md.charAt(6);
							console.log("answer2: " + answer2);
							var finished = true;
							for (var q = 0; q < 8; q++) {
								if (answer2[q] === undefined) {
									finished = false;
									break;
								}
							}
							if (finished) {
								this.answer(2, answer2.join(""));
								allDone = true;
								break;
							}
						}
					}
					break;
				}
			}
			if (allDone) {
				break;
			}
		}
	}
});
