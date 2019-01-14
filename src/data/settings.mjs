export const mazeSettings = {
  start: '@',
  end: 'x',
  horizontal: '-',
  vertical: '|',
  corner: '+',
}

export const directions = {
  'right': {
    x: 1,
    y: 0
  },
  'down': {
    x: 0,
    y: +1
  },
  'left': {
    x: -1,
    y: 0
  },
  'up': {
    x: 0,
    y: -1
  }
}