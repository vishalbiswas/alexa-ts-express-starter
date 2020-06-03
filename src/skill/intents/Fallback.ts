import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../lib/helpers";
import { IntentTypes } from "../lib/constants";
import { strings } from "../lib/audio-strings";

export const Fallback: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.Fallback);
  },
  handle(handlerInput) {
    const speechText = strings.ERROR;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(strings.HELP)
      .getResponse();
  }
};