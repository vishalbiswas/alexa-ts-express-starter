import { RequestHandler } from "ask-sdk-core";
import { RequestTypes } from "../lib/constants";
import { IsType } from "../lib/helpers";
import { strings } from "../lib/audio-strings";

export const Launch: RequestHandler = {
  canHandle(handlerInput) {
    return IsType(handlerInput, RequestTypes.Launch);
  },
  handle(handlerInput) {
    const speechText = strings.WELCOME;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(strings.SKILL_NAME, speechText)
      .getResponse();
  }
};