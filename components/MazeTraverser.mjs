import { mazeSettings, directions } from '../data/settings';
import Rotator from './Rotator';
import { isLetter } from '../helpers/helpers';
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
    this.path = '@';
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
      !this.visitedPositions.find(position => {
        return position.x === nextPosition.x && position.y === nextPosition.y;
      })
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

  checkDirection(turnFirst) {
    if (turnFirst) {
      this.changeDirection();
    }
    const nextPosition = this.rotator.getPosition(
      this.currentPosition,
      this.direction
    );
    if (!this.isValidPath(nextPosition)) {
      this.changeDirection();
      this.checkDirection(false);
    }
    // if (all directions tried) {
    //   throw 'Invalid maze submitted. No valid paths available.';
    // }
  }

  changeDirection() {
    this.direction = this.rotator.getNextDirection(this.direction);
  }

  positionExists(position) {
    // check if row exists
    if (position.y < 0 || position.y > this.rows.length - 1) {
      return false;
    }
    // check if place in row exists
    if (position.x < 0 || position.x > this.rows[position.y].length - 1) {
      return false;
    }
    return true;
  }

  // checks if path can continue
  isValidPath(nextPosition) {
    // check if position exists
    if (!this.positionExists(nextPosition)) {
      return false;
    }
    // check if position has been visited before
    if (
      this.visitedPositions.find(position => {
        return position.x === nextPosition.x && position.y === nextPosition.y;
      })
    ) {
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

  printMaze() {
    console.log(this.maze);
  }

  printLetters() {
    console.log(this.letters);
  }

  printPath() {
    console.log(this.path);
  }
}

export default MazeTraverser;
