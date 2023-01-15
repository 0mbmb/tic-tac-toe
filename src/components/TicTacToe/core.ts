import { Player, CrossLinePositions, Winner, Mark } from "./types";
import { getRandomNumber, getRandomFromEnum } from "./utils/utils";

const gameDefault = {
  cells: [null, null, null, null, null, null, null, null, null],
  winner: null,
  firstMove: 0,
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
  isSecondPlayerAI: boolean;

  constructor(isSecondPlayerAI = false) {
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

    if (this.isSecondPlayerAI && this.move.player === Player.TWO) {
      this.makeMoveAI();
    }
  }

  get emptyCellIndexes() {
    return this.cells.reduce((acc, cur, index) => {
      return cur === null ? [...acc, index] : [...acc];
    }, [] as number[]);
  }

  determineWinner() {
    if (this.move.number < 4) return;

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

    if (this.move.number === 8 && !this.winner) {
      this.crossLinePosition = CrossLinePositions.DRAW;
      this.winner = { mark: Winner.DRAW, player: Winner.DRAW };
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

  // TODO: Вынести в utils
  otherPlayer(player: string) {
    return player === Player.ONE ? Player.TWO : Player.ONE;
  }

  otherMark(mark: string) {
    return mark === Mark.X ? Mark.O : Mark.X;
  }

  makeMoveAI() {
    const randomIndex = getRandomNumber(0, this.emptyCellIndexes.length - 1);
    this.makeMove(this.emptyCellIndexes[randomIndex]);
  }
}
