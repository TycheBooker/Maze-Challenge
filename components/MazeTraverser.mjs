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
    this.splitRows();
  }

  splitRows() {
    let rows = this.maze.split('\n');
    // remove empty rows
    rows = rows.filter(row => {
      return row.length > 0;
    })
    if (rows.length < 1) {
      console.error('Invalid maze submitted. Please split rows with "\n".');
      return;
    }
    this.rows = rows;
  }

  findStart() {

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