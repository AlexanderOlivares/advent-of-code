/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.8747 ms       |
  | Solution: 1831                           |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

const solvePuzzle = input => {
  let count = 0;
  // Cache bottom right/left neighbors known to be invalid to skip during iteration.
  // This overhead ended up hurting performance compared to solution 1
  const skipSet = new Set();
  const coordKey = (i, j) => i * input[0].length + j;

  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      if (skipSet.has(coordKey(i, j))) {
        continue;
      }
      const initialLetter = input[i][j];
      const bottomRight = input[i + 1][j + 1];
      const bottomLeft = input[i + 1][j - 1];
      if (initialLetter !== "A") {
        if ((initialLetter === "S" || initialLetter === "M") && bottomLeft !== "A") {
          skipSet.add(coordKey(i + 1, j - 1));
        }
        if ((initialLetter === "S" || initialLetter === "M") && bottomRight !== "A") {
          skipSet.add(coordKey(i + 1, j + 1));
        }
        continue;
      }
      const topLeft = input[i - 1][j - 1];
      const topRight = input[i - 1][j + 1];
      if (topLeft === bottomRight || topRight === bottomLeft) {
        continue;
      }
      if (topLeft === "M" && bottomRight === "S" && topRight === "M" && bottomLeft === "S") {
        count += 1;
        continue;
      }
      if (topLeft === "S" && bottomRight === "M" && topRight === "S" && bottomLeft === "M") {
        count += 1;
        continue;
      }
      if (topLeft === "S" && bottomRight === "M" && topRight === "M" && bottomLeft === "S") {
        count += 1;
        continue;
      }
      if (topLeft === "M" && bottomRight === "S" && topRight === "S" && bottomLeft === "M") {
        count += 1;
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
