import { SnapshotInfo, UpdateSnapshotInfo } from "../snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../snapshots/domain/snapshotStopReasonEnum";
import { ProjectInfo, UpdateProjectInfo } from "./domain/projectInfo";
import { ProjectStatusEnum } from "./domain/projectStatusEnum";
import { IProjectRepository } from "./repositories/project.abstract-repo";

export class ProjectService {
	constructor(private readonly repository: IProjectRepository) {}

	fetchProjects(): Promise<ProjectInfo[] | null> {
		return this.repository.fetchProjects();
	}

	newProject(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return this.repository.newProject(title, summary, status);
	}

	updateProject(projectData: UpdateProjectInfo): Promise<void> {
		return this.repository.updateProject(projectData);
	}

	deleteProject(projectId: string): Promise<void> {
		return this.repository.deleteProject(projectId);
	}

	fetchSnapshots(projectId: string): Promise<SnapshotInfo[] | null> {
		return this.repository.fetchSnapshots(projectId);
	}

	newSnapshot(projectId: string, gitBranch: string, lastAction: string, stopReason: SnapshotStopReasonEnum): Promise<void> {
		return this.repository.newSnapshot(projectId, gitBranch, lastAction, stopReason);
	}

	updateSnapshot(projectId: string, snapshotData: UpdateSnapshotInfo): Promise<void> {
		return this.repository.updateSnapshot(projectId, snapshotData);
	}

	deleteSnapshot(projectId: string, snapshotId: string): Promise<void> {
		return this.repository.deleteSnapshot(projectId, snapshotId);
	}
}
