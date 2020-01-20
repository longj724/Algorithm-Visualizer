var stateCodes = {
  1: "WA",
  2: "OR",
  3: "CA",
  4: "AZ",
  5: "NV",
  6: "UT",
  7: "ID",
  8: "MT",
  9: "WY",
  10: "CO",
  11: "NM",
  12: "TX",
  13: "OK",
  14: "KS",
  15: "NE",
  16: "SD",
  17: "ND",
  18: "MN",
  19: "IA",
  20: "MO",
  21: "AR",
  22: "LA",
  23: "WI",
  24: "MI",
  25: "IL",
  26: "IN",
  27: "OH",
  28: "KY",
  29: "TN",
  30: "MS",
  31: "AL",
  32: "GA",
  33: "FL",
  34: "SC",
  35: "NC",
  36: "VA",
  37: "WV",
  38: "PA",
  39: "NY",
  40: "VT",
  41: "NH",
  42: "ME",
  43: "MA",
  44: "RI",
  45: "CT",
  46: "NJ",
  47: "DE",
  48: "MD",
  49: "AK",
  50: "HI"
}

var statesAdjMatrix = [[-1], [2, 7],
    [1, 3, 5, 7],
    [2, 4, 5],
    [3, 5, 6, 11],
    [2, 3, 6, 7, 4],
    [4, 5, 7, 9, 10, 11],
    [1, 2, 5, 6, 8, 9],
    [7, 9, 16, 17],
    [6, 7, 8, 10, 15, 16],
    [6, 9, 11, 13, 14, 15],
    [4, 10, 12, 13],
    [11, 13, 21, 22],
    [10, 11, 12, 14, 20, 21],
    [10, 15, 20],
    [9, 10, 14, 16, 19],
    [8, 9, 15, 17, 18],
    [8, 16, 18],
    [16, 17, 19, 23],
    [15, 16, 18, 20, 23, 25],
    [13, 14, 15, 19, 21, 25, 28, 29],
    [13, 20, 22, 29, 30],
    [12, 21, 30],
    [18, 19, 24, 25],
    [23, 26, 27],
    [19, 20, 23, 26, 28],
    [24, 25, 27, 28],
    [24, 26, 28, 37, 38],
    [20, 25, 26, 27, 29, 36, 37],
    [20, 21, 28, 30, 31, 32, 35, 36],
    [21, 22, 29, 31],
    [29, 30, 32, 33],
    [29, 31, 33, 34, 35],
    [31, 32],
    [32, 35],
    [29, 32, 34, 36],
    [28, 29, 35, 37, 48],
    [27, 28, 36, 38, 48],
    [27, 37, 39, 46, 47, 48],
    [38, 40, 43, 45, 46],
    [39, 41, 43],
    [40, 42, 43],
    [41],
    [39, 40, 41, 44, 45],
    [43, 45],
    [39, 43, 44],
    [38, 39, 47],
    [38, 46, 48],
    [36, 37, 38, 47],
    [0],
    [0],
]

var statesGraph = [];

for (let i = 0; i < 51; ++i) {
    statesGraph.push([]);
    for (let j = 0; j < 51; ++j) {
        statesGraph[i].push(0);
    }
}

for (let i = 0; i < 51; ++i) {
    for (let j = 0; j < statesAdjMatrix[i].length; ++j) {
        statesGraph[i][statesAdjMatrix[i][j]] = 1;
    }
}

statesGraph[49][0] = 0;
statesGraph[50][0] = 0;

var vcolor = [];
vcolor.length = 51

var stateColors = {
  count: 0,
  colorList: []
};

function promising(index) {
  var j = 1;
  var works = true;

  while (j < index && works) {
      if (statesGraph[index  - 1][j] == 1 && vcolor[index - 1] == vcolor[j]) {
          works = false;
      }
      ++j
  }
  return works;
}

function coloring(startingIndex, numStates, numColors) {
    if (promising(startingIndex)) {
        if (startingIndex == numStates + 1) {
            throw "Solution found";
        } else {
            for (var color = 1; color <= numColors; ++color) {
                vcolor[startingIndex] = color;
                var state = stateCodes[startingIndex];
                stateColors.colorList.push({ state: state, color: color})
                stateColors.count += 1;
                coloring(startingIndex + 1, 50, 4);
            }
        }
    }
}

function fillColors() {
  for (var i = 0; i < stateColors.colorList.length; ++i) {
    setTimeout(function (index) {
      var stateDiv = document.getElementById(stateColors.colorList[index].state);
      var color = stateColors.colorList[index].color;
      if (color == 1) {
        stateDiv.style.fill = '#4D85BD'
      } else if (color == 2) {
        stateDiv.style.fill = '#7CAA2D'
      } else if (color == 3) {
        stateDiv.style.fill = '#F5E356'
      } else {
        stateDiv.style.fill = '#CB6318'
      }
    }, i * 400, i);
  }
}

function colorMap() {
  try {
    coloring(1, 50, 4);
  } catch (solution) {
    fillColors();
  }
}

function clearMap() {
  for (var i = 1; i < 51; ++i) {
    var stateDiv = document.getElementById(statesAdjMatrix[i]);
    stateDiv.style.fill = '#A9A9A9';
  }
}

var runBtn = document.getElementById('runAlgorithm');
var resetBtn = document.getElementById('resetMap');
runBtn.addEventListener('click', colorMap);
resetBtn.addEventListener('click', clearMap);
