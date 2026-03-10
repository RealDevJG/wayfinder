export enum SnapshotStopReasonEnum {
	SessionEnd = "Session_End",
	BugFound = "Bug_Found",
	ResearchRequired = "Research_Required",
	Blocked = "Blocked"
}

export const DEFAULT_SNAPSHOT_STOP_REASON = SnapshotStopReasonEnum[Object.keys(SnapshotStopReasonEnum)[0] as keyof typeof SnapshotStopReasonEnum];
