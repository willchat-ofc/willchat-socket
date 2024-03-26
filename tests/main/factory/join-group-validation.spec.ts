import { makeJoinGroupValidation } from "../../../src/main/factory/join-group/join-group-validation";
import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("JoinGroup Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeJoinGroupValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
