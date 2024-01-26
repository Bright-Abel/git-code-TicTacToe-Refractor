let cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restartBtn');
let cellColor = document.querySelectorAll('#color');

// ========================= SCORE BOARD ======================
const scoreBoard = document.querySelectorAll('.scoreCount');
const changePlayerBtn = document.querySelector('.btn');
const inputOuterDiv = document.querySelector('.div');
const inputCont = document.querySelector('.inputCont');
const Oname = document.querySelector('#Oname');
const Xname = document.querySelector('#Xname');
const playerName1 = document.querySelector('.playerName1');
const playerName2 = document.querySelector('.playerName2');
const submitBtn = document.querySelector('.submitBtn');
let heightLength = false;

let xScoreCount = 0;
let oScoreCount = 0;
let drawCount = 0;

// CHANGING PLAYER NAME ONCLICK EVENT
changePlayerBtn.addEventListener('click', () => {
  changePlayerBtn.style.visibility = 'hidden';
  if (!heightLength) {
    let OuterDivHeight = inputOuterDiv.getBoundingClientRect().height;
    let inputContHeight = inputCont.getBoundingClientRect().height;
    if (OuterDivHeight == 0 && inputContHeight > 0) {
      inputOuterDiv.style.height = `${inputContHeight + 17}px`;
    } else {
      inputOuterDiv.style.height = '0';
    }
  }
  heightLength = true;
});

submitBtn.addEventListener('click', () => {
  changePlayerBtn.style.visibility = 'visible';
  let player1 = Xname.value;
  let player2 = Oname.value;

  if (player1 && player2) {
    playerName1.textContent = player1;
    playerName2.textContent = player2;
  } else if (player1 && !player2) {
    playerName1.textContent = player1;
    // playerName2.textContent = 'O player';
  } else if (!player1 && player2) {
    // playerName1.textContent = 'X player';
    playerName2.textContent = player2;
  } else {
    playerName1.textContent = 'X player';
    playerName2.textContent = 'O player';
  }

  if (heightLength) {
    inputOuterDiv.style.height = '0';
    Xname.value = '';
    Oname.value = '';
  }
  heightLength = false;
});
// Iterate through the score board
function scoreResult() {
  scoreBoard.forEach((board) => {
    let boardId = board.dataset.id;
    if (boardId == 'x') {
      board.textContent = xScoreCount;
      console.log(xScoreCount);
    } else if (boardId == 'o') {
      board.textContent = oScoreCount;
    } else {
      board.textContent = drawCount;
    }
  });
}

// ================ END OF SCORE BOARD ======================

const winCond = [
  // columns cell
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // rows cell
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal cell
  [0, 4, 8],
  [2, 4, 6],
];

let options = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let running = false;

startGame();

function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', activeCell);
  });
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function activeCell() {
  // fetching the cell index attr
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] != ' ' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (cell.textContent == 'X') {
    cell.style.color = 'red';
  } else {
    cell.style.color = '#f1f';
  }
}

function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';

  let text = (statusText.textContent = `${currentPlayer}'s turn`);
}

function checkWinner() {
  let winner = false;

  for (let i = 0; i < winCond.length; i++) {
    let condition = winCond[i];
    // console.log(condition.length)
    // console.log(condition)
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == ' ' || cellB == ' ' || cellC == ' ') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      winner = true;
      break;
    }
  }
  // console.log(currentPlayer)

  if (winner) {
    statusText.textContent = `${currentPlayer}'s wins`;
    if (currentPlayer === 'X') {
      xScoreCount++;
    } else {
      oScoreCount++;
    }
    running = false;
  } else if (!options.includes(' ')) {
    statusText.textContent = 'DRAW';
    drawCount++;
  } else {
    changePlayer();
  }
  scoreResult();
}

function restartGame() {
  currentPlayer = 'X';
  options = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
  startGame();
}
