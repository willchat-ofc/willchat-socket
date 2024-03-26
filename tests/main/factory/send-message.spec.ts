import { makeSendMessageValidation } from "../../../src/main/factory/send-message/send-message-validator";
import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("SendMessage Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeSendMessageValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key", "message", "userName", "userId"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
