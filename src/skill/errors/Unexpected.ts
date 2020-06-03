import { ErrorHandler } from "ask-sdk-core";
import { ErrorTypes } from "../lib/constants";
import logger from "../../util/logger";
import { strings } from "../lib/audio-strings";

/**
 * Handles ErrorTypes.Unexpected errors which should be thrown when something
 * unexpected happens.
 */
export const Unexpected: ErrorHandler = {
  canHandle(_, error) {
    return error.name === ErrorTypes.Unexpected;
  },
  handle(handlerInput, error) {
    logger.error(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(strings.ERROR_UNEXPECTED)
      .getResponse();
  },
};