(function () {
  type Add = (n1: number, n2: number) => number;

  function add(n1: number, n2: number) {
    // inferred number return type
    return n1 + n2;
  }

  const num1 = 5;
  const num2 = 2.8;

  const printResult = (num: number) => {
    console.log("Result: " + num);
    // inferred void return type
  };

  const printResultAlt = (num: number): undefined => {
    console.log("Result(alt): " + num);
    // if return type is specified as undefined, must use return keyword
    return;
  };

  printResult(add(num1, num2));
  printResultAlt(add(num1, num2));

  let addNumbers: Add = add;
  // addNumbers = 5;
  printResult(addNumbers(num1, num2));

  // Callback type
  function addAddHandle(n1: number, n2: number, cb: (res: number) => void) {
    const result = n1 + n2;
    cb(result);
  }
  addAddHandle(num1, num2, (res) => {
    console.log(res);
    return res; // Can return a number even though return type is void, because void simply means ignore the return
  });
})();
