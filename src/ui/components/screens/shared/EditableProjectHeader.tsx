import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { services } from "../../../../modules/ServiceManager";
import { ProjectInfo } from "../../../../modules/projects/domain/projectInfo";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { useCustomHeaderStyles } from "../../../styles/components/foundational/CustomHeader.styles";
import { useEditableProjectHeaderStyles } from "../../../styles/screens/projects/projects.EditableProjectHeader.styles";
import BannerButton from "../../foundational/BannerButton";
import CustomHeader from "../../foundational/Headers/CustomHeader";
import { EditableHeader } from "../../foundational/Headers/EditableHeader";
import ProjectStatusSelector from "./ProjectStatusSelector";

type EditableProjectHeaderProps = {
    projectInfo: ProjectInfo;
}

// TODO: There's a performance concern here where after some app usage, the app lags and stops responding. It also causes the whole emulator to lag. Not sure if it's here, but started this commit
const EditableProjectHeader: React.FC<EditableProjectHeaderProps> = ({ projectInfo }) => {
    const [newStatus, setNewStatus] = useState<ProjectStatusEnum>(projectInfo.status);

    const baseHeaderStyles = useCustomHeaderStyles();
    const styles = useEditableProjectHeaderStyles();

    function handleSave(newTitle: string) {
        newTitle ??= projectInfo.title;
        projectInfo.status = newStatus;
        services.projectService.updateProjectData(projectInfo.id, newTitle, projectInfo.summary, newStatus);
    }

    return (
        <EditableHeader
            initialTitle={projectInfo.title}
            headerViewStyles={[styles.headerCollapsedView, styles.headerCommon, styles.borderBottom]}
            onSave={handleSave}
            renderReadonlyMode={(title, onEnterEditMode) => (
                <Pressable onPress={onEnterEditMode}>
                    <CustomHeader title={title} showRightButton={false} />
                </Pressable>
            )}
            renderEditMode={(title, setTitle, onExitEditMode) => (
                <View style={[styles.headerCommon, styles.borderBottom]}>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                        style={[baseHeaderStyles.headerTitleText, styles.borderBottom]}
                    />
                    <View style={styles.statusBlock}>
                        <Text>Status:</Text>
                        <ProjectStatusSelector currentStatus={projectInfo.status} setStatusState={setNewStatus} />
                    </View>
                    <BannerButton style={styles.doneButtonView} onPress={onExitEditMode} buttonUpStyle={styles.doneButtonUp} buttonDownStyle={styles.doneButtonDown} >
                        <Text style={styles.doneButtonText}>Done</Text>
                    </BannerButton>
                </View>
            )}
        />
    );
};

export default EditableProjectHeader;
