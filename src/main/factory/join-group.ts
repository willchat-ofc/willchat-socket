import { JoinGroupEvent } from "../../presentation/events/join-group";

export const makeJoinGroupEvent = () => {
  const joinGroupEvent = new JoinGroupEvent();

  return joinGroupEvent;
};
