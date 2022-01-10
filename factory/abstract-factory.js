const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log(`tea is ready to consume`);
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`coffee is ready to consume`);
  }
}

class HotDrinkFactory {
  prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

let AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
});

class HotDrinkMachine {
  constructor() {
    this.factories = [];
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }
  makeDrink(type) {
    switch (type) {
      case "tea":
        return new TeaFactory().prepare();
      case "coffee":
        return new CoffeeFactory().prepare();
      default:
        throw new Error("Unknown type");
    }
  }

  interact(consumer) {
    rl.question("Please specify drink", (answer) => {
      let parts = answer.split(" ");
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

let machine = new HotDrinkMachine();
machine.interact(function (drink) {
  drink.consume();
});
// rl.question("which drink", function (answer) {
//   let drink = machine.makeDrink(answer);
//   drink.consume();
//   rl.close();
// });
