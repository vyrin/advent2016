advent.day10 = advent.Day.extend({

	solve : function () {
		var lines = this.input.split("\n");
		var bots = {};
		var outputs = {};

		// Assign values
		for (var i = 0; i < 100; i++) {
			var newLines = [];
			_.forEach(lines, function (line) {
				var parts = line.split(" ");
				if (parts[0] == "value") {
					var val = parseInt(parts[1]);
					var bot = parseInt(parts[5]);
					if (bots[bot]) {
						bots[bot].push(val);
					} else {
						bots[bot] = [val];
					}
				} else if (parts[0] == "bot") {
					var bot = parseInt(parts[1]);
					var lowType = parts[5];
					var low = parseInt(parts[6]);
					var highType = parts[10];
					var high = parseInt(parts[11]);
					if (bots[bot] && bots[bot].length >= 2) {
						var highVal = _.max(bots[bot]);
						var lowVal = _.min(bots[bot]);
						if (highVal == 61 && lowVal == 17) {
							this.answer(1, bot);
						}
						bots[bot] = [];
						if (highType == "output") {
							if (outputs[high]) {
								outputs[high].push(highVal);
							} else {
								outputs[high] = [highVal];
							}
						} else {
							if (bots[high]) {
								bots[high].push(highVal);
							} else {
								bots[high] = [highVal];
							}
						}
						if (lowType == "output") {
							if (outputs[low]) {
								outputs[low].push(lowVal);
							} else {
								outputs[low] = [lowVal];
							}
						} else {
							if (bots[low]) {
								bots[low].push(lowVal);
							} else {
								bots[low] = [lowVal];
							}
						}
					} else {
						newLines.push(line);
					}
				}
			}, this);
			lines = newLines;
			if (lines.length == 0) {
				break;
			}
		}

		this.answer(2, outputs[0] * outputs[1] * outputs[2]);

	},

});
