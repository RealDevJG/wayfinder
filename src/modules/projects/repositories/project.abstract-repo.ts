import { SnapshotInfo, UpdateSnapshotInfo } from "../../snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../snapshots/domain/snapshotStopReasonEnum";
import { ProjectInfo, UpdateProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";

export interface IProjectRepository {
	fetchProjects: () => Promise<ProjectInfo[] | null>;
	newProject: (title: string, summary: string, status: ProjectStatusEnum) => Promise<void>;
	updateProject: (projectData: UpdateProjectInfo) => Promise<void>;
	deleteProject: (projectId: string) => Promise<void>;

	fetchSnapshots: (projectId: string) => Promise<SnapshotInfo[] | null>;
	newSnapshot: (projectId: string, gitBranch: string, lastAction: string, stopReason: SnapshotStopReasonEnum) => Promise<void>;
	updateSnapshot: (projectId: string, snapshotData: UpdateSnapshotInfo) => Promise<void>;
	deleteSnapshot: (projectId: string, snapshotId: string) => Promise<void>;
}
