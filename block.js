class Block {

  constructor(x, y, val) {
    this.x = x
    this.y = y
    this.val = val
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    fill(255)
    rect(0,0,8,8)
    fill(0)
    rect(0,0,8,1)
    rect(0,1,1,6)
    rect(7,1,1,6)
    rect(0,7,8,1)
    textAlign(CENTER,CENTER)
    textSize(5)
    text(this.val.toString(),4,4)
    pop()
  }

}
