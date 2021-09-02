// INPUT VALIDATION

namespace App {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().length !== 0;
    }

    if (
      validatableInput.minLength !== undefined &&
      validatableInput.minLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.trim().length >= validatableInput.minLength;
    }

    if (
      validatableInput.maxLength !== undefined &&
      validatableInput.maxLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.trim().length <= validatableInput.maxLength;
    }

    if (
      validatableInput.max !== undefined &&
      validatableInput.max !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    if (
      validatableInput.min !== undefined &&
      validatableInput.min !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    return isValid;
  }
}
