import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { SnapshotInfo } from "../../../../modules/snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../../../modules/snapshots/domain/snapshotStopReasonEnum";
import { useProjectContextMenu } from "../../../hooks/useProjectContextMenu";
import { useProjectSnapshotViewStyles } from "../../../styles/screens/projects/projects.ProjectSnapshotView.styles";
import CustomPressable from "../../foundational/CustomPressable";

type ProjectSnapshotViewProps = {
    snapshotInfo: SnapshotInfo;
    onPress: () => void;
    onDelete: () => void;
}

const fieldMap: Record<SnapshotStopReasonEnum, { label: string; key: keyof SnapshotInfo }[]> = {
    [SnapshotStopReasonEnum.Blocked]: [
        { label: "Blockers", key: "blockers" }
    ],
    [SnapshotStopReasonEnum.BugFound]: [
        { label: "Blockers", key: "blockers" },
        { label: "Last Thoughts", key: "lastThoughts" }
    ],
    [SnapshotStopReasonEnum.ResearchRequired]: [
        { label: "Blockers", key: "blockers" },
        { label: "Next Steps", key: "nextSteps" }
    ],
    [SnapshotStopReasonEnum.SessionEnd]: [
        { label: "Last Action", key: "lastAction" },
        { label: "Next Steps", key: "nextSteps" }
    ]
};

const ProjectSnapshotView: React.FC<ProjectSnapshotViewProps> = ({ snapshotInfo, onPress, onDelete }) => {
    const styles = useProjectSnapshotViewStyles();
    const showProjectSnapshotContextMenu = useProjectContextMenu();

    function handleLongPress() {
        showProjectSnapshotContextMenu(onPress, onDelete);
    }

    function getAdditionalContent(snapshotType: SnapshotStopReasonEnum) {
        const fields = fieldMap[snapshotType];

        if (!fields) {
            return <></>;
        };

        return (
            <>
                {fields.map(({ label, key }) => (
                    <React.Fragment key={key}>
                        <Text style={styles.specialisedTextTitle}>{label}:</Text>
                        <Text
                            style={styles.specialisedTextBlock}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {snapshotInfo[key]}
                        </Text>
                    </React.Fragment>
                ))}
            </>
        );
    }

    function buildSnapshotView(additionalContent: ReactNode) {
        return (
            <CustomPressable
                key={snapshotInfo.id}
                style={styles.container}
                buttonUpStyle={styles.containerUp}
                buttonDownStyle={styles.containerDown}
                onPress={onPress}
                onLongPress={handleLongPress}
            >
                <View style={styles.horizontalContentContainer}>
                    <Text style={styles.titleText}>Branch:</Text>
                    <Text style={styles.titleText}>{snapshotInfo.gitBranch}</Text>
                </View>
                <View style={styles.specialisedContentContainer}>
                    {additionalContent}
                </View>
                <View style={styles.horizontalContentContainer}>
                    <Text style={styles.updatedAtText}>{snapshotInfo.updatedAt}</Text>
                    <Text style={styles.specialisedTextTitle}>{snapshotInfo.stopReason}</Text>
                </View>
            </CustomPressable>
        );
    }

    function buildAndRenderSnapshotView() {
        const additionalContent = getAdditionalContent(snapshotInfo.stopReason);
        return buildSnapshotView(additionalContent);
    }

    return buildAndRenderSnapshotView();
};

export default ProjectSnapshotView;
