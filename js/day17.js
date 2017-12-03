advent.day17 = advent.Day.extend({
	maxX : 3,
	maxY : 3,
	min : 1000000,
	max : 0,
	dirs : null,
	offsets : null,
	best : "",
	bestMax : "",

	solve : function () {
		var seed = this.input;

		this.dirs = ["U", "D", "L", "R"];
		this.offsets = {
			U:[0, -1],
			D:[0, 1],
			R:[1, 0],
			L:[-1, 0],
		}

		this.step("", 0, 0);
		this.answer(1, this.best);

		this.step("", 0, 0, true);
		this.answer(2, this.max);

	},

	step : function (path, x, y, useMax) {
		if (!useMax && path.length >= this.min) {
			return;
		}
		if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) {
			return;
		}
		if (!useMax && x == this.maxX && y == this.maxY) {
			this.min = path.length;
			this.best = path;
			return;
		}
		if (useMax && path.length > this.max) {
			this.max = path.length;
		}
		if (useMax && x == this.maxX && y == this.maxY) {
			return;
		}
		var hash = md5(this.input + path);
		_.forEach(this.dirs, function (dir, i) {
			if ("bcdef".indexOf(hash.charAt(i)) != -1) {
				this.step(path + dir, x + this.offsets[dir][0], y + this.offsets[dir][1], useMax);
			}
		}, this);
	},


});
