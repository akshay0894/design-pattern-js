class Shape {}
class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }
  resize(factor) {
    this.radius *= factor;
  }
  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(side = 0) {
    super();
    this.side = side;
  }
  toString() {
    return `A square of side ${this.side}`;
  }
}
//we dont want Colored Circle or colored Square
class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return (
      `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`
    );
  }
}

let circle = new Circle(2);

let redCircle = new ColoredShape(circle, "red");
console.log(redCircle.toString());
// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);

let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
