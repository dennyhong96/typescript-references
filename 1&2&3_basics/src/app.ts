const button = document.querySelector("button")!;

button.addEventListener("click", function () {
  console.log("clicked");
});

const add = (a: number, b: number) => {
  if (a + b > 0) return a + b;
  return;
};
