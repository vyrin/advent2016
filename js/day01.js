advent.day01 = advent.Day.extend({
	solve : function () {
		var input = this.input;

		var dirs = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		];
		var dir = 0;

		var steps = input.split(", ");
		var loc = [0, 0];

		var visits = {"0,0":true};
		var solved2 = undefined;
		_.forEach(steps, function (step) {
			if (step.charAt(0) == "R") {
				dir = (dir + 1) % 4;
			} else if (step.charAt(0) == "L") {
				dir = (dir + 3) % 4;
			}
			var inc = dirs[dir];
			var dist = parseInt(step.slice(1));
			_.times(dist, function (i) {
				loc = [loc[0] + inc[0], loc[1] + inc[1]];

				var key = loc[0] + "," + loc[1];
				if (solved2 === undefined) {
					if (visits[key]) {
						var visit2dist = Math.abs(loc[0]) + Math.abs(loc[1]);
						solved2 = visit2dist;
					} else {
						visits[key] = true;
					}
				}
			}, this);

		}, this);

		var maxDist = Math.abs(loc[0]) + Math.abs(loc[1]);
		this.answer(1, maxDist);
		this.answer(2, solved2);
	},
});
