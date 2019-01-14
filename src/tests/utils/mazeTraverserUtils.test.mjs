import { isLetter } from '../../utils/mazeTraverserUtils'

test('return true for A', () => {
  expect(isLetter('A')).toBe(true);
})