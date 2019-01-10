# Talented Code Challenge

- Path following algorithm in ASCII Map
- Find the position of character '@'
- Follow the path, stop when character 'x' is reached

## Code Challenge

Write a piece of code that takes ASCII map as an input and outputs the letters and the path that algorithm travelled.

  - Input:
    - ASCII map
  - Output:
    - Collected letters
    - Path as characters

## Map 1

```
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result:
- Letters ```ACB```
- Path as characters ```@---A---+|C|+---+|+-B-x```

## Map 2

```
  @
  | C----+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
```

Expected result:
- Letters ```ABCD```
- Path as characters ```@|A+---B--+|+----C|-||+---D--+|x```

## Map 3

```
  @---+
      B
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
   |     |
   +--F--+
 ```

Expected result:
- Letters ```BEEFCAKE```
- Path as characters ```@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex```