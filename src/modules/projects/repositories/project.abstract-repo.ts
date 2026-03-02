import { ProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";

export interface IProjectRepository {
	fetchProjectData: () => Promise<ProjectInfo[] | null>;
	addProjectData: (title: string, summary: string, status: ProjectStatusEnum) => Promise<void>;
	updateProjectData: (projectId: string, title: string, summary: string, status: ProjectStatusEnum) => Promise<void>;
	deleteProject: (projectId: string) => Promise<void>;
}
