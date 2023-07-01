import type { Validation } from "../../../protocols/validation";

export class RequiredFieldValidation implements Validation {
  public constructor(private readonly fieldName: string) {}

  public validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new Error("Required parameter '" + this.fieldName + "'");
    }
  }
}
