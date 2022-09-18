class Block {

  constructor(x, y, val, txt) {
    this.x = x
    this.y = y
    this.val = val
    this.txt = txt
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    fill(255)
    rect(1,1,6,6)
    let onDot = 0
    ends.forEach(end => {
      if (end.x === this.x && end.y === this.y) {
        onDot = end.txt === this.txt ? 2 : 1
      }
    })
    fill(onDot == 2 ? color(50,156,20) : !!onDot ? color(20,50,156) : color(0))
    // circle(4,4,8)
    // fill(255)
    // circle(4,4,6)
    // fill(this.col)
    rect(0,0,8,1)
    rect(0,1,1,6)
    rect(7,1,1,6)
    rect(0,7,8,1)
    textStyle(BOLD)
    // text(this.val.toString(),4,4)
    text(this.txt,4,4)
    pop()
  }

}
