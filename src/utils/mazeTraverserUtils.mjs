import { mazeSettings } from '../data/settings';

export function isASCII(string) {
  if (typeof string !== 'string') {
    return false;
  }
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127) {
      return false;
    }
  }
  return true;
}

export function isLetter(char) {
  if (char.length > 1) {
    return false;
  }
  if (!isASCII(char)) {
    return false;
  }
  if (
    char === mazeSettings.start ||
    char === mazeSettings.horizontal ||
    char === mazeSettings.vertical ||
    char === mazeSettings.corner ||
    char === mazeSettings.end ||
    char === ' '
  ) {
    return false;
  }
  return true;
}

export function positionExists(position, rows) {
  // check if row exists
  if (position.y < 0 || position.y > rows.length - 1) {
    return false;
  }
  // check if place in row exists
  if (position.x < 0 || position.x > rows[position.y].length - 1) {
    return false;
  }
  return true;
}

export function arrayContainsPosition(position, array) {
  return !!array.find(arrayPosition => {
    return arrayPosition.x === position.x && arrayPosition.y === position.y;
  })
}
