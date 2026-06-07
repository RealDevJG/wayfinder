import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { colourPalette } from "../../../styles/colourPalette";
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
    [ProjectStatusEnum.Idea]: colourPalette.projectIdea,
    [ProjectStatusEnum.Resting]: colourPalette.projectResting,
    [ProjectStatusEnum.MidFeature]: colourPalette.projectMidFeature,
    [ProjectStatusEnum.OnHold]: colourPalette.projectOnHold,
    [ProjectStatusEnum.Completed]: colourPalette.projectCompleted,
    [ProjectStatusEnum.Discontinued]: colourPalette.projectDiscontinued
} as const;

function getStyleAndTag(statusTag: ProjectStatusEnum) {
    const statusStyle = {
        backgroundColor: statusStyles[statusTag]
    };

    return { statusTag, statusStyle };
}

export default ProjectStatusView;
