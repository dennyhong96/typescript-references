(function () {
  class Storage<
    T
    // extends number | string | boolean
  > {
    private data: T[] = [];

    addItem(item: T) {
      this.data.push(item);
    }

    removeItem(item: T) {
      this.data = this.data.filter((i) => i !== item);
    }

    getItems() {
      return [...this.data];
    }
  }

  const textStorage = new Storage<string>();
  textStorage.addItem("Denny");
  textStorage.addItem("Sharon");
  console.log(textStorage.getItems());

  const numberStorage = new Storage<number>();
  numberStorage.addItem(10);

  const objStorage = new Storage<object>();
  const dennyObj = { name: "Denny" };
  const sharonObj = { name: "Sharon" };
  objStorage.addItem(dennyObj);
  objStorage.addItem(sharonObj);
  objStorage.removeItem(dennyObj);
  console.log(objStorage.getItems());
})();
