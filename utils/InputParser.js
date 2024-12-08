import { promises as fs } from "fs";
import path from "path";

export default class InputLoader {
  constructor(fileName, baseDir = import.meta.url) {
    const currentDir = path.dirname(new URL(baseDir).pathname);
    this.filePath = path.resolve(currentDir, fileName);
    this.rawData = null;
  }

  async load() {
    try {
      this.rawData = await fs.readFile(this.filePath, "utf-8");
      // Return the instance for method chaining
      return this;
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  }

  _checkDataLoaded() {
    if (!this.rawData) throw new Error("Data not loaded. Call load() first.");
  }

  asLines() {
    this._checkDataLoaded();
    return this.rawData.split("\n").map(line => line.trim());
  }

  as2DArray() {
    this._checkDataLoaded();
    return this.rawData.split("\n").map(line => line.split(""));
  }

  asJSON() {
    this._checkDataLoaded();
    try {
      return JSON.parse(this.rawData);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      throw err;
    }
  }
}
