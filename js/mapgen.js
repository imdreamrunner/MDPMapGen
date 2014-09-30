(function() {
    var grids = [];

    var resetGrids = function() {
        for (var x = 0; x < 15; x ++) {
            var line = [];
            for (var y = 0; y < 20; y++) {
                line.push(0);
            }
            grids.push(line);
        }
    };

    var displayGrids = function() {
        var arena = document.getElementById("arena");
        arena.innerHTML = "";
        for (var y = 0; y < 20; y ++) {
            for (var x = 0; x < 15; x ++) {
                var grid = document.createElement("div");
                grid.className = grids[x][y] === 0 ? "grid" : "grid obstacle";
                grid.x = x;
                grid.y = y;
                grid.onclick = function() {
                    // console.log(this.x, this.y);
                    if (grids[this.x][this.y] === 1) {
                        grids[this.x][this.y] = 0;
                        this.className = "grid";
                    } else {
                        grids[this.x][this.y] = 1;
                        this.className = "grid obstacle";
                    }
                    outputForSimulator();
                };
                arena.appendChild(grid);
            }
        }
    };

    var outputForSimulator = function() {
        // console.log(grids);
        var outputString = "";
        for (var x = 0; x < 15; x++) {
            for (var y = 19; y >=0; y--) {
                outputString += grids[x][y];
            }
            outputString += "\n";
        }
        document.getElementById("simulator-string").value = outputString;
    };

    var onLoad = function () {
        // create grids
        resetGrids();
        displayGrids();

        var outputString = document.getElementById("simulator-string");
        var loadButton = document.getElementById("load");
        loadButton.onclick = function () {
            var lines = outputString.value.trim().split("\n");
            if (lines.length !== 15) {
                alert("Invalid map!");
                return;
            }
            for (var line in lines) {
                line = lines[line].trim();
                if (line.length !== 20) {
                    alert("Invalid map!");
                    return;
                }
            }
            for (var x = 0; x < 15; x ++) {
                for (var y = 0; y < 20; y ++) {
                    grids[x][y] = lines[x][19-y] == "1" ? 1 : 0;
                }
            }
            displayGrids();
        }

    };

    window.onload = onLoad;
}).call(window);