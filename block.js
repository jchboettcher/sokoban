class Block {

  constructor(x, y, val, col) {
    this.x = x
    this.y = y
    this.val = val
    this.col = color(0)
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    fill(255)
    rect(1,1,6,6)
    let onDot = false
    ends.forEach(end => {
      if (end.x === this.x && end.y === this.y) {
        onDot = true
      }
    })
    fill(onDot ? color(20,50,156) : this.col)
    // circle(4,4,8)
    // fill(255)
    // circle(4,4,6)
    // fill(this.col)
    rect(0,0,8,1)
    rect(0,1,1,6)
    rect(7,1,1,6)
    rect(0,7,8,1)
    textStyle(BOLD)
    text(this.val === 1 ? "1" : this.val === 2 ? "2" : "3",4,4)
    pop()
  }

}
