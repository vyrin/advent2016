advent.day04 = advent.Day.extend({
	solve : function () {
		var lines = this.input.split("\n");
		var sum = 0;

		var alpha = {
			a:0,
			b:1,
			c:2,
			d:3,
			e:4,
			f:5,
			g:6,
			h:7,
			i:8,
			j:9,
			k:10,
			l:11,
			m:12,
			n:13,
			o:14,
			p:15,
			q:16,
			r:17,
			s:18,
			t:19,
			u:20,
			v:21,
			w:22,
			x:23,
			y:24,
			z:25
		};
		var alpha2 = {
			0:"a",
			1:"b",
			2:"c",
			3:"d",
			4:"e",
			5:"f",
			6:"g",
			7:"h",
			8:"i",
			9:"j",
			10:"k",
			11:"l",
			12:"m",
			13:"n",
			14:"o",
			15:"p",
			16:"q",
			17:"r",
			18:"s",
			19:"t",
			20:"u",
			21:"v",
			22:"w",
			23:"x",
			24:"y",
			25:"z",
		};

		var validRooms = [];
		_.forEach(lines, function (line) {
			var p1 = line.split("[");
			var checksum = p1[1].slice(0, -1);
			var p2 = p1[0].split("-");
			var section = parseInt(p2.pop());
			var letters = {};
			_.forEach(p2, function (part) {
				for (var i = 0; i < part.length; i++) {
					var c = part.charAt(i);
					if (letters[c]) {
						letters[c]++;
					} else {
						letters[c] = 1;
					}
				}
			}, this);
			var l2 = [];
			_.forEach(letters, function (val, key) {
				l2.push({"letter":key, "count":val});
			});
			l2.sort(function (a, b) {
				if (a.count > b.count) {
					return -1;
				} else if (a.count < b.count) {
					return 1;
				} else {
					if (a.letter > b.letter) {
						return 1;
					} else {
						return -1;
					}
				}
			});
			var newSum = "";
			for (var i = 0; i < 5; i++) {
				newSum += l2[i].letter;
			}
			if (newSum == checksum) {
				sum += section;
				validRooms.push({"parts":p2, "section":section});
			}

		}, this);
		this.answer(1, sum);

		_.forEach(validRooms, function (room) {
			var phrase = [];
			_.forEach(room.parts, function (part) {
				var word = "";
				for (var i = 0; i < part.length; i++) {
					var c = part.charAt(i);
					var c0 = (alpha[c] + room.section) % 26;
					word += alpha2[c0];
				}
				phrase.push(word);
			}, this);
			var phraseString = phrase.join(" ");
			if (phraseString == "northpole object storage") {
				this.answer(2, room.section);
			}
		}, this);
	},
});
