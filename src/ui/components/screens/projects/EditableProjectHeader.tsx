import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { services } from "../../../../modules/ServiceManager";
import { ProjectInfo, UpdateProjectInfo } from "../../../../modules/projects/domain/projectInfo";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { useCustomHeaderStyles } from "../../../styles/components/foundational/CustomHeader.styles";
import { useEditableProjectHeaderStyles } from "../../../styles/screens/projects/projects.EditableProjectHeader.styles";
import BannerButton from "../../foundational/BannerButton";
import CustomHeader from "../../foundational/Headers/CustomHeader";
import { EditableHeader } from "../../foundational/Headers/EditableHeader";
import ProjectStatusSelector from "../shared/ProjectStatusSelector";
import ProjectStatusView from "../shared/ProjectStatusView";

type EditableProjectHeaderProps = {
    projectInfo: ProjectInfo;
}

// TODO: There's a performance concern here where after some repeat header editing, the app lags and stops responding. It also causes the whole emulator to lag. Not sure if it's here, but started this was created
const EditableProjectHeader: React.FC<EditableProjectHeaderProps> = ({ projectInfo }) => {
    const [newStatus, setNewStatus] = useState<ProjectStatusEnum>(projectInfo.status);

    const baseHeaderStyles = useCustomHeaderStyles();
    const styles = useEditableProjectHeaderStyles();

    function handleSave(newTitle: string) {
        newTitle ??= projectInfo.title;
        projectInfo.status = newStatus;

        const projectData: UpdateProjectInfo = {
            id: projectInfo.id,
            title: newTitle,
            status: newStatus
        }

        services.projectService.updateProjectData(projectData);
    }

    return (
        <EditableHeader
            initialTitle={projectInfo.title}
            headerViewStyles={styles.headerCommon}
            onSave={handleSave}
            renderReadonlyMode={(title, onEnterEditMode) => (
                <Pressable onPress={onEnterEditMode}>
                    <View>
                        <CustomHeader title={title} showRightButton={false} />
                        <ProjectStatusView status={projectInfo.status} additionalStyles={[styles.borderBottom, { justifyContent: "center" }]} />
                    </View>
                </Pressable>
            )}
            renderEditMode={(title, setTitle, onExitEditMode) => (
                <>
                    <View style={[styles.headerCommon, styles.borderBottom]}>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            style={[baseHeaderStyles.headerTitleText, styles.borderBottom]}
                            autoFocus
                        />
                        <View style={styles.statusBlock}>
                            <Text>Status:</Text>
                            <ProjectStatusSelector currentStatus={projectInfo.status} setStatusState={setNewStatus} />
                        </View>
                        <BannerButton style={styles.doneButtonView} onPress={onExitEditMode} buttonUpStyle={styles.doneButtonUp} buttonDownStyle={styles.doneButtonDown} >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </BannerButton>
                    </View>
                </>
            )}
        />
    );
};

export default EditableProjectHeader;
