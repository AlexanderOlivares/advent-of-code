/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.2365 ms       |
  | Solution: 19678534                       |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

const solvePuzzle = input => {
  const leftList = [];
  const rightMap = new Map();
  input.forEach(e => {
    const [left, right] = e.split("   ");
    leftList.push(left);
    rightMap.set(right, rightMap.get(right) + 1 || 1);
  });
  let similarityScore = 0;
  for (let i = 0; i < leftList.length; i++) {
    similarityScore += leftList[i] * rightMap.get(leftList[i]) || 0;
  }
  return similarityScore;
};

async function benchmarkSolution() {
  try {
    const inputFile = process.env.INPUT_FILE;
    const inputFilePath = path.resolve(`../${inputFile}`);

    const inputLoader = new InputLoader(inputFilePath);
    await inputLoader.load();
    const input = inputLoader.asLines();

    const benchmark = new Benchmark(10000);
    await benchmark.run(async () => solvePuzzle(input));
    benchmark.log();

    console.log("Solution:", solvePuzzle(input));
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

benchmarkSolution();
