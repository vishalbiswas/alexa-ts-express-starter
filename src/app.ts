import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";

// Controllers (route handlers)
import { handler } from "./skill";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.post("/", handler);

export default app;
