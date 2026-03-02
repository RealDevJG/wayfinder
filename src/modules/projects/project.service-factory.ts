import { useUserStore } from "../../state/zustand/userStore";
import { ProjectService } from "./project.service";
import { LocalProjectRepository } from "./repositories/project.local-repo";
import { OnlineProjectRepository } from "./repositories/project.online-repo";

export class ProjectServiceFactory {
	static create() {
		const user = useUserStore.getState().user;

		if (user) {
			return new ProjectService(new OnlineProjectRepository());
		}

		return new ProjectService(new LocalProjectRepository());
	}
}
