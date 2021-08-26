(function () {
  type Combinable = number | string;
  type ResultFormats = "as-text" | "as-number";

  function combine(
    n1: Combinable,
    n2: Combinable, // union type
    format: ResultFormats = "as-text" // literal type
  ) {
    let result;

    if (
      (typeof n1 === "number" && typeof n2 === "number") ||
      format === "as-number"
    ) {
      result = +n1 + +n2;
    } else {
      result = n1.toString() + n2.toString();
    }

    return result;
  }

  const combinedAges = combine(24, 27, "as-text");
  console.log({ combinedAges });

  const combinedNames = combine("denny", "sharon");
  console.log({ combinedNames });
})();
