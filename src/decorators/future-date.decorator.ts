import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      name: "isFutureDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const currentDate = new Date();
          const inputDate = new Date(value);

          // Check if the input date is in the future
          return inputDate > currentDate;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a future date`;
        },
      },
    });
  };
}
