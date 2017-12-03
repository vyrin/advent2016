advent.day02 = advent.Day.extend({
	solve : function () {
		var code1 = this.solveForKeys([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		], 1, 1);

		var code2 = this.solveForKeys([
			[0, 0, 1, 0, 0],
			[0, 2, 3, 4, 0],
			[5, 6, 7, 8, 9],
			[0, "A", "B", "C", 0],
			[0, 0, "D", 0, 0],
		], 1, 1);

		this.answer(1, code1);
		this.answer(2, code2);
	},

	solveForKeys : function (keys, x, y) {
		var lines = this.input.split("\n");

		var code = "";

		_.forEach(lines, function (line) {
			for (var i = 0; i < line.length; i++) {
				var x0 = x;
				var y0 = y;
				var c = line.charAt(i);
				if (c == "U") {
					y0--;
				} else if (c == "D") {
					y0++;
				} else if (c == "R") {
					x0++;
				} else if (c == "L") {
					x0--;
				}
				if (keys[y0] && keys[y0][x0]) {
					x = x0;
					y = y0;
				}
			}
			code += keys[y][x];
		}, this);

		return code;
	}
});
