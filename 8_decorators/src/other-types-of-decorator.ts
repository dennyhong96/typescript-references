(function () {
  // For property decorators, target is the prototype of the instance object
  // For static property decorators, target is the constructor
  function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator!");
    console.log({ target }, { propertyName });
  }

  // Accessors decorators can return a new PropertyDescriptor
  function Log2(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("Accessor decorator!");
    console.log({ target }, { name }, { descriptor });
  }

  // Method decorators can return a new PropertyDescriptor
  function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("Method decorator!");
    console.log({ target }, { name }, { descriptor });
  }

  function Log4(
    target: any,
    name: string | Symbol,
    position: number // position of the parameter
  ) {
    console.log("Parameter decorator!");
    console.log({ target }, { name }, { position });
  }

  // @ts-ignore
  // All types of decorators ran when this class is defined, not at run-time
  // Decorator do extra behind the scene setup work for the class (meta-programming)
  class Product {
    @Log // property decorator is ran as soon as the class is defined
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
      this.title = title;
      this._price = price;
    }

    @Log2 // Accessors decorators can return something
    set price(newPrice: number) {
      if (newPrice > 0) {
        this._price = newPrice;
      } else {
        throw new Error("Price should be greater than 0.");
      }
    }

    get price() {
      return this._price;
    }

    @Log3 // Method decorators can return something
    getPriceWithTax(@Log4 tax: number) {
      return this.price * (1 + tax);
    }
  }

  const book = new Product("Book", 19);
  const book2 = new Product("Book 2", 28);
  console.log({ book, book2 });
})();
