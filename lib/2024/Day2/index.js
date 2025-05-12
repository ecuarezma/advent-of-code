import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");

const reports = data.split("\n").map((row) => row.split(/\s+/));
let safeReports = 0;

const levelChecks = (report) => {
  const ascending = report.every((num, idx, arr) => {
    if (idx === 0) return true;
    return num > arr[idx - 1] && Math.abs(arr[idx - 1] - num) <= 3;
  });
  const descending = report.every((num, idx, arr) => {
    if (idx === 0) return true;
    return num < arr[idx - 1] && Math.abs(arr[idx - 1] - num) <= 3;
  });
  return ascending || descending;
};

for (let report of reports) {
  report = report.map(Number);
  if (levelChecks(report)) {
    safeReports++;
  }
}
console.log(`${safeReports} reports are safe!`);
