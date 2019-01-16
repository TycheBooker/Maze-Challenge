import { mazeSettings, directions } from '../data/settings';
import Rotator from './Rotator';
import {
  isLetter,
  positionExists,
  arrayContainsPosition
} from '../utils/mazeTraverserUtils';
class MazeTraverser {
  constructor(mazeString) {
    this.maze = mazeString;
    this.rows = [];
    this.currentPosition = {
      x: null,
      y: null
    };
    this.visitedPositions = [];
    this.direction = '';
    this.letters = '';
    this.path = mazeSettings.start;
    this.rotator = new Rotator(directions);
  }

  runMaze() {
    try {
      this.splitRows();
      this.findStartPosition();
      this.checkDirection(true);
      this.step();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  splitRows() {
    let rows = this.maze.split('\n');
    // remove empty rows
    rows = rows.filter(row => {
      return row.length > 0;
    });
    if (rows.length < 1) {
      throw 'Empty maze submitted.';
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

    this.rows.some((row, rowIndex) => {
      const startIndex = row.indexOf(mazeSettings.start);
      if (startIndex >= 0) {
        this.currentPosition.x = startIndex;
        this.currentPosition.y = rowIndex;
        return true;
      }
    });
  }

  step() {
    const currentSymbol = this.getSymbol(this.currentPosition);
    if (currentSymbol === mazeSettings.corner) {
      this.checkDirection(true); // turn first, then check
    } else if (isLetter(currentSymbol)) {
      this.checkDirection(false); // check straight first
    }

    const nextPosition = this.rotator.getPosition(
      this.currentPosition,
      this.direction
    );
    const nextSymbol = this.getSymbol(nextPosition);

    if (
      isLetter(nextSymbol) &&
      !arrayContainsPosition(nextPosition, this.visitedPositions)
    ) {
      this.letters = this.letters.concat(nextSymbol);
    }
    this.path = this.path.concat(nextSymbol);

    this.visitedPositions.push(this.currentPosition);
    this.currentPosition = nextPosition;

    if (nextSymbol !== mazeSettings.end) {
      this.step();
    }
  }

  checkDirection(turnFirst, numberOfTurns = 0) {
    if (turnFirst) {
      this.changeDirection();
    }
    const nextPosition = this.rotator.getPosition(
      this.currentPosition,
      this.direction
    );
    if (numberOfTurns > Object.keys(directions).length - 1) {
      throw 'Invalid maze submitted. No valid paths available.';
    }
    if (!this.isValidPath(nextPosition)) {
      this.changeDirection();
      this.checkDirection(false, ++numberOfTurns);
    }
  }

  changeDirection() {
    this.direction = this.rotator.getNextDirection(this.direction);
  }

  // checks if path can continue
  isValidPath(nextPosition) {
    // check if position exists
    if (!positionExists(nextPosition, this.rows)) {
      return false;
    }
    // check if position has been visited before
    if (arrayContainsPosition(nextPosition, this.visitedPositions)) {
      return false;
    }
    // check if position if empty
    if (this.getSymbol(nextPosition) === ' ') {
      return false;
    }

    return true;
  }

  getSymbol(position) {
    return this.rows[position.y][position.x];
  }

  getMaze() {
    return this.maze;
  }

  getLetters() {
    return this.letters;
  }

  getPath() {
    return this.path;
  }
}

export default MazeTraverser;
