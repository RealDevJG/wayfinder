export enum ProjectStatusEnum {
	Idea = "Idea",
	Resting = "Resting",
	MidFeature = "Mid_Feature",
	OnHold = "On_Hold",
	Completed = "Completed",
	Discontinued = "Discontinued"
}

export const DEFAULT_PROJECT_STATUS = ProjectStatusEnum[Object.keys(ProjectStatusEnum)[0] as keyof typeof ProjectStatusEnum];
