class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }
  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    //console.log(this.handlers);
    //console.log("=====sender==", sender, args);
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

class FallsIllArgs {
  constructor(address) {
    this.address = address;
  }
}
// class Person {
//   constructor(address) {
//     this.address = address;
//     this.fallsIll = new Event();
//   }

//   catchCold() {
//     this.fallsIll.fire(this, new FallsIllArgs(this.address));
//   }
// }
// let person = new Person("123 london Road");
// let sub = person.fallsIll.subscribe((s, a) =>
//   console.log(`A doctor has been called  to ${a.address}`)
// );

// person.catchCold();
// person.catchCold();
// person.fallsIll.unsubscribe(sub);
// person.catchCold();

class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChanged = new Event();
  }

  get age() {
    return this._age;
  }
  set age(value) {
    if (!value || this._age === value) {
      return;
    }
    this._age = value;
    this.propertyChanged.fire(this, new PropertyChangedArgs("age", value));
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    this.token = person.propertyChanged.subscribe(this.age_changed.bind(this));
  }
  age_changed(sender, args) {
    if (sender === this.person && args.name === "age") {
      if (args.newValue < 13) {
        console.log(`Sorry , you are still to young`);
      } else {
        console.log(`okay you can register`);
        sender.propertyChanged.unsubscribe(this.token);
      }
    }
  }
}

let person = new Person("john");
let registerChecker = new RegistrationChecker(person);

for (let i = 10; i < 20; i++) {
  person.age = i;
}
