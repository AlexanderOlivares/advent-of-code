/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.5164 ms       |
  | Solution: 2336                           |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

// if X or S then search around until an unexpected letter is found or boundary is hit
const forward = ["X", "M", "A", "S"];
const backward = ["S", "A", "M", "X"];

const lookBackSearch = (input, i, j) => {
  let xmasCount = 0;

  const initialLetter = input[i][j];

  if (!["X", "S"].includes(initialLetter)) {
    return xmasCount;
  }

  const wordToMatch = initialLetter === "X" ? forward : backward;

  if (i >= 3 || j >= 3) {
    let leftDiagOffset = 1;
    while (leftDiagOffset < 4) {
      if (i - leftDiagOffset < 0) break;
      const letter = input[i - leftDiagOffset][j - leftDiagOffset];
      if (letter !== wordToMatch[leftDiagOffset]) {
        break;
      }
      if (leftDiagOffset === 3) {
        xmasCount++;
      }
      leftDiagOffset++;
    }
  }

  if (i >= 3 || j <= 6) {
    let rightDiagOffset = 1;
    while (rightDiagOffset < 4) {
      if (i - rightDiagOffset < 0) break;
      const letter = input[i - rightDiagOffset][j + rightDiagOffset];
      if (letter !== wordToMatch[rightDiagOffset]) {
        break;
      }
      if (rightDiagOffset === 3) {
        xmasCount++;
      }
      rightDiagOffset++;
    }
  }

  if (i >= 3) {
    let verticalOffset = 1;
    while (verticalOffset < 4) {
      if (i - verticalOffset < 0) break;
      const letter = input[i - verticalOffset][j];
      if (letter !== wordToMatch[verticalOffset]) {
        break;
      }
      if (verticalOffset === 3) {
        xmasCount++;
      }
      verticalOffset++;
    }
  }

  if (j >= 3) {
    let horizontalOffset = 1;
    while (horizontalOffset < 4) {
      if (j - horizontalOffset < 0) break;
      const letter = input[i][j - horizontalOffset];
      if (letter !== wordToMatch[horizontalOffset]) {
        break;
      }
      if (horizontalOffset === 3) {
        xmasCount++;
      }
      horizontalOffset++;
    }
  }

  return xmasCount;
};

const solvePuzzle = input => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (i >= 3 || j >= 3) {
        count += lookBackSearch(input, i, j);
      }
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
