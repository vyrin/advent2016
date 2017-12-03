advent.day25 = advent.Day.extend({
	part : 1,
	targetX : null,
	targetY : null,
	startCode : null,

	solve : function () {
		var i = 0;
		while (true) {
			var result = this.solveWithRegs({
				a:i,
				b:0,
				c:0,
				d:0,
			});
			if (result) {
				this.answer(1, i);
				break;
			}
			i++;
		}
		this.answer(2, "All the stars!");
	},

	solveWithRegs : function (regs) {
		var lines = this.input.split("\n");

		var pc = 0;

		var letters = ["a", "b", "c", "d"];

		var line = "";
		var count = 0;
		var limit = 100000000;
		var output = 1;
		var failed = false;
		var limit = 100000;
		while ((line = lines[pc]) && count < limit) {
			// console.log(pc);
			count++;
			if (count % 100000 == 0) {
				// console.log("count: " + count);
			}
			var parts = line.split(" ");
			pc++;
			if (parts[0] == "cpy") {
				if (letters.indexOf(parts[2]) != -1) {
					if (letters.indexOf(parts[1]) != -1) {
						regs[parts[2]] = regs[parts[1]];
					} else {
						regs[parts[2]] = parseInt(parts[1]);
					}
				}
			} else if (parts[0] == "inc") {
				regs[parts[1]]++;
			} else if (parts[0] == "dec") {
				regs[parts[1]]--;
			} else if (parts[0] == "foo") {
				regs["a"] = regs["a"] * regs["b"];
				regs["c"] = 0;
				regs["d"] = 0;
			} else if (parts[0] == "jnz") {
				if ((letters.indexOf(parts[1]) != -1 && regs[parts[1]] != 0) || (letters.indexOf(parts[1]) == -1 && parseInt(parts[1]) != 0)) {
					pc--;
					if (letters.indexOf(parts[2]) != -1) {
						var inc = regs[parts[2]];
					} else {
						var inc = parseInt(parts[2]);
					}
					pc += inc;
				}
			} else if (parts[0] == "tgl") {
				var x = regs[parts[1]];
				var line2 = lines[(pc - 1) + x];
				console.log("tgl", (pc - 1) + x, line2);
				if (line2) {
					var parts2 = line2.split(" ");
					if (parts2[0] == "inc") {
						parts2[0] = "dec";
					} else if (parts2[0] == "dec") {
						parts2[0] = "inc";
					} else if (parts2[0] == "cpy") {
						parts2[0] = "jnz";
					} else if (parts2[0] == "jnz") {
						parts2[0] = "cpy";
					} else if (parts2[0] == "tgl") {
						parts2[0] = "inc";
					}
					lines[(pc - 1) + x] = parts2.join(" ");
				}
			} else if (parts[0] == "out") {
				if (letters.indexOf(parts[1]) != -1) {
					var x = regs[parts[1]];
				} else {
					var x = parseInt(parts[1]);
				}
				if (output == 0 && x != 1) {
					failed = true;
					break;
				} else if (output == 1 && x != 0) {
					failed = true;
					break;
				}
				output = x;
			}
		}

		if (count < limit) {
			return false;
		} else {
			return true;
		}
	},


});
