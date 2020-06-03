import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../lib/helpers";
import { IntentTypes } from "../lib/constants";
import { strings } from "../lib/audio-strings";

export const Help: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.Help);
  },
  handle(handlerInput) {
    const speechText = strings.HELP;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(strings.SKILL_NAME, speechText)
      .getResponse();
  }
};