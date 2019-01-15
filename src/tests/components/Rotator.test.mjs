import Rotator from '../../components/Rotator';
import { directions } from '../../data/settings';

describe('Rotator tests', () => {
  const rotator = new Rotator(directions);
  const directionNames = Object.keys(directions);
  const testPosition = {
    x: 3,
    y: 6
  };

  test('return position to the left', () => {
    const nextPosition = rotator.getPosition(testPosition, 'left');
    expect(nextPosition).toEqual({
      x: 2,
      y: 6
    });
  });

  test('return position downwards', () => {
    const nextPosition = rotator.getPosition(testPosition, 'down');
    expect(nextPosition).toEqual({
      x: 3,
      y: 7
    });
  });

  test('throw error when supplied with invalid direction', () => {
    expect(() => {
      rotator.getPosition(testPosition, 'diagonally');
    }).toThrow();
  });

  test('returns next direction', () => {
    const nextDirection = rotator.getNextDirection(directionNames[1]);
    expect(nextDirection).toBe(directionNames[2]);
  });

  test('returns first direction by default', () => {
    const nextDirection = rotator.getNextDirection();
    expect(nextDirection).toBe(directionNames[0]);
  });
});
