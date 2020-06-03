import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../lib/helpers";
import { IntentTypes } from "../lib/constants";
import { strings } from "../lib/audio-strings";

export const HelloWorld: RequestHandler = {
  canHandle(handlerInput) {
    return IsIntent(handlerInput, IntentTypes.HelloWorld);
  },
  handle(handlerInput) {
    const speechText = strings.HELLO;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(strings.SKILL_NAME, speechText)
      .getResponse();
  }
};