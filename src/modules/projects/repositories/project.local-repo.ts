import { SnapshotInfo, UpdateSnapshotInfo } from "../../snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../snapshots/domain/snapshotStopReasonEnum";
import { ProjectInfo, UpdateProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";
import { IProjectRepository } from "./project.abstract-repo";

export class LocalProjectRepository implements IProjectRepository {
	fetchProjects(): Promise<ProjectInfo[] | null> {
		return Promise.resolve(null);
	}

	newProject(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return Promise.resolve();
	}

	updateProject(projectData: UpdateProjectInfo): Promise<void> {
		return Promise.resolve();
	}

	deleteProject(projectId: string): Promise<void> {
		return Promise.resolve();
	}

	fetchSnapshots(projectId: string): Promise<SnapshotInfo[] | null> {
		return Promise.resolve(null);
	}

	newSnapshot(projectId: string, gitBranch: string, lastAction: string, stopReason: SnapshotStopReasonEnum): Promise<void> {
		return Promise.resolve();
	}

	updateSnapshot(projectId: string, snapshotData: UpdateSnapshotInfo): Promise<void> {
		return Promise.resolve();
	}

	deleteSnapshot(projectId: string, snapshotId: string): Promise<void> {
		return Promise.resolve();
	}
}
