class Brick {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    push()
    translate(this.x*8,this.y*8)
    // stroke(0)
    // strokeWeight(0.25)
    // fill(140)
    fill(255)
    rect(0,0,8,8)
    // circle(2.2,2.2,1.05)
    // circle(2.2,5.8,1.05)
    // circle(5.8,2.2,1.05)
    // circle(5.8,5.8,1.05)
    fill(0)
    rect(0,0,5,2)
    rect(6,0,2,2)
    rect(0,3,7,2)
    rect(0,6,5,2)
    rect(6,6,2,2)
    pop()
  }

}
