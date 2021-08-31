// Use index property when we don't know in advance what property names we will have, or how many properties there will be.
interface ErrorContainer {
  // id: string; // Pre-defined properties must have same type as index property
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  0: "Something went wrong.", // number can be treated as a string
  email: "This email is already taken",
  password: "Password is too short.",
};
