import express from "express";
import { Pool } from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import route from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());

app.use(passport.session());
app.use("/api", route);
app.listen(3000, () => console.log("app listening on port 3000!"));
