import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { useProjectContextMenu } from "../../../hooks/useProjectContextMenu";
import { appColourPalette } from "../../../styles/appColourPalette";
import CustomPressable from "../../foundational/CustomPressable";

export type ProjectViewStyles = {
    container: ViewStyle;
    containerUp: ViewStyle;
    containerDown: ViewStyle;
    infoContainer: ViewStyle;
    statusContainer: ViewStyle;
    statusIcon: ViewStyle;
    statusText: TextStyle;
    titleText: TextStyle;
    summaryText: TextStyle;
}

type ProjectViewProps = {
    projectId: string;
    title: string;
    summary?: string;
    status: ProjectStatusEnum;
    lastActive: string;
    styles: ProjectViewStyles;
    onPress: () => void;
    onPressIn?: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ProjectView = React.memo<ProjectViewProps>(({ projectId, title, summary, status, lastActive, styles, onPress, onEdit, onDelete, onPressIn }) => {
    const showProjectContextMenu = useProjectContextMenu();
    const { statusTag, statusStyle } = getStyleAndTag(status);

    function handleLongPress() {
        showProjectContextMenu(onEdit, onDelete);
    }

    return (
        <CustomPressable
            key={projectId}
            style={styles.container}
            buttonUpStyle={styles.containerUp}
            buttonDownStyle={styles.containerDown}
            onPress={onPress}
            onPressIn={() => onPressIn?.()} // fixes bug where the last pressed project isn't set in time before long press is handled
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
    [ProjectStatusEnum.Idea]: appColourPalette.projectIdea,
    [ProjectStatusEnum.Resting]: appColourPalette.projectResting,
    [ProjectStatusEnum.MidFeature]: appColourPalette.projectMidFeature,
    [ProjectStatusEnum.OnHold]: appColourPalette.projectOnHold,
    [ProjectStatusEnum.Completed]: appColourPalette.projectCompleted,
    [ProjectStatusEnum.Discontinued]: appColourPalette.projectDiscontinued
} as const;

function getStyleAndTag(statusTag: ProjectStatusEnum) {
    const statusStyle = {
        backgroundColor: statusStyles[statusTag]
    };

    return { statusTag, statusStyle };
}

export default ProjectView;
