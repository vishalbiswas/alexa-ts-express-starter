import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, services } from "ask-sdk-model";
import { RequestTypes, ErrorTypes } from "../lib/constants";

/**
 * Checks if the request matches any of the given intents.
 * 
 * @param handlerInput 
 * @param intents 
 */
export function IsIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        for (let i = 0; i < intents.length; i++) {
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if the request matches any of the given types.
 * 
 * @param handlerInput 
 * @param types 
 */
export function IsType(handlerInput: HandlerInput, ...types: string[]): boolean {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if the request matches the given intent and dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 * @param state 
 */
export function IsIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}

/**
 * Checks if the request matches the given intent with a non COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithIncompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== "COMPLETED";
}

/**
 * Checks if the request matches the given intent with the COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithCompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return IsIntentWithDialogState(handlerInput, intent, "COMPLETED");
}

/**
 * Wraps the given string as an interjection.
 * 
 * @param str 
 */
export function Interject(str: string): string {
    return `<say-as interpret-as="interjection">${str}</say-as>`;
}

/**
 * Creates an error with the given message and type.
 * 
 * @param msg 
 * @param type 
 */
export function CreateError(
    msg: string = "Something unexpected happened.",
    type: string = ErrorTypes.Unknown
): Error {
    const error = new Error(msg);
    error.name = type;

    return error;
}

/**
 * Selects a random element from the array;
 * 
 * @param arr 
 */
export function Random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a VoicePlayer.Speak directive with the given speech. Useful for sending progressive responses.
 * 
 * @param handlerInput 
 * @param speech 
 */
export function VoicePlayerSpeakDirective(handlerInput: HandlerInput, speech?: string): services.directive.SendDirectiveRequest {
    const requestId = handlerInput.requestEnvelope.request.requestId;

    return {
        directive: {
            type: "VoicePlayer.Speak",
            speech: speech,
        },
        header: {
            requestId,
        },
    };
}