import { ProjectStatus } from "./projectStatus";

export interface ProjectInfo {
	id: string;
	title: string;
	summary: string;
	status: ProjectStatus;
	lastActive: string;
}
