import { performance } from "perf_hooks";

class Benchmark {
  constructor(runs = 500) {
    this.runs = runs;
    this.totalTime = 0;
  }

  async run(fn) {
    let totalTime = 0;

    for (let i = 0; i < this.runs; i++) {
      const start = performance.now();
      await fn();
      const end = performance.now();
      totalTime += end - start;
    }

    this.totalTime = totalTime;
    return this.averageTime();
  }

  averageTime() {
    return this.totalTime / this.runs;
  }

  log() {
    console.log(`Ran ${this.runs} iterations.`);
    console.log(`Average processing time: ${this.averageTime().toFixed(4)} ms`);
  }
}

export default Benchmark;
