advent.day24 = advent.Day.extend({
	shortest : null,
	map : null,
	stops : null,
	best : 100000000,
	dirs : null,
	mins : null,

	bestPath : 100000000,

	solve : function () {
		this.shortest = {};
		this.stops = {};
		var letters = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
		];
		this.dirs = [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		];

		var lines = this.input.split("\n");
		this.map = [];
		_.times(lines[0].length, function (x) {
			this.map[x] = [];
		}, this);
		_.forEach(lines, function (line, y) {
			for (var x = 0; x < line.length; x++) {
				var c = line.charAt(x);
				if (c != "." && c != "#") {
					this.stops[letters[parseInt(c)]] = [x, y];
				}
				this.map[x][y] = c;
			}
		}, this);

		this.answer(1, this.bestPath(1));
		this.answer(2, this.bestPath(2));
	},

	bestPath : function (part) {
		var paths = permutator([
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
		]);

		var best = 100000000;
		_.forEach(paths, function (path, i) {
			if (i % 1000 == 0) {
				// console.log("count", i);
			}
			if (part == 2) {
				path = ["a"].concat(path).concat(["a"]);
			} else {
				path = ["a"].concat(path);
			}
			dist = this.totalDist(path);
			if (dist < best) {
				best = dist;
			}
		}, this);

		return best;
	},

	totalDist : function (path) {
		var total = 0;
		for (var i = 0; i < path.length - 1; i++) {
			var a = path[i];
			var b = path[i + 1];
			if (!this.shortest[a + b]) {
				this.shortest[a + b] = this.distBetween(a, b);
			}
			total += this.shortest[a + b];
		}
		return total;
	},

	distBetween : function (a, b) {
		this.step(a, b, 0);
		return this.best;
	},

	step : function (a, b, steps, x, y, mins) {
		if (!mins) {
			mins = _.cloneDeep(this.map);
			var start = this.stops[a];
			x = start[0];
			y = start[1];
			this.best = 100000000;
		}
		if (mins[x][y] == "#") {
			return;
		}
		if (_.isNumber(mins[x][y]) && mins[x][y] <= steps) {
			return;
		}
		var end = this.stops[b];
		mins[x][y] = steps;
		if (x == end[0] && y == end[1]) {
			this.best = steps;
			return;
		}
		if (steps >= this.best - 1) {
			return;
		}
		_.forEach(this.dirs, function (dir) {
			this.step(a, b, steps + 1, x + dir[0], y + dir[1], mins);
		}, this);
	},





});

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}
