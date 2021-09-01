(function () {
  // A decorator that binds the correct `this` context for a method
  function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      // Set some logic before users try to access this property, i.e. this method
      get() {
        const boundFn = originalMethod.bind(this); // this refers to whoever calls this getter, i.e. this instance object
        return boundFn;
      },
    };
    return adjustedDescriptor;
  }

  class Printer {
    message = "This works!";

    @AutoBind
    showMessage() {
      console.log(this.message);
    }
  }

  const printer = new Printer();
  const button = document.querySelector("button")!;
  // button.addEventListener("click", printer.showMessage.bind(printer));
  button.addEventListener("click", printer.showMessage); // We don't need to bind manually everytime now
})();
