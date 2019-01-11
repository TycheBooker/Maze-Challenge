import { mazeSettings } from '../data/settings';
import { isASCII } from '../helpers/helpers';
class MazeTraverser {
  constructor(mazeString) {
    this.maze = mazeString;
    this.rows = [];
    this.currentPosition = {
      x: 0,
      y: 0
    };
    this.direction = '';
  }

  runMaze() {
    try {
      this.splitRows();
      this.findStartPosition();
      this.findStartDirection();
    } catch (error) {
      console.error(error);
      return;
    }
  }

  splitRows() {
    let rows = this.maze.split('\n');
    // remove empty rows
    rows = rows.filter(row => {
      return row.length > 0;
    });
    if (rows.length < 1) {
      throw 'Invalid maze submitted. Please split rows with "\n".';
    }
    this.rows = rows;
  }

  findStartPosition() {
    // check maze for multiple starting points
    const occurences =
      this.maze.match(new RegExp(mazeSettings.start, 'g')) || [];
    if (occurences.length > 1) {
      throw 'Invalid maze submitted. There are multiple starting points.';
    } else if (occurences.length === 0) {
      throw 'Invalid maze submitted. There is no starting point.';
    }

    this.rows.forEach((row, rowIndex) => {
      const startIndex = row.indexOf(mazeSettings.start);
      if (startIndex >= 0) {
        this.currentPosition.x = startIndex;
        this.currentPosition.y = rowIndex;
        return;
      }
    });
  }

  findStartDirection() {
    const adjacentTiles = this.getAdjacent();
    if (adjacentTiles.length < 1) {
      throw 'Invalid maze submitted. The starting position is isolated.';
    }
  }

  step() {

  }

  getAdjacent() {
    const adjacentPositions = [];
    const right = {
      x: this.currentPosition + 1,
      y: this.currentPosition
    };
    const left = {
      x: this.currentPosition - 1,
      y: this.currentPosition
    };
    const up = {
      x: this.currentPosition,
      y: this.currentPosition + 1
    };
    const down = {
      x: this.currentPosition,
      y: this.currentPosition - 1
    };
    adjacentPositions.push(right, left, up, down);
    adjacentPositions.filter(position => this.positionExists(position));
    return adjacentPositions;
  }

  positionExists(position) {
    // check if row exists
    if (position.y < 0 || position.y > this.rows.length) {
      return false;
    }
    // check if place in row exists
    if (position.x < 0 || position.x > this.rows[position.y].length) {
      return false;
    }
    return true;
  }

  doesConnect(currentPosition, nextPosition) {
    const currentSymbol = this.getSymbol(currentPosition);
    const nextSymbol = this.getSymbol(nextPosition);

    // check pipes
    if (this.checkPipes(nextSymbol)) {
      return this.checkPipes(nextSymbol);
    }

    // check symbols
    if (nextSymbol === mazeSettings.end || (nextSymbol === mazeSettings.corner) || isASCII(nextSymbol)) {
      if (this.checkPipes(currentSymbol)) {
        return this.checkPipes(currentSymbol);
      }
    }

    return false;
  }

  checkPipes(symbol) {
    if (
      symbol === mazeSettings.horizontal &&
      this.movesHorizontal()
    ) {
      return true;
    }
    if (
      symbol === mazeSettings.vertical &&
      !this.movesHorizontal()
    ) {
      return true;
    }
    return false;
  }

  movesHorizontal() {
    if (this.direction === 'right' || this.direction === 'left') {
      return true;
    }
    return false;
  }

  getSymbol(position) {
    return this.rows[position.y][position.x];
  }

  printMaze() {
    console.log(this.maze);
  }

  printLetters() {}

  printPath() {}
}

export default MazeTraverser;
