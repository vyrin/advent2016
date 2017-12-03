advent.day19 = advent.Day.extend({


	solve : function () {
		var max = this.input;

		var elves = [];
		_.times(max, function (foo) {
			elves.push({i:foo + 1});
		});
		_.times(max, function (foo) {
			elves[foo].n = elves[(foo + 1) % max];
		});

		var finished = false;
		var count = 0;
		var next = elves[0];
		while (count < max) {
			count++;
			if (count % 10000 == 0) {
				// console.log(count + " : " + elves.length);
			}
			next.n = next.n.n;
			next = next.n;
		}
		this.answer(1, next.i);

		this.solve2();
	},

	solve2 : function () {
		var max = this.input;

		var elves = [];
		_.times(max, function (foo) {
			elves.push({i:foo + 1});
		});
		_.times(max, function (foo) {
			elves[foo].n = elves[(foo + 1) % max];
		});

		var finished = false;
		var count = 0;
		var next = elves[Math.floor(max / 2) - 1];
		while (count < max) {
			count++;
			if (count % 10000 == 0) {
				// console.log(count + " : " + elves.length);
			}
			next.n = next.n.n;
			if (count % 2) {
				next = next.n;
			}
		}
		this.answer(2, next.i);
	},



});
