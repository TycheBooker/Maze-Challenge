import { mazeSettings } from '../data/settings'

class MazeTraverser {
  constructor(mazeString) {
    this.maze = mazeString;
    this.rows = [];
    this.currentPosition = {
      x: 0,
      y: 0
    }
    this.direction = 'right';
  }

  runMaze() {
    try {
      this.splitRows();
      this.findStart();
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
    })
    if (rows.length < 1) {
      throw('Invalid maze submitted. Please split rows with "\n".');
    }
    this.rows = rows;
  }

  findStart() {
    // check maze for multiple starting points
    const occurances = this.maze.match(new RegExp(mazeSettings.startPosition, "g")) || []
    if (occurances.length > 1) {
      throw('Invalid maze submitted. There are multiple starting points.');
    } else if (occurances.length === 0) {
      throw('Invalid maze submitted. There is no starting point.');
    }

    this.rows.forEach((row, rowIndex) => {
      const startIndex = row.indexOf(mazeSettings.startPosition);
      if (startIndex >= 0) {
        this.currentPosition.x = startIndex;
        this.currentPosition.y = rowIndex;
        return;
      }
    })
  }

  printMaze() {
    console.log(this.maze);
  }

  printLetters() {

  }

  printPath() {

  }
}

export default MazeTraverser;