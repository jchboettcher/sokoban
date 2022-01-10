class End {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    circle(4,4,2)
    pop()
  }
}
