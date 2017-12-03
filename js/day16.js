advent.day16 = advent.Day.extend({
	part : 1,

	solve : function () {
		this.answer(1, this.solvePart(1));
		this.answer(2, this.solvePart(2));
	},

	solvePart : function (part) {
		if (part == 1) {
			var length = 272;
		} else {
			var length = 35651584;
		}
		var a = this.input;

		while (a.length < length) {
			var b = a.split("").reverse();
			var c = "";
			_.forEach(b, function (cha) {
				c += (cha == "0" ? "1" : 0);
			})
			a = a + "0" + c;
		}

		a = a.slice(0, length);

		console.log(a.length);

		while (a.length % 2 == 0) {
			console.log(a.length);
			var sum = [];
			for (var i = 0; i < a.length; i += 2) {
				if (a.charAt(i) == a.charAt(i + 1)) {
					sum.push("1");
				} else {
					sum.push("0");
				}
			}
			a = sum.join("");
		}

		return a;
	}


});