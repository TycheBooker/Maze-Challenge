import MazeTraverser from './components/MazeTraverser'
import { maze1, maze2, maze3 } from './data/sample-mazes'

const mazeTraverser = new MazeTraverser(maze2);

mazeTraverser.printMaze();
mazeTraverser.runMaze();
mazeTraverser.printLetters();
mazeTraverser.printPath();