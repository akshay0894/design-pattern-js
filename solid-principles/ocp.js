let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  huge: "huge",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  // state space explosion
  // 3 criteria (+weight) = 7 methods

  // OCP = open for extension, closed for modification
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];
let pf = new ProductFilter();
// console.log(`Green Products(old)`);
// for (let p of pf.filterByColor(products, Color.green)) {
//   console.log(`${p.name} is green`);
// }

//before
//to make code according to ocp , we follow certain steps:-

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }
  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSepicification {
  constructor(...specs) {
    this.specs = specs;
  }
  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

class OrSepicification {
  constructor(...specs) {
    this.specs = specs;
  }
  isSatisfied(item) {
    return this.specs.some((x) => x.isSatisfied(item));
  }
}

class BetterFilter {
  constructor() {}
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log(`green Products(new)`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(`${p.name} is geen`);
}
