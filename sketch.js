const offset = 2
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
let undocounter = 0
let currKey

const levelStr = `
XXXXXXXXXXXXXX
XXXXX        X
XX   (2A)OX     X
XX           X
XX   OX (2B) X XX
XXX         XX
XXX  X (3A)XX (2C)XX
XXXX  (3B) X  OXX
XX     XX XXXX
X     OXXXXXXX
X P OO(1A)   XXXX
XX  X     XXXX
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
  const canvas = createCanvas((14*8+offset*2)*sc,(14*8+offset*2)*sc)
  canvas.parent("centered")
  ends = [
    new End(6,9,"3B"),
    new End(4,10,"2A"),
    new End(5,10,"3A"),
    new End(5,4,"2B"),
    new End(6,2,"2C"),
    new End(11,7,"1A"),
  ]
  textAlign(CENTER,CENTER)
  textSize(4.5)
  textFont("Helvetica")
  reset()
}

const reset = (lvlStr=levelStr) => {
  const grid = lvlStr.substring(1,lvlStr.length-1).split("\n")
  bricks = []
  blocks = []
  let h = 0
  // const cols = [color(225,0,0),color(0,225,0),color(0,0,225),color(225,225,0),color(225,0,225),color(0,225,225)]
  // const cols = [color(0,225,0),color(0,225,225),color(0,0,225),color(225,225,0),color(225,0,225),color(225,0,0)]
  const cols = [color(0),color(0),color(0),color(0),color(0),color(0)]
  blockidcounters = {1:0,2:0,3:0}
  order = "ABC"
  grid.forEach(row => {
    let w = 0
    let id = ""
    let val = 0
    row.split("").forEach(cell => {
      switch (cell) {
        case "X":
          bricks.push(new Brick(w,h))
          break
        case "1":
        case "2":
        case "3":
          val = parseInt(cell)
          id = cell
          w -= 2
          break
        case "A":
        case "B":
        case "C":
          blocks.push(new Block(w,h,val,id+cell))
          w--
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
    const newblock = new Block(block.x, block.y, block.val, block.txt)
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
      const newblock = new Block(block.x, block.y, block.val, block.txt)
      blocks.push(newblock)
    })
  }
}

const redo = () => {
  // console.log("redoing")
  if (place < history.length-1) {
    place++
    const [p,b] = history[place]
    player = new Player(p.x, p.y)
    blocks = []
    b.forEach(block => {
      const newblock = new Block(block.x, block.y, block.val, block.txt)
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

const updateEnds = () => {
  let activated = true
  ends.forEach(end => {
    end.activated = activated
    if (!activated) {
      return
    }
    activated = blocks.some(block => (
      end.txt === block.txt && end.x === block.x && end.y === block.y
    ))
  })
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reset()
  } else if (key === 'z' || key === 'Z') {
    undocounter = 0
    currKey = 'z'
    undo()
  } else if (key === 'x' || key === 'X') {
    undocounter = 0
    currKey = 'x'
    redo()
  } else if (key === 's' || key === 'S') {
    localStorage.grid = getGrid()
  } else if (key === 'l' || key === 'L') {
    if (localStorage.grid) {
      reset(localStorage.grid,true)
    }
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
  // printGrid()
}

const getGrid = () => {
  let grid = ""
  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < 14; i++) {
      if (i === player.x && j === player.y) {
        grid += "P"
        continue
      }
      let put = false
      for (let brick of bricks) {
        if (i === brick.x && j === brick.y) {
          grid += "X"
          put = true
          break
        }
      }
      for (let block of blocks) {
        if (i === block.x && j === block.y) {
          grid += "("+block.txt+")"
          put = true
          break
        }
      }
      if (!put) {
        grid += " "
      }
    }
    grid += "\n"
  }
  return "\n"+grid
}

function draw() {
  background(255)
  push()
  scale(sc)
  translate(offset,offset)
  push()
  stroke(170)
  noFill()
  for (let i = 3; i < 13; i++) {
    strokeWeight(i % 3 == 0 ? 0.65 : 0.3)
    line(i*8,16,i*8,88)
  }
  for (let j = 2; j < 12; j++) {
    strokeWeight(j % 3 == 2 ? 0.65 : 0.3)
    line(24,j*8,96,j*8)
  }
  noStroke()
  fill(170)
  textFont("Helvetica")
  textSize(5)
  text("2",8*4+4,8*3+4)
  text("8",8*4+4,8*4+4)
  pop()
  noStroke()
  fill(0)
  updateEnds()
  bricks.forEach(brick => brick.show())
  ends.forEach(end => end.show())
  blocks.forEach(block => block.show())
  player.show()
  pop()
  undoDown = keyIsDown(90)
  redoDown = keyIsDown(88)
  if (undoDown || redoDown) {
    undocounter++
    if (undocounter > 10 && undocounter % 5 == 0) {
      undoORredo = (undoDown && redoDown) ? (currKey == 'z' ? undo : redo) : undoDown ? undo : redo
      undoORredo()
    }
  } else {
    undocounter = 0
    currKey = null
  }
}

const places = () => {
  d = {}
  for (let s of history) {
    pstr = s[0].x+","+s[0].y
    d[pstr] = s
  }
  lst = Object.values(d)
  lst.sort((e1,e2) => (e1[0].y-e2[0].y)*1000+e1[0].x-e2[0].x)
  return lst
}

const f = () => {
  let s = "[";
  for ([p,bs] of history) {
      s += `[new Player(${p.x},${p.y}),[`;
      for (b of bs)
          s += `new Block(${b.x},${b.y},${b.val},"${b.txt}"),`;
      s += "]],";
  }
  s += "]";
  return s;
}

const e = (s1,s2) => (
  s1[0].x == s2[0].x &&
  s1[0].y == s2[0].y &&
  [0,1,2,3,4,5].every(i => (
      s1[1][i].x == s2[1][i].x &&
      s1[1][i].y == s2[1][i].y &&
      s1[1][i].val == s2[1][i].val
  ))
)

const collapse = () => {
  for (let len = history.length; len > 0; len--) {
      for (let i = 0; i < history.length - len; i++) {
          if (e(history[i],history[i+len])) {
              history.splice(i,len)
              return true
          }
      }
  }
  return false
}
