/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.5155 ms       |
  | Solution: 2031679                        |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

const solvePuzzle = input => {
  const leftList = [];
  const rightList = [];
  input.forEach(e => {
    const [left, right] = e.split("   ");
    leftList.push(left);
    rightList.push(right);
  });
  const sortedLeft = leftList.sort((a, b) => a - b);
  const sortedRight = rightList.sort((a, b) => a - b);
  let distance = 0;
  for (let i = 0; i < sortedLeft.length; i++) {
    distance += Math.abs(sortedLeft[i] - sortedRight[i]);
  }
  return distance;
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
