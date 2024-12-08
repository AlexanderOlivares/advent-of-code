/*
  +------------------------------------------+
  |           BENCHMARK RESULTS              |
  +------------------------------------------+
  | Ran 10000 iterations.                    |
  | Average processing time: 0.5665 ms       |
  | Solution: 2031679                        |
  +------------------------------------------+
*/

import path from "path";
import InputLoader from "../../../utils/inputParser.js";
import Benchmark from "../../../utils/Benchmark.js";

const solvePuzzle = input => {
  const leftList = [];
  const rightList = [];

  // sort as we separate the input
  const binarySearchInsert = (arr, value) => {
    let low = 0,
      high = arr.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] < value) low = mid + 1;
      else high = mid;
    }

    arr.splice(low, 0, value);
  };

  input.forEach(e => {
    const [left, right] = e.split("   ");
    binarySearchInsert(leftList, left);
    binarySearchInsert(rightList, right);
  });

  let distance = 0;
  for (let i = 0; i < leftList.length; i++) {
    distance += Math.abs(leftList[i] - rightList[i]);
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
