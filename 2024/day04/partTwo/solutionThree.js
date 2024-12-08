/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.1706 ms       |
  | Solution: 1831                           |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

const diagonalSpotlightSearch = (input, i, j) => {
  const initialLetter = input[i][j];
  if (initialLetter !== "A") {
    return 0;
  }
  const topLeft = input[i - 1][j - 1];
  const bottomRight = input[i + 1][j + 1];
  const topRight = input[i - 1][j + 1];
  const bottomLeft = input[i + 1][j - 1];
  if (topLeft === bottomRight || topRight === bottomLeft) {
    return 0;
  }
  if (
    (topLeft === "M" && bottomRight === "S" && topRight === "M" && bottomLeft === "S") ||
    (topLeft === "S" && bottomRight === "M" && topRight === "S" && bottomLeft === "M") ||
    (topLeft === "S" && bottomRight === "M" && topRight === "M" && bottomLeft === "S") ||
    (topLeft === "M" && bottomRight === "S" && topRight === "S" && bottomLeft === "M")
  ) {
    return 1;
  }

  return 0;
};

const solvePuzzle = input => {
  const rows = input.length;
  const cols = input[0].length;
  let count = 0;
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      count += diagonalSpotlightSearch(input, i, j);
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