import { ErrorHandler } from "ask-sdk-core";
import logger from "../../util/logger";
import { strings } from "../lib/audio-strings";

/**
 * Handles unknown errors. Should be placed at the end, as it will catch
 * all errors.
 */
export const Unknown: ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    logger.error(`Error handled: ${error.message}`);

    const speechText = strings.ERROR;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};