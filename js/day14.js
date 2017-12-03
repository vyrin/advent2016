advent.day14 = advent.Day.extend({
	part : 1,

	solve : function () {
		this.answer(1, this.solvePart(1));
		this.answer(2, this.solvePart(2));
	},

	solvePart : function (part) {
		var salt = this.input;

		var max = 100000;
		var keys = [];
		var threes = {};
		var potential = {};
		var hashes = {};
		for (var i = 0; i < max; i++) {
			var a = md5(salt + i);
			if (part == 2) {
				_.times(2016, function () {
					a = md5(a);
				});
			}
			hashes[i] = a;

			for (var q = 0; q < a.length - 2; q++) {
				var c = a.charAt(q);
				if (c == a.charAt(q + 1) && c == a.charAt(q + 2)) {
					if (!threes[i]) {
						threes[i] = [c];
					}
				}
				if (c == a.charAt(q + 1) && c == a.charAt(q + 2) && c == a.charAt(q + 3) && c == a.charAt(q + 4)) {
					for (var j = i - 1000; j < i; j++) {
						if (threes[j] && threes[j].indexOf(c) != -1) {
							keys.push(j);
							threes[j] = undefined;
							console.log("found: " + j + " (" + c + ")");
							if (keys.length == 64) {
								max = i + 1000;
							}
						}
					}
				}

			}
		}
		keys.sort(function (a, b) {
			return parseInt(a) < parseInt(b) ? -1 : 1;
		});
		return keys[63];
	}


});