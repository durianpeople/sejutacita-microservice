import 'reflect-metadata'
import {Router} from "express";
import {container} from "tsyringe";
import {IndexController} from "./Controllers/IndexController";
import {UserController} from "./Controllers/UserController";
import {AuthController} from "./Controllers/AuthController";
import {AdminMiddleware} from "./Middleware/AdminMiddleware";

export const router: Router = Router()
let index_controller: IndexController = container.resolve(IndexController)
router.get('/', index_controller.index)

let admin_middleware = new AdminMiddleware();

router.get('/find', container.resolve(UserController).find)
router.post('/login', container.resolve(AuthController).login)

router.post('/create', admin_middleware.check, container.resolve(UserController).create)
router.get('/list', admin_middleware.check, container.resolve(UserController).list)
router.put('/update/:id', admin_middleware.check, container.resolve(UserController).update)
router.delete('/delete/:id', admin_middleware.check, container.resolve(UserController).delete)


