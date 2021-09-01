(function () {
  // the keyof constraint
  function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
  ) {
    return `Value: ${obj[key]}`;
  }

  console.log(extractAndConvert({ name: "Denny", age: 24 }, "name"));
})();
