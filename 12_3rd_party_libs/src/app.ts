import { Product } from "./product.model";

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

// declare tells typescript we know this will be there at runtime
declare var GLOBAL: string;
console.log(GLOBAL);

const book = new Product("Book", 9.99);
console.log(book.getInformation());

const products = [
  { title: "Carpet", price: 6.99 },
  { title: "Book", price: 12.99 },
];

const loadedProducts = plainToClass(Product, products);
loadedProducts.forEach((p) => console.log(p.getInformation()));

const newProduct = new Product("", -5.99);
validate(newProduct).then((errors) => {
  if (errors.length) {
    console.error("Validation failed, errors: ", errors);
  } else {
    console.log(newProduct.getInformation());
  }
});
