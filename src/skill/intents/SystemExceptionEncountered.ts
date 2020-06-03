import { RequestHandler } from "ask-sdk-core";
import { RequestTypes } from "../lib/constants";
import { IsType } from "../lib/helpers";
import logger from "../../util/logger";

export const SystemExceptionEncountered: RequestHandler = {
  canHandle(handlerInput) {
    return IsType(handlerInput, RequestTypes.SystemExceptionEncountered);
  },
  handle(handlerInput) {
    logger.error(handlerInput.requestEnvelope);

    return handlerInput.responseBuilder
      .getResponse();
  }
};