import { mazeSettings } from '../data/settings';
import { isLetter } from '../helpers/helpers';
class MazeTraverser {
  constructor(mazeString) {
    this.maze = mazeString;
    this.rows = [];
    this.currentPosition = {
      x: null,
      y: null
    };
    this.lastPosition = {
      x: null,
      y: null
    }
    this.movesHorizontal = true;
    this.letters = '';
    this.path = '@';
  }

  runMaze() {
    try {
      this.splitRows();
      this.findStartPosition();
      this.findDirection();
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

  findDirection() {
    let adjacentPositions = this.getAdjacent();
    adjacentPositions.some(position => {
      const symbol = this.getSymbol(position);
      if (this.currentPosition.y === position.y && symbol === mazeSettings.horizontal) {
        this.movesHorizontal = true;
      } else if (this.currentPosition.x === position.x && symbol === mazeSettings.vertical) {
        this.movesHorizontal = false;
      }
    })
  }

  step() {
    const nextPosition = this.findNextPosition();
    this.lastPosition = this.currentPosition;
    this.currentPosition = nextPosition;

    this.currentSymbol = this.getSymbol(this.currentPosition);
    this.path = this.path.concat(this.currentSymbol);
    if (isLetter(this.currentSymbol)) {
      this.letters = this.letters.concat(this.currentSymbol);
    }
    if (this.currentSymbol === mazeSettings.corner) {
      this.movesHorizontal = !this.movesHorizontal;
    }
    if (isLetter(this.currentSymbol)) {
      this.findDirection();
    }
    if (this.currentSymbol !== mazeSettings.end) {
      this.step();
    }
  }

  findNextPosition() {
    let adjacentPositions = this.getAdjacent();
    const connectedPositions = adjacentPositions.filter(position => {
      return this.doesConnect(this.currentPosition, position);
    })

    if (connectedPositions.length < 1) {
      throw 'Invalid maze submitted. A route cannot be traced.';
    }

    if (connectedPositions.length > 1) {
      throw 'Invalid maze submitted. Multiple routes possible';
    }
    return connectedPositions[0];
  }

  // finds all adjacent positions if they exists
  getAdjacent() {
    let adjacentPositions = [];
    const right = {
      x: this.currentPosition.x + 1,
      y: this.currentPosition.y
    };
    const left = {
      x: this.currentPosition.x - 1,
      y: this.currentPosition.y
    };
    const up = {
      x: this.currentPosition.x,
      y: this.currentPosition.y + 1
    };
    const down = {
      x: this.currentPosition.x,
      y: this.currentPosition.y - 1
    };
    adjacentPositions.push(right, left, up, down);
    adjacentPositions = adjacentPositions.filter(position => this.positionExists(position));

    if (adjacentPositions.length < 1) {
      throw 'Invalid maze submitted. The starting position is isolated.';
    }

    // remove last position from possible connections
    if (this.lastPosition.x !== null && this.lastPosition.y !== null) {
      adjacentPositions = adjacentPositions.filter(position => {
        return !(position.x === this.lastPosition.x && position.y === this.lastPosition.y);
      })
    }
    return adjacentPositions;
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

  // checks if positions can be connected
  doesConnect(currentPosition, nextPosition) {
    const currentSymbol = this.getSymbol(currentPosition);
    const nextSymbol = this.getSymbol(nextPosition);

    // check pipes
    if (this.checkPipes(nextSymbol)) {
      return this.checkPipes(nextSymbol);
    }

    // check symbols
    if (this.isUniversalConnector(nextSymbol)) {
      if (this.checkPipes(currentSymbol)) {
        return this.checkPipes(currentSymbol);
      }
    }

    // check universal
    if (this.isUniversalConnector(currentSymbol) && this.isUniversalConnector(nextSymbol)) {

    }

    // paths crossing case
    if (currentSymbol === mazeSettings.vertical && nextSymbol === mazeSettings.horizontal && !this.movesHorizontal) {
      return true;
    } else if (currentSymbol === mazeSettings.horizontal && nextSymbol === mazeSettings.vertical && this.movesHorizontal) {
      return true;
    }

    return false;
  }



  checkPipes(symbol) {
    if (
      symbol === mazeSettings.horizontal &&
      this.movesHorizontal
    ) {
      return true;
    }
    if (
      symbol === mazeSettings.vertical &&
      !this.movesHorizontal
    ) {
      return true;
    }
    return false;
  }

  isUniversalConnector(symbol) {
    const universalConnectors = [mazeSettings.start, mazeSettings.end, mazeSettings.corner];
    if (symbol === mazeSettings.start || symbol === mazeSettings.end || symbol === mazeSettings.corner || isLetter(symbol)) {
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

  printLetters() {
    console.log(this.letters);
  }

  printPath() {
    console.log(this.path);
  }
}

export default MazeTraverser;
