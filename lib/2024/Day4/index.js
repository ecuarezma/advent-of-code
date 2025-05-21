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
// ====== Part One ========

//count rows
for (const row of matrix) {
  matches = row.join("").matchAll(word);
  reverse = row.join("").matchAll(wordReversed);
  wordCount += [...matches].length + [...reverse].length;
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
  return row
    .map((_char, rowIdx) => {
      if (arr[rowIdx + idx]) return arr[rowIdx + idx][rowIdx];
    })
    .reverse();
});
const diagonalRowRL = matrixReversed.map((row, idx, arr) => {
  if (idx === 0) return [];
  return row
    .map((_char, rowIdx) => {
      const diagonal = arr[rowIdx][rowIdx + idx];
      return diagonal;
    })
    .reverse();
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

// ======= Part Two ==========
let xmasCount = 0;
const xMatch = (x, y) => {
  x = Number(x);
  y = Number(y);
  const cross1 = matrix[x - 1][y - 1] + matrix[x][y] + matrix[x + 1][y + 1];
  const cross2 = matrix[x + 1][y - 1] + matrix[x][y] + matrix[x - 1][y + 1];
  if (
    (cross1 === "MAS" || cross1 === "SAM") &&
    (cross2 === "MAS" || cross2 === "SAM")
  ) {
    xmasCount += 1;
  }
};

for (const idx in matrix) {
  if (idx == 0 || idx == matrix.length - 1) continue;
  for (const rowIdx in matrix[idx]) {
    if (rowIdx == 0 || rowIdx == matrix[idx].length - 1) continue;
    let char = matrix[idx][rowIdx];
    if (char === "A") xMatch(idx, rowIdx);
  }
}

console.log(`X-MAS appears ${xmasCount} times`);
