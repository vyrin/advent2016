advent.day22 = advent.Day.extend({
	best : 32,
	totalCount : 0,

	solve : function () {
		var lines = this.input.split("\n");
		var part = 2;

		var nodes = [];
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			var i = parts[0].split("-");
			var x = parseInt(i[0]);
			var y = parseInt(i[1]);
			if (part == 1) {
				nodes[parts[0]] = {used: parseInt(parts[2]), avail: parseInt(parts[3])};
			} else {
				if (!nodes[x]) {
					nodes[x] = [];
				}
				nodes[x][y] = {used: parseInt(parts[2]), avail: parseInt(parts[3]), x: x, y : y};
			}
		}, this);

		if (part == 1) {
			var pairs = [];
			_.forEach(nodes, function (node) {
				_.forEach(nodes, function (node2) {
					if (node != node2 && node.used > 0 && node2.avail >= node.used) {
						pairs.push([node, node2]);
					}
				});
			})

			this.answer(1, pairs.length);
		}

		var output = "";
		for (var y = 0; y < 30; y++) {
			output += "\n";
			for (var x = 0; x < 33; x++) {
				var node = nodes[x][y];
				if (node.used == 0) {
					output += "_";
				} else if (node.used > 100) {
					output += "#";
				} else if (node.used + node.avail < 70) {
					output += "*";
				} else {
					output += ".";
				}
			}
		}
		console.log(output);
		return;


		this.step(0, nodes, 32, 0);

		this.answer(2, this.best);
	},

	step : function (count, nodes, targetX, targetY) {
		this.totalCount++;
		if (this.totalCount % 1000 == 0) {
			console.log(this.totalCount, targetX, targetY);
		}
		if (targetX == 0 && targetY == 0) {
			this.best = count;
			console.log("Found solution: " + count);
			return;
		}
		if (count >= this.best - 1) {
			return;
		}
		var next = this.sortPairs(this.allTransfers(nodes));
		_.forEach(next, function (pair) {
			if (pair[1].x == targetX && pair[1].y == targetY) {
				// Don't copy data onto the target
				return;
			}
			var cloneNodes = _.cloneDeep(nodes);
			var clone1 = cloneNodes[pair[0].x][pair[0].y];
			var clone2 = cloneNodes[pair[1].x][pair[1].y];
			clone2.used += clone1.used;
			clone2.avail -= clone1.used;
			clone1.avail += clone1.used;
			clone1.used = 0;
			if (pair[0].x == targetX && pair[0].y == targetY) {
				var newTargetX = pair[1].x;
				var newTargetY = pair[1].y;
			} else {
				var newTargetX = targetX;
				var newTargetY = targetY;
			}
			this.step(count + 1, cloneNodes, newTargetX, newTargetY);
		}, this);
	},

	allTransfers : function (nodes) {
		var result = [];
		for (var x = 0; x < nodes.length; x++) {
			for (var y = 0; y < nodes[x].length; y++) {
				var node = nodes[x][y];
				var n = this.neighbors(node, nodes);
				if (n.length > 0) {
					_.forEach(n, function (node2) {
						result.push([node, node2]);
					});
				}
			}
		}

		return result;
	},

	neighbors : function (node, nodes) {
		var dirs = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];
		var result = [];
		_.forEach(dirs, function (dir) {
			if (nodes[node.x + dir[0]]) {
				var node2 = nodes[node.x + dir[0]][node.y + dir[1]];
				if (node2 && this.canTransfer(node, node2)) {
					result.push(node2);
				}
			}
		}, this);

		return result;
	},

	canTransfer : function (node1, node2) {
		return node2.avail >= node1.used;
	},

	sortPairs : function (pairs, targetX, targetY) {
		var result = [];

	}



});
