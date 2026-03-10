import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { ProjectInfo } from "../../../../modules/projects/domain/projectInfo";
import { useProjectContextMenu } from "../../../hooks/useProjectContextMenu";
import CustomPressable from "../../foundational/CustomPressable";
import ProjectStatusView from "../shared/ProjectStatusView";

export type ProjectViewStyles = {
    container: ViewStyle;
    containerUp: ViewStyle;
    containerDown: ViewStyle;
    infoContainer: ViewStyle;
    statusContainer: ViewStyle;
    statusText: TextStyle;
    titleText: TextStyle;
    summaryText: TextStyle;
}

type ProjectViewProps = {
    projectInfo: ProjectInfo
    styles: ProjectViewStyles;
    onPress: () => void;
    onPressIn?: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ProjectView = React.memo<ProjectViewProps>(({ projectInfo, styles, onPress, onEdit, onDelete, onPressIn }) => {
    const showProjectContextMenu = useProjectContextMenu();

    function handleLongPress() {
        showProjectContextMenu(onEdit, onDelete);
    }

    return (
        <CustomPressable
            key={projectInfo.id}
            style={styles.container}
            buttonUpStyle={styles.containerUp}
            buttonDownStyle={styles.containerDown}
            onPress={onPress}
            onPressIn={() => onPressIn?.()} // fixes bug where the last pressed project isn't set in time before long press is handled
            onLongPress={handleLongPress}
        >
            <Text style={[styles.titleText, styles.infoContainer]}>{projectInfo.title}</Text>
            <Text style={[styles.summaryText, styles.infoContainer]}>{projectInfo.summary}</Text>
            <View style={[styles.statusContainer, styles.infoContainer]}>
                <ProjectStatusView status={projectInfo.status} />
                <Text style={styles.statusText}>Last Active: {projectInfo.lastActive}</Text>
            </View>
        </CustomPressable>
    );
});

export default ProjectView;
