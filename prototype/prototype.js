class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }
  toString() {
    return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
  }
}

class Person {
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

let john = new Person("John", new Address("123 London Road", "London", "UK"));

let jane = JSON.parse(JSON.stringify(john));

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

john.greet();
//this will not work because this object is not build  from constructor
//jane.greet();

let s = new Serializer([Person, Address]);
jane = s.clone(john);
jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString());
console.log(jane.toString());
