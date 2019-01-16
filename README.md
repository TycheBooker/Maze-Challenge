# ASCII maze traverser
A small javascript script that handles traversing an ACSCII maze and outputs either the letters found or the whole traversed path.

Dependencies are needed only for testing. To install them run ```npm install``` or ```yarn install```.

Run the script with ```npm run start``` or ```yarn start```.
To start the testing suite run ```npm run test``` or ```yarn test```.

The script runs on sample mazes located in ```src/data/sample-mazes.mjs```, different examples can be supplied there.
Maze settings (characters used in the maze) and directions can be edited in ```src/data/settings.mjs```.
Running the script will print out first the maze, and then the collected letters and the traversed path to the console for all the included maze examples.

## Requirements
* Node > 8.5.0
