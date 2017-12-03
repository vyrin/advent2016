advent.day13 = advent.Day.extend({
	walls : null,
	minimum : 1000000000,
	count : 0,
	mins : null,

	solve : function () {
		var start = [1, 1];

		this.walls = [];
		this.mins = [];
		_.times(50, function (x) {
			this.walls[x] = [];
			this.mins[x] = [];
			_.times(50, function (y) {
				this.walls[x][y] = this.isWall(x, y);
				this.mins[x][y] = 1000000000;
			}, this);
		}, this);

		// this.printWalls(this.walls);

		this.step({}, start[0], start[1]);

		this.answer(1, this.minimum);

		var count2 = 0;
		_.times(50, function (x) {
			_.times(50, function (y) {
				if (this.mins[x][y] <= 50) {
					count2++;
				}
			}, this);
		}, this);
		this.answer(2, count2);

	},

	step : function (steps, x, y) {
		this.count++;
		if (this.count % 10000 == 0) {
			console.log("count: " + this.count)
		}
		if (this.count > 10000000) {
			return;
		}
		var len = _.keys(steps).length;
		if (x == 31 && y == 39) {
			if (len < this.minimum) {
				this.minimum = len;
				return;
			}
		}
		if (len >= this.mins[x][y]) {
			return;
		} else {
			this.mins[x][y] = len;
		}

		if (len < this.minimum - 1) {
			steps[x + "," + y] = true;

			var options = [
				[0, 1],
				[1, 0],
				[-1, 0],
				[0, -1],
			];
			_.forEach(options, function (option) {
				var x0 = x + option[0];
				var y0 = y + option[1];
				if (x0 < 0 || y0 < 0 || this.walls[x0] === undefined || this.walls[x0][y0] === undefined || this.walls[x0][y0]) {
					return;
				}
				if (steps[x0 + "," + y0]) {
					return;
				}
				var clone = _.clone(steps);
				this.step(clone, x0, y0);
			}, this);
		}

	},

	printWalls : function (walls) {
		var output = "";
		_.times(40, function (y) {
			_.times(40, function (x) {
				output += walls[x][y];
			});
			output += "\n";
		});
		console.log(output);
	},

	isWall : function (x, y) {
		var seed = 1350;
		var sum = x * x + 3 * x + 2 * x * y + y + y * y + seed;

		var bin = dec2bin(sum);
		var total = 0;
		for (var i = 0; i < bin.length; i++) {
			if (bin.charAt(i) == "1") {
				total++;
			}
		}
		return total % 2;
	},



});

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}
