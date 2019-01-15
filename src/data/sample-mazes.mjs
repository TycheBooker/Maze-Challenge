export const mazes = [
  {
    maze: `
    @---A---+
            |
    x-B-+   C
        |   |
        +---+
    `,
    expectedLetters: 'ACB',
    expectedPath: '@---A---+|C|+---+|+-B-x'
  },
  {
    maze: `
    @
    | C----+
    A |    |
    +---B--+
      |      x
      |      |
      +---D--+
    `,
    expectedLetters: 'ABCD',
    expectedPath: '@|A+---B--+|+----C|-||+---D--+|x'
  },
  {
    maze: `
    @---+
        B
  K-----|--A
  |     |  |
  |  +--E  |
  |  |     |
  +--E--Ex C
     |     |
     +--F--+
  `,
    expectedLetters: 'BEEFCAKE',
    expectedPath: '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex'
  }
];
