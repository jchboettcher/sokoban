class End {

  constructor(x, y, txt) {
    this.x = x
    this.y = y
    this.txt = txt
    this.activated = false
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    // fill(this.activated ? color(20,50,156) : color(0))
    if (this.activated) {
    //   text("✶",4,4)
    // } else {
      circle(4,4,2)
    }
    pop()
  }
}
