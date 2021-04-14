import "reflect-metadata";
import express, {Application} from "express";
import {router} from "./Presentation/routes";
import {config as env_config} from 'dotenv'
import init_dependencies from "./dependencies";
import {container} from "tsyringe";
import init_messages from "./messages";
import bodyParser from "body-parser";

env_config({
    path: '../.env'
})

init_dependencies(container)
init_messages(container)

const app: Application = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use('/', router)

app.listen(3000, function () {
    console.log("Server started");
})