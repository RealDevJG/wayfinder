import React from "react";
import { Pressable, View, Text } from "react-native";
import { ProjectStatus } from "../../../types/projectStatus";
import { ProjectViewStyles } from "../../../styles/screens/home/home.projectView.styles";
import { appColourPalette } from "../../../styles/appColourPalette";

interface ProjectViewProps {
    uuid: string;
    title: string;
    summary?: string;
    status: ProjectStatus;
    lastActive: string;
    styles: ProjectViewStyles;
}

const ProjectView = React.memo<ProjectViewProps>(({ uuid, title, summary, status, lastActive, styles }) => {
    const { statusTag, statusStyle } = getStyleAndTag(status);

    return (
        <Pressable key={uuid} style={styles.container} onPress={() => alert(`You pressed ${title}`)}>
            <Text style={[styles.titleText, styles.infoContainer]}>{title}</Text>
            <Text style={[styles.summaryText, styles.infoContainer]}>{summary}</Text>
            <View style={[styles.statusContainer, styles.infoContainer]}>
                <View style={styles.statusContainer}>
                    <View style={[statusStyle, styles.statusIcon]}></View>
                    <Text style={styles.statusText}>{statusTag}</Text>
                </View>
                <Text style={styles.statusText}>Last Active: {lastActive}</Text>
            </View>
        </Pressable>
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
