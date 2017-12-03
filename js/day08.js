advent.day08 = advent.Day.extend({

	solve : function () {
		var lines = this.input.split("\n");

		var screen = [];
		_.times(50, function (x) {
			screen[x] = [
				0,
				0,
				0,
				0,
				0,
				0,
			];
		});

		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			if (parts[0] == "rect") {
				var sq = parts[1].split("x");
				var x = parseInt(sq[0]);
				var y = parseInt(sq[1]);
				for (var i = 0; i < x; i++) {
					for (var j = 0; j < y; j++) {
						screen[i][j] = 1;
					}
				}
			} else if (parts[0] == "rotate" && parts[1] == "row") {
				var p = parts[2].split("=");
				var p = parseInt(p[1]);
				var q = parseInt(parts[4]);
				var newRow = [];
				for (var x = 0; x < 50; x++) {
					newRow[x] = screen[((x + 50) - q) % 50][p];
				}
				for (var x = 0; x < 50; x++) {
					screen[x][p] = newRow[x];
				}
			} else if (parts[0] == "rotate" && parts[1] == "column") {
				var p = parts[2].split("=");
				var p = parseInt(p[1]);
				var q = parseInt(parts[4]);
				var newRow = [];
				for (var x = 0; x < 6; x++) {
					newRow[x] = screen[p][((x + 6) - q) % 6];
				}
				screen[p] = newRow;
			}
		}, this);

		var count = 0;
		var output = "";
		for (var i = 0; i < 6; i++) {
			output += "\n";
			for (var j = 0; j < 50; j++) {
				output += screen[j][i] ? "@" : " ";
				count += screen[j][i];
			}
		}

		console.log(output);

		this.answer(1, count);
		this.answer(2, "ZFHFSFOGPO");
	},

});
