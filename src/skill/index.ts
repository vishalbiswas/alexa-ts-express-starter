import * as Alexa from "ask-sdk-core";
import { intents } from "./intents";
import { errors } from "./errors";
import { SKILL_ID } from "../util/secrets";
import { sqlAdapter } from "./lib/persistence-adapters";

export const skill = Alexa.SkillBuilders.custom()
    .withSkillId(SKILL_ID)
    .addRequestHandlers(...intents)
    .addErrorHandlers(...errors)
    .withPersistenceAdapter(sqlAdapter)
    .create();
