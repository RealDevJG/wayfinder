import { ProjectInfo, UpdateProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";
import { IProjectRepository } from "./project.abstract-repo";

export class LocalProjectRepository implements IProjectRepository {
	fetchProjectData(): Promise<ProjectInfo[] | null> {
		return Promise.resolve(null);
	}

	addProjectData(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return Promise.resolve();
	}

	updateProjectData(projectData: UpdateProjectInfo): Promise<void> {
		return Promise.resolve();
	}

	deleteProject(projectId: string): Promise<void> {
		return Promise.resolve();
	}
}
