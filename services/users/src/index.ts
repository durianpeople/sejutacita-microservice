import "reflect-metadata";
import express, {Application} from "express";
import {router} from "./Presentation/routes";
import {config as env_config} from 'dotenv'
import init_dependencies from "./dependencies";
import {container} from "tsyringe";

env_config({
    path: '../.env'
})

init_dependencies(container)

const app: Application = express();

app.use('/', router)

app.listen(3000, function () {
    console.log("Server started");
})