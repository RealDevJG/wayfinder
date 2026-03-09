import { WAYFINDER_API_CLIENT } from "../../../shared/api/axios/clients";
import { ProjectInfo, UpdateProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";
import { IProjectRepository } from "./project.abstract-repo";

export class OnlineProjectRepository implements IProjectRepository {
	fetchProjectData(): Promise<ProjectInfo[] | null> {
		return WAYFINDER_API_CLIENT.get("/projects").then(async (res) => {
			return (await res.data) as ProjectInfo[];
		});
	}

	addProjectData(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return WAYFINDER_API_CLIENT.post("/projects", { title, summary, status });
	}

	updateProjectData(projectData: UpdateProjectInfo): Promise<void> {
		const { id: projectId, ...projectDto } = projectData;
		return WAYFINDER_API_CLIENT.patch(`/projects/${projectId}`, projectDto);
	}

	deleteProject(projectId: string): Promise<void> {
		return WAYFINDER_API_CLIENT.delete(`/projects/${projectId}`);
	}
}
