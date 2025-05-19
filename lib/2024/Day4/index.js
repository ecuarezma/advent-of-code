import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");
const matrix = data.split("\n").map((row) => [...row]);
const matrixReversed = data.split("\n").map((row) => [...row].reverse());
let wordCount = 0;

const word = "XMAS";
const wordReversed = word.split("").reverse().join("");

let matches, reverse;

let columns = matrix.map((row, idx, arr) => {
  return row.map((char, rowIdx) => arr[rowIdx][idx]);
});

//count rows
for (const row of matrix) {
  matches = row.join("").matchAll(word);
  reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
  row.forEach((char, idx) => columns[idx].push(char));
}

//count columns
for (const column of columns) {
  matches = column.join("").matchAll(word);
  reverse = column.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
}

//count diagonals
const diagonalsColumnLR = matrix.map((row, idx, arr) => {
  return row.map((_char, rowIdx) => {
    if (arr[rowIdx + idx]) return arr[rowIdx + idx][rowIdx];
  });
});
const diagonalRowLR = matrix.map((row, idx, arr) => {
  if (idx === 0) return [];
  return row.map((_char, rowIdx) => {
    const diagonal = arr[rowIdx][rowIdx + idx];
    return diagonal;
  });
});
//Right to left diagonals
const diagonalsColumnRL = matrixReversed.map((row, idx, arr) => {
  return row.map((_char, rowIdx) => {
    if (arr[rowIdx + idx]) return arr[rowIdx + idx][rowIdx];
  });
});
const diagonalRowRL = matrixReversed.map((row, idx, arr) => {
  if (idx === 0) return [];
  return row.map((_char, rowIdx) => {
    const diagonal = arr[rowIdx][rowIdx + idx];
    return diagonal;
  });
});
const diagonalsLR = [...diagonalsColumnLR, ...diagonalRowLR];
const diagonalsRL = [...diagonalsColumnRL, ...diagonalRowRL];

for (const row of diagonalsLR) {
  matches = row.join("").matchAll(word);
  reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
}
for (const row of diagonalsRL) {
  matches = row.join("").matchAll(word);
  reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
}
console.log(wordCount);
//need to match 18 instances of xmas in mockData
