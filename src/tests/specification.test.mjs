import MazeTraverser from '../components/MazeTraverser';
import { mazes } from '../data/sample-mazes';
import { invalidMazes } from './invalid-mazes';

describe('Specification tests with sample mazes', () => {
  mazes.forEach((maze, index) => {
    test(`Maze ${index + 1}`, () => {
      const mazeTraverser = new MazeTraverser(maze.maze);
      mazeTraverser.runMaze();
      const letters = mazeTraverser.getLetters();
      const path = mazeTraverser.getPath();
      expect(letters).toBe(maze.expectedLetters);
      expect(path).toBe(maze.expectedPath);
    });
  });

  invalidMazes.forEach((maze, index) => {
    test(`Invalid maze ${index + 1} throws error`, () => {
      const mazeTraverser = new MazeTraverser(maze);
      expect(() => mazeTraverser.runMaze()).toThrow();
    });
  });
});
