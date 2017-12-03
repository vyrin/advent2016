advent.day18 = advent.Day.extend({
	part : 1,

	solve : function () {
		this.answer(1, this.solvePart(1));
		this.answer(1, this.solvePart(2));
	},

	solvePart : function (part) {
		var lines = [];
		lines.push(this.input);
		var max = part == 1 ? 40 : 400000;
		for (var i = 0; i < max - 1; i++) {
			lines.push(this.newLine(lines[i]));
		}

		var count = 0;
		for (var i = 0; i < max; i++) {
			for (var j = 0; j < lines[i].length; j++) {
				if (lines[i].charAt(j) == ".") {
					count++;
				}
			}
		}

		return count;
	},

	newLine : function (line) {
		var output = "";
		for (var i = 0; i < line.length; i++) {
			var c1 = line.charAt(i - 1) || ".";
			var c2 = line.charAt(i);
			var c3 = line.charAt(i + 1) || ".";
			if (c1 == "^" && c2 == "^" && c3 == ".") {
				output += "^";
			} else if (c1 == "." && c2 == "^" && c3 == "^") {
				output += "^";
			} else if (c1 == "." && c2 == "." && c3 == "^") {
				output += "^";
			} else if (c1 == "^" && c2 == "." && c3 == ".") {
				output += "^";
			} else {
				output += ".";
			}
		}
		return output;
	}


});
