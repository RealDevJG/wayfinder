import { WAYFINDER_API_CLIENT } from "../../../shared/api/axios/clients";
import { SnapshotInfo, UpdateSnapshotInfo } from "../../snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../snapshots/domain/snapshotStopReasonEnum";
import { ProjectInfo, UpdateProjectInfo } from "../domain/projectInfo";
import { ProjectStatusEnum } from "../domain/projectStatusEnum";
import { IProjectRepository } from "./project.abstract-repo";

const projectsUrl = "/projects";
const SnapshotsUrl = "/projects/snapshots";

export class OnlineProjectRepository implements IProjectRepository {
	fetchProjects(): Promise<ProjectInfo[] | null> {
		return WAYFINDER_API_CLIENT.get(`${projectsUrl}`).then(async (res) => {
			return (await res.data) as ProjectInfo[];
		});
	}

	newProject(title: string, summary: string, status: ProjectStatusEnum): Promise<void> {
		return WAYFINDER_API_CLIENT.post(`${projectsUrl}`, { title, summary, status });
	}

	updateProject(projectData: UpdateProjectInfo): Promise<void> {
		const { id: projectId, ...projectDto } = projectData;
		return WAYFINDER_API_CLIENT.patch(`${projectsUrl}/${projectId}`, projectDto);
	}

	deleteProject(projectId: string): Promise<void> {
		return WAYFINDER_API_CLIENT.delete(`${projectsUrl}/${projectId}`);
	}

	fetchSnapshots(projectId: string): Promise<SnapshotInfo[] | null> {
		return WAYFINDER_API_CLIENT.get(`${SnapshotsUrl}/${projectId}`).then(async (res) => {
			return (await res.data) as SnapshotInfo[];
		});
	}

	newSnapshot(projectId: string, gitBranch: string, lastAction: string, stopReason: SnapshotStopReasonEnum): Promise<void> {
		return WAYFINDER_API_CLIENT.post(`${SnapshotsUrl}/${projectId}`, { gitBranch, lastAction, stopReason });
	}

	updateSnapshot(projectId: string, snapshotData: UpdateSnapshotInfo): Promise<void> {
		const { id: snapshotId, ...projectDto } = snapshotData;
		return WAYFINDER_API_CLIENT.patch(`${SnapshotsUrl}/${projectId}/${snapshotId}`, projectDto);
	}

	deleteSnapshot(projectId: string, snapshotId: string): Promise<void> {
		return WAYFINDER_API_CLIENT.delete(`${SnapshotsUrl}/${projectId}/${snapshotId}`);
	}
}
