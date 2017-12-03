advent.day03 = advent.Day.extend({
	solve : function () {
		var lines = this.input.split("\n");
		var data = [];
		_.forEach(lines, function (line) {
			var parts = line.split(/\s+/);
			if (parts[0] == "") {
				parts = parts.slice(1);
			}
			parts = parts.map(function (v) { return parseInt(v); });
			data.push(parts);
		}, this);

		var count = 0;
		_.forEach(data, function (parts) {
			if (this.isValid(parts)) {
				count++;
			}
		}, this);
		this.answer(1, count);

		var count = 0;
		for (var r = 0; r < data.length; r += 3) {
			for (var x = 0; x < 3; x++) {
				var parts = [data[r][x], data[r + 1][x], data[r + 2][x]];
				if (this.isValid(parts)) {
					count++;
				}
			}
		}
		this.answer(2, count);

	},

	isValid : function(parts) {
		var p01 = parts[0] + parts[1];
		var p12 = parts[1] + parts[2];
		var p20 = parts[2] + parts[0];
		if (p01 > parts[2] && p12 > parts[0] && p20 > parts[1]) {
			return true;
		} else {
			return false;
		}
	}
});
