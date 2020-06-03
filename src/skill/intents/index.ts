import { Launch } from "./Launch";
import { HelloWorld } from "./HelloWorld";
import { Help } from "./Help";
import { Stop } from "./Stop";
import { SessionEnded } from "./SessionEnded";
import { SystemExceptionEncountered } from "./SystemExceptionEncountered";
import { Fallback } from "./Fallback";

export const intents = [
  Launch,
  HelloWorld,
  Help,
  Stop,
  SessionEnded,
  SystemExceptionEncountered,
  Fallback
];
