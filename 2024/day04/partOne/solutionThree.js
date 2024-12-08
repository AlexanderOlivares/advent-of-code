/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.5177 ms       |
  | Solution: 2336                           |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

// if X or S then search around until an unexpected letter is found or boundary is hit
const forward = ["X", "M", "A", "S"];
const backward = ["S", "A", "M", "X"];

const isValidCoord = (i, j, n, m) => i >= 0 && i < n && j >= 0 && j < m;

const searchInDirection = (input, i, j, wordToMatch, dirX, dirY) => {
  let k = 1; // Start after the first letter
  while (k < wordToMatch.length) {
    const newI = i + k * dirX;
    const newJ = j + k * dirY;
    if (
      !isValidCoord(newI, newJ, input.length, input[0].length) ||
      input[newI][newJ] !== wordToMatch[k]
    ) {
      return false;
    }
    k++;
  }
  return true;
};

const spotlightSearch = (input, i, j) => {
  const initialLetter = input[i][j];
  if (!["X", "S"].includes(initialLetter)) return 0;

  const wordToMatch = initialLetter === "X" ? forward : backward;
  let xmasCount = 0;

  const directions = [
    { dirX: 0, dirY: 1 }, // horizontal right
    { dirX: 1, dirY: 0 }, // vertical down
    { dirX: 1, dirY: 1 }, // diagonal down-right
    { dirX: -1, dirY: 1 }, // diagonal up-left
  ];

  for (const { dirX, dirY } of directions) {
    if (searchInDirection(input, i, j, wordToMatch, dirX, dirY)) {
      xmasCount++;
    }
  }

  return xmasCount;
};

const solvePuzzle = input => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      count += spotlightSearch(input, i, j);
    }
  }
  return count;
};

async function benchmarkSolution() {
  try {
    const inputFile = process.env.INPUT_FILE;
    const inputFilePath = path.resolve(`../${inputFile}`);

    const inputLoader = new InputLoader(inputFilePath);
    await inputLoader.load();
    const input = inputLoader.as2DArray();

    const benchmark = new Benchmark(10000);
    await benchmark.run(async () => solvePuzzle(input));
    benchmark.log();

    console.log("Solution:", solvePuzzle(input));
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

benchmarkSolution();
