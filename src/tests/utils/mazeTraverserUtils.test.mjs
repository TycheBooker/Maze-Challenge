import { isASCII, isLetter, positionExists, arrayContainsPosition } from '../../utils/mazeTraverserUtils'
import { mazeSettings } from '../../data/settings'

const testRows = [
  new Array(4),
  new Array(5),
  new Array(5)
]
const testPosition1 = {
  x: 3,
  y: 1
}
const testPosition2 = {
  x: -1,
  y: 2
}
const testPosition3 = {
  x: 7,
  y: 0
}
const testPosition4 = {
  x: 2,
  y: 6
}
const testPosition5 = {
  x: 3,
  y: 0
}
const testPositionsArray = [
  testPosition1,
  testPosition2,
  testPosition3
]

describe('Maze Traverser utilities tests', () => {
  test('checks if a character is ASCII', () => {
    expect(isASCII('A')).toBe(true);
    expect(isASCII('Č')).toBe(false);
  })

  test('discards characters with maze functions as letters', () => {
    expect(isLetter('A')).toBe(true);
    expect(isLetter(mazeSettings.corner)).toBe(false);
  })

  test('correctly discards positions outside a grid of arrays', () => {
    expect(positionExists(testPosition1, testRows)).toBe(true);
    expect(positionExists(testPosition2, testRows)).toBe(false);
    expect(positionExists(testPosition3, testRows)).toBe(false);
  })

  test('checks if an array of positions contains a position', () => {
    expect(arrayContainsPosition(testPosition1,testPositionsArray)).toBe(true);
    expect(arrayContainsPosition(testPosition4,testPositionsArray)).toBe(false);
    expect(arrayContainsPosition(testPosition5,testPositionsArray)).toBe(false);
  })
});
