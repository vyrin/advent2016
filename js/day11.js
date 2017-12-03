String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

advent.day11 = advent.Day.extend({

	visited : null,
	minimum : 100000,
	total : 0,

	solve : function () {
		this.visited = {};
		var floors = [];
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(",");
			var floor = {gens:[], chips:[]};
			_.forEach(parts, function (item) {
				if (item.length == 0) {
					return;
				}
				if (item.charAt(1) == "G") {
					floor.gens.push(item.charAt(0));
				} else {
					floor.chips.push(item.charAt(0));
				}
			});
			floors.push(floor);
		});

		this.iter(floors, 0, 0);
		this.answer(1, this.minimum);

		// Independently run the algorithm with two pairs on the 1st floor, one pair on the 4th floor, and the elevator on the 4th floor
		// Find out that it requires 24 additional steps to deal with those two new pairs on the 1st floor
		this.answer(2, this.minimum + 24);
	},

	iter : function (floors, e, count) {
		this.total++;
		if (this.total % 100000 == 0) {
			console.log("total: " + this.total);
		}
		if (count > 65 || count >= this.minimum) {
			return;
		}
		var pretty = this.printFloors(floors, e);
		if (this.visited[pretty] !== undefined && this.visited[pretty] <= count) {
			return false;
		}
		this.visited[pretty] = count;
		// console.log(this.printFloors(floors, e));
		// this.printFloors(floors, e, count);
		if (!this.allValid(floors)) {
			// console.log("NOT VALID");
			return false;
		} else if (e == 3 && this.allFinished(floors)) {
			if (count < this.minimum) {
				console.log("SUCCESS: " + count);
				console.log(this.printFloors(floors, e));
				this.minimum = count;
			}
			return false;
		} else {
			var floor = floors[e];
			if (e == 0) {
				var newEOptions = [1];
			} else if (e == 3) {
				var newEOptions = [2];
			} else if (e == 1 && floors[0].chips.length == 0 && floors[0].gens.length == 0) {
				if (!this.blah) {
					console.log("reduce1: " + count);
					this.blah = true;
				}
				var newEOptions = [2];
			} else if (e == 2 && floors[1].chips.length == 0 && floors[1].gens.length == 0 && floors[0].chips.length == 0 && floors[0].gens.length == 0) {
				if (!this.blah) {
					console.log("reduce2: " + count);
					this.blah = true;
				}
				var newEOptions = [3];
			} else {
				var newEOptions = [e + 1, e - 1];
			}
			var otherOptions = [];
			_.forEach(floor.chips, function (chip) {
				otherOptions.push([chip, true]);
			})
			_.forEach(floor.gens, function (gen) {
				otherOptions.push([gen, false]);
			})
			otherOptions = _.shuffle(otherOptions);
			_.forEach(newEOptions, function (newE) {
				_.forEach(otherOptions, function (o1all, i1) {
					for (var i2 = i1; i2 < otherOptions.length; i2++) {
						var o2 = otherOptions[i2][0];
						var clone = _.cloneDeep(floors);
						var isChip1 = o1all[1];
						var o1 = o1all[0];
						var isChip2 = otherOptions[i2][1];
						if (isChip2 != isChip1 && o1 != o2) {
							continue;
						}
						if (isChip1) {
							clone[newE].chips.push(o1);
						} else {
							clone[newE].gens.push(o1);
						}
						if (i2 != i1) {
							if (isChip2) {
								clone[newE].chips.push(o2);
							} else {
								clone[newE].gens.push(o2);
							}
						}
						_.remove(clone[e].chips, function (c) { return (c == o1 && isChip1) || (c == o2 && isChip2); });
						_.remove(clone[e].gens, function (c) { return (c == o1 && !isChip1) || (c == o2 && !isChip2); });
						this.iter(clone, newE, count + 1);
					}
				}, this);
			}, this);
		}
	},

	allValid : function (floors) {
		var valid = true;
		_.some(floors, function (floor) {
			if (!this.floorValid(floor)) {
				valid = false;
				return true;
			}
		}, this);
		return valid;
	},

	floorValid : function (floor) {
		var gens = [];
		var chips = [];
		var valid = true;
		if (floor.gens.length > 0) {
			_.some(floor.chips, function (chip) {
				if (floor.gens.indexOf(chip) == -1) {
					valid = false;
					return true;
				}
			})
		}
		return valid;
	},

	allFinished : function (floors) {
		var threshold = 5;
		if (floors[3].gens.length >= threshold && floors[3].chips.length >= threshold) {
			return true;
		} else {
			return false;
		}
	},

	printFloors : function (floors, e, count) {
		var output = "";
		_.forEach(floors, function (floor, i) {
			if (e == i) {
				output += "E ";
			} else {
				output += "  ";
			}
			floor.chips.sort();
			floor.gens.sort();
			paired = 0;
			output += "C: ";
			_.forEach(floor.chips, function (chip) {
				if (floor.gens.indexOf(chip) == -1) {
					output += chip;
				} else {
					paired++;
				}
			})
			output += "  G: ";
			_.forEach(floor.gens, function (gen) {
				if (floor.chips.indexOf(gen) == -1) {
					output += gen;
				}
			})
			output += "  P: " + paired;
			output += "\n"

		})
		return output;
	}


});
