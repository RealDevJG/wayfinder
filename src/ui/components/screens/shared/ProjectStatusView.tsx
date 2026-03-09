import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { appColourPalette } from "../../../styles/appColourPalette";
import { useProjectStatusViewStyles } from "../../../styles/components/shared/ProjectStatusView.styles";

type ProjectStatusViewProps = {
    status: ProjectStatusEnum;
    additionalStyles?: ViewStyle | ViewStyle[];
}

const ProjectStatusView = React.memo<ProjectStatusViewProps>(({ status, additionalStyles = {} }) => {
    const styles = useProjectStatusViewStyles();
    const { statusTag, statusStyle } = getStyleAndTag(status);

    return (
        <View style={[styles.statusContainer, additionalStyles]}>
            <View style={[statusStyle, styles.statusIcon]}></View>
            <Text style={styles.statusText}>{statusTag}</Text>
        </View>
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

export default ProjectStatusView;
