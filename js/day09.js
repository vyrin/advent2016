advent.day09 = advent.Day.extend({
	part : 1,

	solve : function () {
		var input = this.input;

		var output = "";
		var inMarker = false;
		var copying = false;
		var marker = "";
		var copyLength = 0;
		var copyContent = "";
		var copyTimes = 0;

		for (var i = 0; i < input.length; i++) {
			var c = input.charAt(i);
			if (copying) {
				copyContent += c;
				copyLength--;
				if (copyLength <= 0) {
					for (var j = 0; j < copyTimes; j++) {
						output += copyContent;
					}
					copying = false;
				}
			} else if (!inMarker) {
				if (c == "(") {
					inMarker = true;
					marker = "";
				} else {
					output += c;
				}
			} else if (inMarker) {
				if (c == ")") {
					inMarker = false;
					var parts = marker.split("x");
					copyLength = parseInt(parts[0]);
					copyTimes = parseInt(parts[1]);
					copying = true;
					copyContent = "";
				} else {
					marker += c;
				}
			}
		}

		this.answer(1, output.length);


		var input = this.input;

		var output = "";
		var outputCount = 0;
		var inMarker = false;
		var copying = false;
		var marker = "";
		var copyLength = 0;
		var copyContent = "";
		var copyTimes = 0;

		var q = 0;

		for (var i = 0; i < input.length; i++) {
			var c = input.charAt(i);
			if (copying) {
				copyContent += c;
				copyLength--;
				if (copyLength <= 0) {
					var newText = "";
					for (var j = 0; j < copyTimes; j++) {
						newText += copyContent;
					}
					newText += input.slice(i + 1);
					input = newText;
					i = -1;
					copying = false;
					if (q++ % 10000 == 0) {
						console.log("input: " + input.length + " (" + outputCount + ")");
					}
				}
			} else if (!inMarker) {
				if (c == "(") {
					inMarker = true;
					marker = "";
				} else {
					outputCount++;
				}
			} else if (inMarker) {
				if (c == ")") {
					inMarker = false;
					var parts = marker.split("x");
					copyLength = parseInt(parts[0]);
					copyTimes = parseInt(parts[1]);
					copying = true;
					copyContent = "";
				} else {
					marker += c;
				}
			}
		}

		this.answer(2, outputCount);

	},

});
