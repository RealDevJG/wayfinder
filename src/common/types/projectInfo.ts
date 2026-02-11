import { ProjectStatus } from "./projectStatus";

export interface ProjectInfo {
	title: string;
	summary: string;
	status: ProjectStatus;
	lastActive: string;
}
