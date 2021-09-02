// METHOD DECORATORS

// Automatically binds the `this` context of a method to caller
export function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    },
  };
}
