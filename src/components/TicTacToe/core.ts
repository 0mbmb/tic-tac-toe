import { Player, CrossLinePositions, Winner, Mark, Difficulty } from "./types";
import { getRandomNumber, getRandomFromEnum } from "./utils/utils";

const gameDefault = {
  cells: [null, null, null, null, null, null, null, null, null],
  winner: null,
  firstMove: 1,
  firstMark: Mark.X,
  crossLinePosition: CrossLinePositions.DRAW,
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

const indexes = {
  center: 4,
  corners: [0, 2, 6, 8],
  sides: [1, 3, 5, 7],
};

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
  winner: { mark: string; player: string } | null;
  move: { number: number; mark: string; player: string };
  firstPlayer: string;
  crossLinePosition: string;
  readonly isSecondPlayerAI: boolean;
  readonly difficulty: string;

  constructor(isSecondPlayerAI = false, difficulty = Difficulty.RANDOM) {
    const firstPlayer = getRandomFromEnum(Player);

    this.cells = [...gameDefault.cells];
    this.winner = gameDefault.winner;
    this.move = {
      number: gameDefault.firstMove,
      mark: gameDefault.firstMark,
      player: firstPlayer,
    };
    this.firstPlayer = firstPlayer;
    this.crossLinePosition = gameDefault.crossLinePosition;
    this.isSecondPlayerAI = isSecondPlayerAI;
    this.difficulty = difficulty;

    if (this.isSecondPlayerAI && this.move.player === Player.TWO) {
      this.makeMoveAI();
    }
  }

  get emptyCellIndexes() {
    return this.cells.reduce((acc, cur, index) => {
      return cur === null ? [...acc, index] : [...acc];
    }, [] as number[]);
  }

  get isLastMove() {
    if (this.move.number === 9) {
      return true;
    }
  }

  get isFirst4Moves() {
    return this.move.number < 5;
  }

  get cornerMarks() {
    return this.getCellsByIndexes(indexes.corners);
  }

  get sideMarks() {
    return this.getCellsByIndexes(indexes.sides);
  }

  getCellsByIndexes(indexes: number[]) {
    return indexes.reduce(
      (acc, cur) => [...acc, this.cells[cur]],
      [] as Array<string | null>
    );
  }

  determineWinner() {
    if (this.move.number < 5) return;

    for (const item of winningIndexes) {
      if (
        this.cells[item.indexes[0]] !== null &&
        this.cells[item.indexes[0]] === this.cells[item.indexes[1]] &&
        this.cells[item.indexes[0]] === this.cells[item.indexes[2]]
      ) {
        this.crossLinePosition = item.position;
        this.winner = {
          mark: this.move.mark,
          player: this.move.player,
        };
        return;
      }
    }

    if (this.move.number === 9 && !this.winner) {
      this.crossLinePosition = CrossLinePositions.DRAW;
      this.winner = { mark: Winner.DRAW, player: Winner.DRAW };
    }
  }

  isPositionWon(cellsToTest: Array<string | null>) {
    const cells = cellsToTest || this.cells;

    // if (this.move.number < 5) return false;

    for (const item of winningIndexes) {
      if (
        cells[item.indexes[0]] !== null &&
        cells[item.indexes[0]] === cells[item.indexes[1]] &&
        cells[item.indexes[0]] === cells[item.indexes[2]]
      ) {
        return true;
      }
    }

    if (this.isLastMove) {
      return false;
    }
  }

  makeMove(index: number) {
    this.cells[index] = this.move.mark;
    this.determineWinner();
    if (!this.winner) {
      this.move.mark = this.otherMark(this.move.mark);
      this.move.player = this.otherPlayer(this.move.player);
      ++this.move.number;

      if (this.isSecondPlayerAI && this.move.player === Player.TWO) {
        this.makeMoveAI();
      }
    }
  }

  onKeyDown(e: KeyboardEvent) {
    const indexOfKey = controlKeyCodes.indexOf(e?.code);
    if (indexOfKey !== -1 && this.cells[indexOfKey] === null && !this.winner) {
      this.makeMove(indexOfKey);
    }
  }

  resetGame() {
    this.cells = [...gameDefault.cells];
    this.winner = gameDefault.winner;
    this.move = {
      number: gameDefault.firstMove,
      mark: gameDefault.firstMark,
      player: this.otherPlayer(this.firstPlayer),
    };
    this.firstPlayer = this.otherPlayer(this.firstPlayer);

    if (this.isSecondPlayerAI && this.move.player === Player.TWO) {
      this.makeMoveAI();
    }
  }

  makeMoveAI() {
    if (this.difficulty === Difficulty.HARD) {
      this.makeHardMoveAI();
      return;
    }

    if (this.difficulty === Difficulty.RANDOM) {
      this.makeRandomMoveAI();
      return;
    }
  }

  makeHardMoveAI() {
    // First move
    if (this.move.number === 1) {
      if (getRandomNumber(0, 1)) {
        this.makeMoveRandomCorner();
        return;
      } else {
        this.makeMoveCenter();
        return;
      }
    }

    // Second move
    if (this.move.number === 2) {
      // If first move was center
      if (this.cells[indexes.center] !== null) {
        this.makeMoveRandomCorner();
        return;
      }

      if (
        // If first move was corner
        this.cornerMarks.includes(Mark.X) ||
        this.cornerMarks.includes(Mark.O)
      ) {
        this.makeMoveCenter();
        return;
      } else {
        // If first move was side
        if (getRandomNumber(0, 1)) {
          this.makeMoveCenter();
          return;
        } else {
          // TODO: replace with make move to adjacent corner
          this.makeMoveCenter();
          return;
        }
      }
    }

    // Last move
    if (this.isLastMove) {
      this.makeRandomMoveAI();
      return;
    }

    const isWinnable = this.isWinnable();
    if (isWinnable !== undefined) {
      this.makeMove(isWinnable);
      return;
    }

    const isLosable = this.isLosable();
    if (isLosable !== undefined) {
      this.makeMove(isLosable);
      return;
    }

    this.makeRandomMoveAI();
    return;
  }

  makeRandomMoveAI() {
    const randomIndex = getRandomNumber(0, this.emptyCellIndexes.length - 1);
    this.makeMove(this.emptyCellIndexes[randomIndex]);
  }

  makeMoveCenter() {
    this.makeMove(indexes.center);
  }

  makeMoveRandomCorner() {
    const emptyCorners = this.emptyCellIndexes.filter((index) =>
      indexes.corners.includes(index)
    );
    const randomCornerIndex = getRandomNumber(0, emptyCorners.length - 1);
    this.makeMove(emptyCorners[randomCornerIndex]);
  }

  isWinnable() {
    const cellsToTest = this.emptyCellIndexes.map((index) => {
      const cellsCurr = [...this.cells];
      cellsCurr[index] = this.move.mark;
      return cellsCurr;
    });

    for (const [index, cells] of cellsToTest.entries()) {
      if (this.isPositionWon(cells)) {
        return this.emptyCellIndexes[index];
      }
    }
  }

  isLosable() {
    const cellsToTest = this.emptyCellIndexes.map((index) => {
      const cellsCurr = [...this.cells];
      cellsCurr[index] = this.otherMark(this.move.mark);
      return cellsCurr;
    });

    for (const [index, cells] of cellsToTest.entries()) {
      if (this.isPositionWon(cells)) {
        return this.emptyCellIndexes[index];
      }
    }
  }

  otherPlayer(player: string) {
    return player === Player.ONE ? Player.TWO : Player.ONE;
  }

  otherMark(mark: string) {
    return mark === Mark.X ? Mark.O : Mark.X;
  }
}
