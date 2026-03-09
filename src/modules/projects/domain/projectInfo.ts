import { ProjectStatusEnum } from "./projectStatusEnum";

export type ProjectInfo = {
	id: string;
	title: string;
	summary: string;
	status: ProjectStatusEnum;
	lastActive: string;
}

export type UpdateProjectInfo = Partial<ProjectInfo> & {
	id: string;
};
