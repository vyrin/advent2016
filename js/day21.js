advent.day21 = advent.Day.extend({
	prev : null,

	solve1 : function () {
		this.prev = [];
		var lines = this.input.split("\n");

		var state = "abcdefgh".split("");

		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			if (parts[0] == "move") {

				var x = parseInt(parts[2]);
				var y = parseInt(parts[5]);

				if (x < y) {
					state = state.slice(0, x).concat(state.slice(x + 1, y + 1)).concat([state[x]]).concat(state.slice(y + 1));
				} else {
					state = state.slice(0, y).concat([state[x]]).concat(state.slice(y, x)).concat(state.slice(x + 1));
				}
			} else if (parts[0] == "swap") {
				if (parts[1] == "position") {
					var x = parseInt(parts[2]);
					var y = parseInt(parts[5]);
					var x0 = state[x];
					var y0 = state[y];
					state.splice(x, 1, y0);
					state.splice(y, 1, x0);
				} else if (parts[1] == "letter") {
					var x0 = parts[2];
					var y0 = parts[5];
					var x = state.indexOf(x0);
					var y = state.indexOf(y0);
					state.splice(x, 1, y0);
					state.splice(y, 1, x0);
				}

			} else if (parts[0] == "rotate") {
				if (parts[1] == "based") {
					var x = state.indexOf(parts[6]);
					if (x >= 4) {
						x += 2;
					} else {
						x += 1;
					}
					state = state.slice(state.length - x).concat(state.slice(0, state.length - x)); 
				} else if (parts[1] == "left") {
					var x = parseInt(parts[2]);
					state = state.slice(x).concat(state.slice(0, x)); 
				} else if (parts[1] == "right") {
					var x = parseInt(parts[2]);
					state = state.slice(state.length - x).concat(state.slice(0, state.length - x)); 
				}

			} else if (parts[0] == "reverse") {
				var x = parseInt(parts[2]);
				var y = parseInt(parts[4]);

				var foo = state.slice(x, y + 1);
				foo.reverse();

				state = state.slice(0, x).concat(foo).concat(state.slice(y + 1));

			}

			this.prev.push(state.join(""));


		}, this);

		this.answer(1, state.join(""));
	},

	solve : function () {
		this.solve1();

		var lines = this.input.split("\n");
		lines.reverse();

		var state = "fbgdceah".split("");

		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			if (parts[0] == "move") {

				var y = parseInt(parts[2]);
				var x = parseInt(parts[5]);

				if (x < y) {
					state = state.slice(0, x).concat(state.slice(x + 1, y + 1)).concat([state[x]]).concat(state.slice(y + 1));
				} else {
					state = state.slice(0, y).concat([state[x]]).concat(state.slice(y, x)).concat(state.slice(x + 1));
				}
			} else if (parts[0] == "swap") {
				if (parts[1] == "position") {
					var x = parseInt(parts[2]);
					var y = parseInt(parts[5]);
					var x0 = state[x];
					var y0 = state[y];
					state.splice(x, 1, y0);
					state.splice(y, 1, x0);
				} else if (parts[1] == "letter") {
					var x0 = parts[2];
					var y0 = parts[5];
					var x = state.indexOf(x0);
					var y = state.indexOf(y0);
					state.splice(x, 1, y0);
					state.splice(y, 1, x0);
				}

			} else if (parts[0] == "rotate") {
				if (parts[1] == "based") {
					var x = state.indexOf(parts[6]);

					var blah = [1, 3, 5, 7, 2, 4, 6, 0];
					var newX = blah.indexOf(x);

					x = ((x + 8) - newX) % 8;

					state = state.slice(x).concat(state.slice(0, x)); 
				} else if (parts[1] == "right") {
					var x = parseInt(parts[2]);
					state = state.slice(x).concat(state.slice(0, x)); 
				} else if (parts[1] == "left") {
					var x = parseInt(parts[2]);
					state = state.slice(state.length - x).concat(state.slice(0, state.length - x)); 
				}

			} else if (parts[0] == "reverse") {
				var x = parseInt(parts[2]);
				var y = parseInt(parts[4]);

				var foo = state.slice(x, y + 1);
				foo.reverse();

				state = state.slice(0, x).concat(foo).concat(state.slice(y + 1));

			}


		}, this);

		this.answer(2, state.join(""));
	},

});
