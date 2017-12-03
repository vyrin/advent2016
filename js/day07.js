advent.day07 = advent.Day.extend({
	part : 1,

	solve : function () {
		var lines = this.input.split("\n");

		var validLines = [];
		_.forEach(lines, function (line) {
			var bracket = false;
			var valid = false;
			var voided = false;
			for (var i = 0; i < line.length - 4; i++) {
				var a = line.charAt(i);
				var b = line.charAt(i + 1);
				if (!bracket && a == "[") {
					bracket = true;
					continue;
				} else if (bracket && a == "]") {
					bracket = false;
					continue;
				} else if (line.charAt(i + 2) == b && line.charAt(i + 3) == a) {
					if (bracket) {
						voided = true;
					} else {
						valid = true;
					}
				}
			}
			if (valid && !voided) {
				validLines.push(line);
			}
		}, this);

		this.answer(1, validLines.length);

		var validLines = [];
		_.forEach(lines, function (line) {
			var valid = false;
			var bracket = false;
			var abas = {};
			var babs = {};
			for (var i = 0; i < line.length - 2; i++) {
				var a = line.charAt(i);
				var b = line.charAt(i + 1);
				if (!bracket && a == "[") {
					bracket = true;
					continue;
				} else if (bracket && a == "]") {
					bracket = false;
					continue;
				} else if (line.charAt(i + 2) == a && a != b) {
					if (bracket) {
						babs["" + b + a + b] = true;
					} else {
						abas["" + a + b + a] = true;
					}
				}
			}
			var keys1 = _.keys(abas);
			var keys2 = _.keys(babs);
			_.forEach(keys1, function (key1) {
				if (keys2.indexOf(key1) != -1) {
					valid = true
				}
			}, this);

			if (valid) {
				validLines.push(line);
			}
		}, this);

		this.answer(2, validLines.length);


	},

});
