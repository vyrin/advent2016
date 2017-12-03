advent.day20 = advent.Day.extend({

	solve : function () {
		var lines = this.input.split("\n");
		var max = 4294967295;

		var ranges = [];
		_.forEach(lines, function (line) {
			var foo = line.split("-");
			ranges.push({min:parseInt(foo[0]), max:parseInt(foo[1])});
		});

		var lowest = 0;
		var min = undefined;
		var found = false;
		var count = 0;
		while (lowest <= max) {
			var nextVal = this.next(lowest, ranges);
			if (nextVal > lowest) {
				lowest = nextVal;
			} else {
				if (!min) {
					min = lowest;
				}
				lowest++;
				count++;
			}
		}
		this.answer(1, min);
		this.answer(2, count);
	},

	next : function (search, ranges) {
		var result = search;
		_.some(ranges, function (range) {
			if (search >= range.min && search <= range.max) {
				result = range.max + 1;
				return true;
			}
		});
		return result;
	},


});
