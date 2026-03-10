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
    onPressIn?: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

// TODO: restrict how much text is shown per snapshot on the projects screen, but show it in full for the actual Snapshot.tsx screen
const ProjectSnapshotView: React.FC<ProjectSnapshotViewProps> = ({ snapshotInfo, onPress, onPressIn, onEdit, onDelete }) => {
    const styles = useProjectSnapshotViewStyles();

    const showProjectSnapshotContextMenu = useProjectContextMenu();

    function handleLongPress() {
        showProjectSnapshotContextMenu(onEdit, onDelete);
    }

    // REFACTOR:
    function getAdditionalContent(snapshotType: SnapshotStopReasonEnum) {
        if (snapshotType === SnapshotStopReasonEnum.Blocked) {
            return (
                <>
                    <Text style={styles.specialisedTextTitle}>Blockers:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.blockers}</Text>
                </>
            );
        } else if (snapshotType === SnapshotStopReasonEnum.BugFound) {
            return (
                <>
                    <Text style={styles.specialisedTextTitle}>Blockers:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.blockers}</Text>
                    <Text style={styles.specialisedTextTitle}>Last Thoughts:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.lastThoughts}</Text>
                </>
            );
        } else if (snapshotType === SnapshotStopReasonEnum.ResearchRequired) {
            return (
                <>
                    <Text style={styles.specialisedTextTitle}>Blockers:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.blockers}</Text>
                    <Text style={styles.specialisedTextTitle}>Next Steps:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.nextSteps}</Text>
                </>
            );
        } else if (snapshotType === SnapshotStopReasonEnum.SessionEnd) {
            return (
                <>
                    <Text style={styles.specialisedTextTitle}>Last Action:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.lastAction}</Text>
                    <Text style={styles.specialisedTextTitle}>Next Steps:</Text>
                    <Text style={styles.specialisedTextBlock}>{snapshotInfo.nextSteps}</Text>
                </>
            );
        }
    }

    function buildSnapshotView(additionalContent: ReactNode) {
        return (
            <CustomPressable
                key={snapshotInfo.id}
                style={styles.container}
                buttonUpStyle={styles.containerUp}
                buttonDownStyle={styles.containerDown}
                onPress={onPress}
                onPressIn={() => onPressIn?.()} // fixes bug where the last pressed snapshot isn't set in time before long press is handled
                onLongPress={handleLongPress}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Branch:</Text>
                    <Text style={styles.titleText}>{snapshotInfo.gitBranch}</Text>
                </View>
                <View style={styles.specialisedContentContainer}>
                    {additionalContent}
                </View>
                <Text style={styles.updatedAtText}>{snapshotInfo.updatedAt}</Text>
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
