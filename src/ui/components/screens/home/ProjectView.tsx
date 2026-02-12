import React from "react";
import { Text, View } from "react-native";
import { ProjectStatus } from "../../../../common/types/projectStatus";
import { appColourPalette } from "../../../styles/appColourPalette";
import { ProjectViewStyles } from "../../../styles/screens/home/home.projectView.styles";
import PressableButton from "../../foundational/PressableButton";

interface ProjectViewProps {
    uuid: string;
    title: string;
    summary?: string;
    status: ProjectStatus;
    lastActive: string;
    styles: ProjectViewStyles;
    onPress: () => void;
    onLongPress?: () => void;
}

const ProjectView = React.memo<ProjectViewProps>(({ uuid, title, summary, status, lastActive, styles, onPress, onLongPress }) => {
    const { statusTag, statusStyle } = getStyleAndTag(status);

    return (
        <PressableButton key={uuid} style={styles.container} buttonUpStyle={styles.containerUp} buttonDownStyle={styles.containerDown} onPress={onPress} onLongPress={onLongPress}>
            <Text style={[styles.titleText, styles.infoContainer]}>{title}</Text>
            <Text style={[styles.summaryText, styles.infoContainer]}>{summary}</Text>
            <View style={[styles.statusContainer, styles.infoContainer]}>
                <View style={styles.statusContainer}>
                    <View style={[statusStyle, styles.statusIcon]}></View>
                    <Text style={styles.statusText}>{statusTag}</Text>
                </View>
                <Text style={styles.statusText}>Last Active: {lastActive}</Text>
            </View>
        </PressableButton>
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
