//Person builder examle in which we build complex objects using builder facet

// class Person {
//   constructor() {
//     this.streetAddress = this.postcode = this.city = "";
//     this.annualIncome = 0;
//     this.companyName = this.position = "";
//   }

//   toString() {
//     return (
//       `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
//       `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
//     );
//   }
// }

// class PersonBuilder {
//   constructor(person = new Person()) {
//     this.person = person;
//   }

//   get lives() {
//     return new PersonAddressBuilder(this.person);
//   }

//   get works() {
//     return new PersonJobBuilder(this.person);
//   }

//   build() {
//     return this.person;
//   }
// }
// class PersonAddressBuilder extends PersonBuilder {
//   constructor(person) {
//     super(person);
//   }
//   at(streetAddress) {
//     this.person.streetAddress = streetAddress;
//     return this;
//   }
//   withPostcode(postcode) {
//     this.person.postcode = postcode;
//     return this;
//   }
//   in(city) {
//     this.person.city = city;
//     return this;
//   }
// }

// class PersonJobBuilder extends PersonBuilder {
//   constructor(person) {
//     super(person);
//   }
//   at(companyName) {
//     this.person.companyName = companyName;
//     return this;
//   }
//   asA(position) {
//     this.person.position = position;
//     return this;
//   }
//   earning(annualIncome) {
//     this.person.annualIncome = annualIncome;
//     return this;
//   }
// }

// let pb = new PersonBuilder();
// let person = pb.lives
//   .at("233")
//   .withPostcode("122331")
//   .in("Delhi")
//   .works.at("Fabrikam")
//   .asA("Engineer")
//   .earning(123000)
//   .build();

// console.log(person.toString());

// exercise for builder facet
class Field {
  constructor(name) {
    this.name = name;
  }
}

class Class {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }
  toString() {
    let buffer = [];
    buffer.push(`class ${this.name} {\n`);

    if (this.fields.length > 0) {
      buffer.push(`  constructor(`);
      for (let i = 0; i < this.fields.length; ++i) {
        buffer.push(this.fields[i].name);
        if (i + 1 !== this.fields.length) buffer.push(", ");
      }
      buffer.push(`) {\n`);
      for (let field of this.fields) {
        buffer.push(`    this.${field.name} = ${field.name};\n`);
      }
      buffer.push("  }\n");
    }

    buffer.push("}");
    return buffer.join("");
  }
}

class CodeBuilder {
  constructor(className) {
    this._class = new Class(className);
  }
  addField(name) {
    this._class.fields.push(new Field(name));
    return this;
  }
  toString() {
    return this._class.toString();
  }
}

let cb = new CodeBuilder("Person");
cb.addField("name").addField("age");
console.log(cb.toString());
