import { useActionSheet } from "@expo/react-native-action-sheet";
import React from "react";
import { Text, View } from "react-native";
import { ProjectStatus } from "../../../../common/types/projectStatus";
import { appColourPalette } from "../../../styles/appColourPalette";
import { ProjectViewStyles } from "../../../styles/screens/home/home.projectView.styles";
import CustomPressable from "../../foundational/CustomPressable";

interface ProjectViewProps {
    projectId: string;
    title: string;
    summary?: string;
    status: ProjectStatus;
    lastActive: string;
    styles: ProjectViewStyles;
    onPress: () => void;
    onPressIn?: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

// TODO: was speeding coding so all this needs refactoring
const ProjectView = React.memo<ProjectViewProps>(({ projectId, title, summary, status, lastActive, styles, onPress, onEdit, onDelete, onPressIn }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { statusTag, statusStyle } = getStyleAndTag(status);

    function handleLongPress() {
        const options = ["Edit", "DELETE", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({ options, cancelButtonIndex, destructiveButtonIndex },
            (selectedIndex) => {
                if (selectedIndex === 0) {
                    onEdit();
                } else if (selectedIndex === destructiveButtonIndex) {
                    onDelete();
                }
            }
        )
    }

    return (
        <CustomPressable
            key={projectId}
            style={styles.container}
            buttonUpStyle={styles.containerUp}
            buttonDownStyle={styles.containerDown}
            onPress={onPress}
            onPressIn={() => onPressIn?.()} // fixes bug where the id isn't set in time before long press is handled
            onLongPress={handleLongPress}
        >
            <Text style={[styles.titleText, styles.infoContainer]}>{title}</Text>
            <Text style={[styles.summaryText, styles.infoContainer]}>{summary}</Text>
            <View style={[styles.statusContainer, styles.infoContainer]}>
                <View style={styles.statusContainer}>
                    <View style={[statusStyle, styles.statusIcon]}></View>
                    <Text style={styles.statusText}>{statusTag}</Text>
                </View>
                <Text style={styles.statusText}>Last Active: {lastActive}</Text>
            </View>
        </CustomPressable>
    );
});

const statusStyles = {
    [ProjectStatus.Idea]: appColourPalette.projectIdea,
    [ProjectStatus.Resting]: appColourPalette.projectResting,
    [ProjectStatus.MidFeature]: appColourPalette.projectMidFeature,
    [ProjectStatus.OnHold]: appColourPalette.projectOnHold,
    [ProjectStatus.Completed]: appColourPalette.projectCompleted,
    [ProjectStatus.Discontinued]: appColourPalette.projectDiscontinued
} as const;

function getStyleAndTag(statusTag: ProjectStatus) {
    const statusStyle = { backgroundColor: statusStyles[statusTag] };
    return { statusTag, statusStyle };
}

export default ProjectView;
