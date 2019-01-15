import MazeTraverser from './src/components/MazeTraverser'
import { mazes } from './src/data/sample-mazes'

mazes.forEach((maze, index) => {
  const mazeTraverser = new MazeTraverser(maze.maze);
  console.log(`Sample maze ${ index + 1 }:`);
  console.log(mazeTraverser.getMaze());
  mazeTraverser.runMaze();
  const letters = mazeTraverser.getLetters();
  const path = mazeTraverser.getPath();
  console.log(`Letters: ${letters}\n`);
  console.log(`Path: ${path}\n\n`);
});
