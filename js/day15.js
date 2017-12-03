advent.day15 = advent.Day.extend({
	part : 1,

	solve : function () {
		this.answer(1, this.solvePart(1));
		this.answer(2, this.solvePart(2));
	},

	solvePart : function (part) {
		var discPositions = [
			13,
			17,
			19,
			7,
			5,
			3,
		];

		var discs = [
			10,
			15,
			17,
			1,
			0,
			1,
		];

		var numDiscs = 6;
		if (part == 2) {
			discPositions.push(11);
			discs.push(0);
			numDiscs++;
		}

		for (var i = 0; i < numDiscs; i++) {
			discs[i] += 1 + i;
		}

		for (var i = 0; i < 10000000; i++) {
			var success = true;
			for (var j = 0; j < numDiscs; j++) {
				if (discs[j]) {
					success = false;
				}
			}
			if (success) {
				return i;
			}
			for (var j = 0; j < numDiscs; j++) {
				discs[j] = (discs[j] + 1) % discPositions[j];
			}
		}
	}


});