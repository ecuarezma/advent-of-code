import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");
const matrix = data.split("\n").map((row) => [...row]);
const matrixReversed = data.split("\n").map((row) => [...row].reverse());
let wordCount = 0;

const word = "XMAS";
const wordReversed = word.split("").reverse().join("");

const mockData = fs.readFileSync("mockInput.txt", "utf8");
const mockMatrix = mockData.split("\n").map((row) => [...row]);
const mockMatrixReversed = mockData
  .split("\n")
  .map((row) => [...row].reverse());

let columns = mockMatrix.map((row, idx, arr) => {
  return row.map((char, rowIdx) => arr[rowIdx][idx]);
});

//count rows
for (const row of mockMatrix) {
  const matches = row.join("").matchAll(word);
  const reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;

  row.forEach((char, idx) => columns[idx].push(char));
}

//count columns
for (const column of columns) {
  const matches = column.join("").matchAll(word);
  const reverse = column.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
}

//count diagonals
const diagonalsColumnLR = mockMatrix.map((row, idx, arr) => {
  return row.map((_char, rowIdx) => {
    if (arr[rowIdx + idx]) return arr[rowIdx + idx][rowIdx] || "";
  });
});
const diagonalRowLR = mockMatrix.map((row, idx, arr) => {
  if (idx === 0) return [];
  return row.map((_char, rowIdx) => {
    const diagonal = arr[rowIdx][rowIdx + idx];
    if (diagonal?.length >= 3) diagonal || "";
  });
});
//Right to left diagonals
const diagonalsColumnRL = mockMatrixReversed.map((row, idx, arr) => {
  return row.map((_char, rowIdx) => {
    if (arr[rowIdx + idx]) return arr[rowIdx + idx][rowIdx] || "";
  });
});
const diagonalRowRL = mockMatrixReversed.map((row, idx, arr) => {
  if (idx === 0) return [];
  return row.map((_char, rowIdx) => {
    const diagonal = arr[rowIdx][rowIdx + idx];
    if (diagonal?.length >= 3) diagonal || "";
  });
});

const diagonals = [
  ...diagonalsColumnRL,
  ...diagonalsColumnLR,
  ...diagonalRowRL,
  ...diagonalRowLR,
];
for (const row of diagonals) {
  const matches = row.join("").matchAll(word);
  const reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
}
console.log(wordCount);
//need to match 18 instances of xmas in mockData
