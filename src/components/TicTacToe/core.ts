import { Player, CrossLinePositions, Winner } from "./types";

const gameDefault = {
  move: 0,
  playerMove: Player.x,
  cells: [null, null, null, null, null, null, null, null, null],
  winner: null,
};

const winningIndexes = [
  { indexes: [0, 1, 2], position: CrossLinePositions.ROW1 },
  { indexes: [3, 4, 5], position: CrossLinePositions.ROW2 },
  { indexes: [6, 7, 8], position: CrossLinePositions.ROW3 },
  { indexes: [0, 3, 6], position: CrossLinePositions.COL1 },
  { indexes: [1, 4, 7], position: CrossLinePositions.COL2 },
  { indexes: [2, 5, 8], position: CrossLinePositions.COL3 },
  { indexes: [0, 4, 8], position: CrossLinePositions.DIAG1 },
  { indexes: [2, 4, 6], position: CrossLinePositions.DIAG2 },
];

const controlKeyCodes = [
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyZ",
  "KeyX",
  "KeyC",
];

export default class TicTacToe {
  cells: Array<string | null>;
  winner: string | null;
  move: number;
  playerMove: string;
  crossLinePosition: string;

  constructor() {
    this.cells = [...gameDefault.cells];
    this.winner = gameDefault.winner;
    this.move = gameDefault.move;
    this.playerMove = gameDefault.playerMove;
    this.crossLinePosition = CrossLinePositions.DRAW;
  }

  determineWinner() {
    if (this.move < 4) return;

    for (const item of winningIndexes) {
      if (
        this.cells[item.indexes[0]] !== null &&
        this.cells[item.indexes[0]] === this.cells[item.indexes[1]] &&
        this.cells[item.indexes[0]] === this.cells[item.indexes[2]]
      ) {
        this.crossLinePosition = item.position;
        this.winner = this.playerMove;
        return;
      }
    }

    if (this.move === 8 && !this.winner) {
      this.crossLinePosition = CrossLinePositions.DRAW;
      this.winner = Winner.draw;
    }
  }

  makeMove(index: number) {
    this.cells[index] = this.playerMove;
    this.determineWinner();
    if (!this.winner) {
      this.playerMove = this.playerMove === Player.x ? Player.o : Player.x;
      ++this.move;
    }
  }

  onKeyDown(e: KeyboardEvent) {
    const indexOfKey = controlKeyCodes.indexOf(e?.code);
    if (indexOfKey !== -1 && this.cells[indexOfKey] === null && !this.winner) {
      this.makeMove(indexOfKey);
    }
  }

  resetGame() {
    this.playerMove = gameDefault.playerMove;
    this.cells = [...gameDefault.cells];
    this.move = gameDefault.move;
    this.winner = gameDefault.winner;
  }
}
