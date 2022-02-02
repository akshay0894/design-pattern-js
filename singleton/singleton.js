//normal singleton pattern
class Singleton {
  constructor() {
    console.log(this.constructor);
    // const instance = this.constructor.instance;
    // if (instance) {
    //   return instance;
    // }
    this.name = "abc";
    // this.constructor.instance = this;
    console.log(this.constructor);
  }
}
const s1 = new Singleton();
console.log(s1);
const s2 = new Singleton();
console.log(`is s1 === s2: ${s1 === s2} `);

//mono state singleton pattern
class ChiefExecutveOfficer {
  get name() {
    return ChiefExecutveOfficer._name;
  }
  set name(value) {
    ChiefExecutveOfficer._name = value;
  }

  get age() {
    return ChiefExecutveOfficer._age;
  }

  set age(value) {
    ChiefExecutveOfficer._age = value;
  }
  toString() {
    console.log(`ceo name is ${this.name} and age is ${this.age} yrs old`);
  }
}

ChiefExecutveOfficer._age = undefined;
ChiefExecutveOfficer._name = undefined;

// let ceo = new ChiefExecutveOfficer();
// ceo.name = "Adam";
// ceo.age = "55";

// let ceo2 = new ChiefExecutveOfficer();
// ceo2.name = "John";
// ceo2.age = "54";

// ceo.toString();
