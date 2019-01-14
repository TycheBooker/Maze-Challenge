import MazeTraverser from './src/components/MazeTraverser'
import { maze1, maze2, maze3 } from './src/data/sample-mazes'

const mazeTraverser = new MazeTraverser(maze1);

mazeTraverser.printMaze();
mazeTraverser.runMaze();
mazeTraverser.printLetters();
mazeTraverser.printPath();