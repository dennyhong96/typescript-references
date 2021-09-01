(function () {
  // Array generic type
  const names: Array<string> = ["denny", "sharon"];
  names[0].split(" ");

  // Promise generic type
  const promise: Promise<string> = new Promise((resolve) => resolve("Nice!"));
  promise.then((data) => data.split(" "));
})();
