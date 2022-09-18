class End {

  constructor(x, y, txt) {
    this.x = x
    this.y = y
    this.txt = txt
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    circle(4,4,2)
    pop()
  }
}
