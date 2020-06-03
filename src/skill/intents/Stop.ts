import { RequestHandler } from "ask-sdk-core";
import { IntentTypes } from "../lib/constants";
import { IsIntent } from "../lib/helpers";
import { strings } from "../lib/audio-strings";

export const Stop: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
  },
  handle(handlerInput) {
    const speechText = strings.BYE;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(strings.SKILL_NAME, speechText)
      .getResponse();
  }
};