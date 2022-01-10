class Player {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  move(dir) {
    const x = this.x + dir[0]
    const y = this.y + dir[1]
    const pushed = []
    let mx = 0
    let found = true
    let newx = x
    let newy = y
    while (found) {
      found = false
      for (let block of blocks) {
        if (block.x === newx && block.y === newy) {
          found = true
          mx = max(block.val,mx)
          newx += dir[0]
          newy += dir[1]
          pushed.push(block)
        }
      }
    }
    if (checkBrick(newx,newy)) {
      return
    }
    if (mx > pushed.length) {
      return
    }
    for (let block of pushed) {
      block.x += dir[0]
      block.y += dir[1]
    }
    this.x = x
    this.y = y
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

  show() {
    push()
    translate(this.x*8,this.y*8)
    fill(255)
    rect(0,0,8,8)
    fill(0)
    rect(2,0,4,1)
    rect(1,1,6,1)
    rect(2,2,1,1)
    rect(5,2,1,2)
    rect(2,3,1,1)
    rect(3,4,1,1)
    rect(4,4,1,1)
    rect(2,5,1,1)
    rect(3,5,2,2)
    rect(5,5,1,1)
    rect(2,7,2,1)
    rect(4,7,2,1)
    pop()
  }

}
