(function () {
  function add(
    n1: number,
    n2: number,
    showResult: boolean,
    resultPhrase: string
  ) {
    const result = n1 + n2;
    if (showResult) {
      console.log(`${resultPhrase}${result}`);
      return;
    } else {
      return `${resultPhrase} ${result}`;
    }
  }

  const num1 = 5;
  const num2 = 2.8;

  add(num1, num2, true, "The result is: ");
})();
