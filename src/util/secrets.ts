import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const SKILL_ID = process.env["SKILL_ID"];

if (!SKILL_ID) {
    logger.error("No Amazon Alexa Skill ID. Set SKILL_ID environment variable.");
    process.exit(1);
}

export const MYSQL_CONF = {
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USER"],
    pass: process.env["MYSQL_PASS"],
    db: process.env["MYSQL_DB"]
};

if (Object.values(MYSQL_CONF).some(value => !value)) {
    logger.error("MySQL configuration incomplete. Set all MYSQL_* environment variables.");
    process.exit(1);
}
