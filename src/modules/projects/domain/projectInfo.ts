import { ProjectStatusEnum } from "./projectStatusEnum";

export type ProjectInfo = {
	id: string;
	title: string;
	summary: string;
	status: ProjectStatusEnum;
	lastActive: string;
}
