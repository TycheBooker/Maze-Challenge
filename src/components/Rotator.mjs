class Rotator {
  constructor(directions) {
    this.directionPositions = directions;
    this.directions = Object.keys(directions);
  }

  getPosition(currentPosition, direction) {
    if (!this.directions.includes(direction)) {
      throw 'Invalid direction supplied to Rotator';
    }
    return {
      x: currentPosition.x + this.directionPositions[direction].x,
      y: currentPosition.y + this.directionPositions[direction].y
    };
  }

  getNextDirection(direction) {
    const index = this.directions.indexOf(direction);
    if (index > -1 && index < this.directions.length - 1) {
      return this.directions[index + 1];
    } else {
      return this.directions[0];
    }
  }
}

export default Rotator;
