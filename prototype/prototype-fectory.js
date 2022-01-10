class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return `Suite ${this.suite}, ` + `${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  toString() {
    return `${this.name} lives at ${this.address}`;
  }
  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` + `I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
    console.log(this.types);
  }
  markRecursive(object) {
    let idx = this.types.findIndex((t) => t.name === object.constructor.name);
    if (idx !== -1) {
      object["typeIndex"] = idx;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }
  reconstructRecusrive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
          obj[key] = this.reconstructRecusrive(object[key]);
        }
      }

      delete obj["typeIndex"];
      return obj;
    }

    return object;
  }
  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecusrive(copy);
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }
  static newOfficeMainEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }
  static newOfficeMainEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(
  null,
  new Address(null, "123 East Dr", "London")
);
EmployeeFactory.aux = new Employee(
  null,
  new Address(null, "123 ", "200 London Road", "Oxford")
);

let john = EmployeeFactory.newMainOfficeEmployee("John", 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee("Jane", 222);
console.log(john.toString());
console.log(jane.toString());
