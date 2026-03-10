import { SnapshotStopReasonEnum } from "./snapshotStopReasonEnum";

export type SnapshotInfo = {
	id: string;
	stopReason: SnapshotStopReasonEnum;

	lastAction: string;
	lastThoughts: string;
	nextSteps: string;
	gitBranch: string;
	blockers: string;

	archived: boolean; // FUTURE: For future archive list of snapshots
	updatedAt: string;
};

export type UpdateSnapshotInfo = Partial<SnapshotInfo> & {
	id: string;
};
