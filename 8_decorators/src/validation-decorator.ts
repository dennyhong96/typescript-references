(function () {
  interface ValidatorConfig {
    [constructorName: string]: {
      [validateProp: string]: string[];
    };
  }

  const registeredValidators: ValidatorConfig = {};

  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [
        ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
        "required",
      ],
    };
  }

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [
        ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
        "positive",
      ],
    };
  }

  function validate(obj: any) {
    const validateProps = registeredValidators[obj.constructor.name];

    if (!validateProps) return true;

    let isValid = true;

    for (const propName in validateProps) {
      const validators = validateProps[propName];

      for (const validator of validators) {
        switch (validator) {
          case "required": {
            isValid = isValid && !!obj[propName];
            break;
          }
          case "positive": {
            isValid = isValid && obj[propName] > 0;
            break;
          }
        }
      }
    }

    return isValid;
  }

  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  const form: HTMLFormElement = document.querySelector("form")!;
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const titleEl: HTMLInputElement = form.querySelector("#title")!;
    const priceEl: HTMLInputElement = form.querySelector("#price")!;
    const title = titleEl.value;
    const price = Number(priceEl.value);

    const course = new Course(title, price);

    if (!validate(course)) {
      return alert("Please enter valid inputs.");
    }

    titleEl.value = "";
    priceEl.value = "";
    console.log({ course });
  });
})();
