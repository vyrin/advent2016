advent.day12 = advent.Day.extend({

	solve : function () {
		this.answer(1, this.solveWithRegs({
			a:0,
			b:0,
			c:0,
			d:0,
		}));

		this.answer(2, this.solveWithRegs({
			a:0,
			b:0,
			c:1,
			d:0,
		}));
	},

	solveWithRegs : function (regs) {
		var lines = this.input.split("\n");

		var pc = 0;

		var letters = ["a", "b", "c", "d"];

		var line = "";
		var count = 0;
		var limit = 100000000;
		while ((line = lines[pc]) && count < limit) {
			count++;
			var parts = line.split(" ");
			pc++;
			if (parts[0] == "cpy") {
				if (letters.indexOf(parts[1]) != -1) {
					regs[parts[2]] = regs[parts[1]];
				} else {
					regs[parts[2]] = parseInt(parts[1]);
				}
			} else if (parts[0] == "inc") {
				regs[parts[1]]++;
			} else if (parts[0] == "dec") {
				regs[parts[1]]--;
			} else if (parts[0] == "jnz") {
				if (regs[parts[1]] != 0) {
					pc--;
					pc += parseInt(parts[2]);
				}
			}
		}
		if (count < limit) {
			return regs.a;
		} else {
			return undefined;
		}
	},

});
