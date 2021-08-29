(function () {
  type Admin = {
    name: string;
    privileges: string[];
  };

  type Employee = {
    name: string;
    startDate: Date;
  };

  type ElevatedEmployee = Admin & Employee; // Intersaction type of object types is similar to interface & extends

  // interface Admin {
  //   name: string;
  //   privileges: string[];
  // }
  // interface Employee {
  //   name: string;
  //   startDate: Date;
  // }
  // interface ElevatedEmployee extends Admin, Employee {}

  const e1: ElevatedEmployee = {
    name: "Denny",
    privileges: ["Read", "Write"],
    startDate: new Date(),
  };

  console.log({ e1 });

  // The intersaction of union types is what they have in common
  type Combinable = string | number;
  type Numeric = number | boolean;
  type Universal = Combinable & Numeric; // number is what in common
  const num: Universal = 3;
  console.log(num);

  // type guards helps us to know which exact type we are getting at run time
  function add(a: Combinable, b: Combinable) {
    // the typeof type guard
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  add(1, 1);

  type UnknownEmployee = Employee | Admin;

  function printEmployeeInfo(employee: UnknownEmployee) {
    console.log("Name: " + employee.name);

    // 'prop' in object type guard
    if ("privileges" in employee) {
      console.log("Privileges: " + employee.privileges);
    }

    if ("startDate" in employee) {
      console.log("startDate: " + employee.startDate.toLocaleDateString());
    }
  }

  printEmployeeInfo(e1);
  printEmployeeInfo({
    name: "Denny",
    startDate: new Date(),
  });

  class Car {
    drive() {
      console.log("Driving");
    }
  }

  class Truck {
    drive() {
      console.log("Driving");
    }

    loadCargo(weight: number) {
      console.log(`Loading cargo, weight: ${weight}.`);
    }
  }

  type Vehicle = Car | Truck;

  function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    // the instance of class type guard
    if (vehicle instanceof Truck) {
      vehicle.loadCargo(4);
    }
  }

  const v1 = new Car();
  const v2 = new Truck();
  useVehicle(v1);
  useVehicle(v2);

  // the 'discriminated unions' type guard
  interface Bird {
    type: "bird"; // give each item in the discriminated union a same property of literal type
    flyingSpeed: number;
  }

  interface Horse {
    type: "horse";
    runningSpeed: number;
  }

  type Animal = Bird | Horse;
  function moveAnimal(animal: Animal) {
    let speed: number;
    switch (animal.type) {
      case "bird": {
        speed = animal.flyingSpeed;
        break;
      }
      case "horse": {
        speed = animal.runningSpeed;
        break;
      }
    }
    console.log("Moving at speed: " + speed);
  }

  moveAnimal({ type: "bird", flyingSpeed: 40 });
})();
