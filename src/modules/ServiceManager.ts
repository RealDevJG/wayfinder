import { UserService } from "./auth/user.service";
import { ProjectService } from "./projects/project.service";
import { ProjectServiceFactory } from "./projects/project.service-factory";

class ServiceManager {
	private _userService: UserService;
	private _projectService: ProjectService;

	constructor() {
		this._userService = new UserService(this.userUpdated.bind(this));
		this._projectService = ProjectServiceFactory.create();
	}

	get userService() {
		return this._userService;
	}

	get projectService() {
		return this._projectService;
	}

	userUpdated() {
		this._projectService = ProjectServiceFactory.create();
	}
}

export const services = new ServiceManager();
