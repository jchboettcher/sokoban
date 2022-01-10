const offset = 7
const sc = 4

const LEFT = [-1,0]
const RIGHT = [1,0]
const UP = [0,-1]
const DOWN = [0,1]

let player
let bricks = []
let blocks = []
let ends = []

let history = []
let place = -1

const levelStr = `
XXXXXXXXXXXXXX
XXXXX        X
XX   2OX     X
XX           X
XX   OX 2 X XX
XXX         XX
XXX  X 3XX 2XX
XXXX  3 XX OXX
XX     XXXXXXX
X  P  OXXXXXXX
X   OO1   XXXX
X   X     XXXX
XXXXXXX  XXXXX
XXXXXXXXXXXXXX
`
// const levelStr = `
// XXXXXXXXXXXXXX 
// XXXXX        X 
// XX     X     X 
// XX           X 
// XX    X 2 X XX 
// XXX 1       XX 
// XXX PX 3XX 2XX 
// XXXX    XX  XX 
// XX     XXXXXXX 
// X     3XXXXXXX 
// X  2      XXXX 
// X   X     XXXX 
// XXXXXXX  XXXXX 
// XXXXXXXXXXXXXX
// `

function setup() {
  const canvas = createCanvas((14*8+offset*2)*sc,(15*8+offset*2)*sc)
  canvas.parent("centered")
  ends = [
    new End(6,2),
    new End(5,4),
    new End(11,7),
    new End(6,9),
    new End(4,10),
    new End(5,10),
  ]
  reset()
}

const reset = () => {
  const grid = levelStr.substring(1,levelStr.length-1).split("\n")
  bricks = []
  blocks = []
  let h = 0
  // const cols = [color(225,0,0),color(0,225,0),color(0,0,225),color(225,225,0),color(225,0,225),color(0,225,225)]
  // const cols = [color(0,225,0),color(0,225,225),color(0,0,225),color(225,225,0),color(225,0,225),color(225,0,0)]
  const cols = [color(0),color(0),color(0),color(0),color(0),color(0)]
  grid.forEach(row => {
    let w = 0
    row.split("").forEach(cell => {
      switch (cell) {
        case "X":
          bricks.push(new Brick(w,h))
          break
        case "1":
        case "2":
        case "3":
          blocks.push(new Block(w,h,parseInt(cell),cols[blocks.length]))
          break
        case "P":
          player = new Player(w,h)
          break
        default:
          break
      }
      w++
    })
    h++
  })
  const newplayer = new Player(player.x, player.y)
  const newblocks = []
  blocks.forEach(block => {
    const newblock = new Block(block.x, block.y, block.val, block.col)
    newblocks.push(newblock)
  })
  place++
  history[place] = [newplayer, newblocks]
  history.length = place+1
}

const undo = () => {
  if (place > 0) {
    place--
    const [p,b] = history[place]
    player = new Player(p.x, p.y)
    blocks = []
    b.forEach(block => {
      const newblock = new Block(block.x, block.y, block.val, block.col)
      blocks.push(newblock)
    })
  }
}

const redo = () => {
  console.log("redoing")
  if (place < history.length-1) {
    place++
    const [p,b] = history[place]
    player = new Player(p.x, p.y)
    blocks = []
    b.forEach(block => {
      const newblock = new Block(block.x, block.y, block.val, block.col)
      blocks.push(newblock)
    })
  }
}

const checkBrick = (x,y) => {
  for (let brick of bricks) {
    if (brick.x === x && brick.y === y) {
      return true
    }
  }
  return false
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reset()
  } else if (key === 'z' || key === 'Z') {
    undo()
  } else if (key === 'x' || key === 'X') {
    redo()
  } else {
      switch (keyCode) {
      case LEFT_ARROW:
        player.move(LEFT)
        break
      case RIGHT_ARROW:
        player.move(RIGHT)
        break
      case UP_ARROW:
        player.move(UP)
        break
      case DOWN_ARROW:
        player.move(DOWN)
        break
      default:
        break
    }
  }
  printGrid()
}

const printGrid = () => {
  let grid = ""
  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < 15; i++) {
      if (i === player.x && j === player.y) {
        grid += "P"
        continue
      }
      for (let brick of bricks) {
        if (i === brick.x && j === brick.y) {
          grid += "X"
          break
        }
      }
      for (let block of blocks) {
        if (i === block.x && j === block.y) {
          grid += block.val.toString()
          break
        }
      }
      if (grid.length % 16 != i+1) {
        grid += " "
      }
    }
    grid += "\n"
  }
  console.log(grid)
}

function draw() {
  background(255)
  push()
  scale(sc)
  translate(offset,offset)
  noStroke()
  fill(0)
  ends.forEach(end => end.show())
  bricks.forEach(brick => brick.show())
  blocks.forEach(block => block.show())
  player.show()
  pop()
}
