import 'reflect-metadata'
import {Router} from "express";
import {container} from "tsyringe";
import {IndexController} from "./Controllers/IndexController";

export const router: Router = Router()
let index_controller: IndexController = container.resolve(IndexController)
router.get('/', index_controller.index)