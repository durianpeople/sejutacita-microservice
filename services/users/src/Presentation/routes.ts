import 'reflect-metadata'
import {Router} from "express";
import {container} from "tsyringe";
import {IndexController} from "./Controllers/IndexController";
import {UserController} from "./Controllers/UserController";

export const router: Router = Router()
let index_controller: IndexController = container.resolve(IndexController)
router.get('/', index_controller.index)

router.post('/create', container.resolve(UserController).create)
router.get('/find', container.resolve(UserController).find)
router.get('/list', container.resolve(UserController).list)
router.put('/update', container.resolve(UserController).update)