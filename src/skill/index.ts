import { Request, Response } from "express";
import * as Alexa from "ask-sdk-core";
import { intents } from "./intents";
import { errors } from "./errors";
import { RequestEnvelope } from "ask-sdk-model";
import { SKILL_ID } from "../util/secrets";
import { sqlAdapter } from "./lib/persistence-adapters";

const alexa = Alexa.SkillBuilders.custom()
    .withSkillId(SKILL_ID)
    .addRequestHandlers(...intents)
    .addErrorHandlers(...errors)
    .withPersistenceAdapter(sqlAdapter)
    .create();

export const handler = async (req: Request, res: Response) => {
    alexa.invoke(req.body as RequestEnvelope, null)
        .then(result => {
            return res.status(200).json(result);
        }).catch(err => {
            return res.status(500).send(err);
        });
};
