(function () {
  let input: unknown;
  // let input: any;
  let inputString: string;

  input = "5";
  // inputString = input; // typescript throws error with unkown, where it doesn't throw with any
  if (typeof input === "string") {
    inputString = input;
  }

  console.log({ inputString });

  const generateError = (msg: string, code: number) => {
    // implicit never return type
    throw { msg, code };
  };
  generateError("Error", 400);

  const neverReturn = () => {
    while (true) {}
  };
})();
