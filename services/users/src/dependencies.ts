import {DependencyContainer} from "tsyringe";
import {IndexController} from "./Presentation/Controllers/IndexController";

function init_dependencies(container: DependencyContainer) {
    container.register<IndexController>(IndexController, {useValue: new IndexController()})
}

export = init_dependencies;