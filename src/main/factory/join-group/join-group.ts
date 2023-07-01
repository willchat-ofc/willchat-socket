import { JoinGroupEvent } from "../../../presentation/events/join-group";
import { makeJoinGroupValidation } from "./join-group-validation";

export const makeJoinGroupEvent = () => {
  const validate = makeJoinGroupValidation();
  const joinGroupEvent = new JoinGroupEvent(validate);

  return joinGroupEvent;
};
