import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import { ExpressAdapter } from "ask-sdk-express-adapter";

// Controllers (route handlers)
import { skill } from "./skill";
import { prod } from "./util/secrets";

// Create Express server
const app = express();
const adapter = new ExpressAdapter(skill, prod, true);

// Express configuration
app.post("/", adapter.getRequestHandlers()); // needs to be done before adding parsers
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;
