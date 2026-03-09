import { ProjectInfo, UpdateProjectInfo } from "./domain/projectInfo";
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

	updateProjectData(projectData: UpdateProjectInfo): Promise<void> {
		return this.repository.updateProjectData(projectData);
	}

	deleteProject(projectId: string): Promise<void> {
		return this.repository.deleteProject(projectId);
	}
}
