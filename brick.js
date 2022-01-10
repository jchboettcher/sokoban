class Brick {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    rect(0,0,5,2)
    rect(6,0,2,2)
    rect(0,3,7,2)
    rect(0,6,5,2)
    rect(6,6,2,2)
    pop()
  }

}
