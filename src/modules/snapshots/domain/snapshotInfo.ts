import { SnapshotStopReasonEnum } from "./snapshotStopReasonEnum";

export type SnapshotInfo = {
	id: string;
	stopReason: SnapshotStopReasonEnum;

	lastAction: String;
	lastThoughts: String;
	nextSteps: String;
	gitBranch: String;
	blockers: String;

    archived: boolean; // TODO: For future archive list of snapshots
	updatedAt: string;
};

export type UpdateSnapshotInfo = Partial<SnapshotInfo> & {
	id: string;
};
