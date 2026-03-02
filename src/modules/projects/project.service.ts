import { ProjectInfo } from "./domain/projectInfo";
import { ProjectStatusEnum } from "./domain/projectStatusEnum";
import { IProjectRepository } from "./repositories/project.abstract-repo";

export class ProjectService {
	constructor(private readonly repository: IProjectRepository) {}

	fetchProjectData(): Promise<ProjectInfo[] | null> {
		return this.repository.fetchProjectData();
	}

	addProjectData(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return this.repository.addProjectData(title, summary, status);
	}

	updateProjectData(projectId: string, title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return this.repository.updateProjectData(projectId, title, summary, status);
	}

	deleteProject(projectId: string): Promise<void> {
		return this.repository.deleteProject(projectId);
	}
}
