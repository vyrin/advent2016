advent.day06 = advent.Day.extend({
	part : 1,

	solve : function () {
		var lines = this.input.split("\n");

		var chars = [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		];

		_.forEach(lines, function (line) {
			for (var i = 0; i < 8; i++) {
				var c = line.charAt(i);
				if (chars[i][c] === undefined) {
					chars[i][c] = 1;
				} else {
					chars[i][c]++;
				}
			}
		}, this);

		var answer = "";
		var answer2 = "";
		for (var i = 0; i < 8; i++) {
			var max = 0;
			var l = "";
			var min = 1000000000;
			var l2 = "";
			_.forEach(chars[i], function (count, val) {
				if (count > max) {
					l = val;
					max = count;
				}
				if (count < min) {
					l2 = val;
					min = count;
				}
			}, this);
			answer += l;
			answer2 += l2;
		}

		this.answer(1, answer);
		this.answer(2, answer2);
	},


});
