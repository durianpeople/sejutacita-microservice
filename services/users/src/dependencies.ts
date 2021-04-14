import 'reflect-metadata'
import {DependencyContainer} from "tsyringe";
import {UserRepositoryInterface} from "./Core/Domain/Repository/UserRepositoryInterface";
import {UserRepository} from "./Infrastructure/Repository/UserRepository";

function init_dependencies(container: DependencyContainer) {
    container.register<UserRepositoryInterface>("UserRepositoryInterface", {useClass: UserRepository})
}

export = init_dependencies;