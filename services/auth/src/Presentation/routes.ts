import {Router} from "express";
import {container} from "tsyringe";
import {IndexController} from "./Controllers/IndexController";

export const router: Router = Router()
router.get('/', container.resolve(IndexController).index)