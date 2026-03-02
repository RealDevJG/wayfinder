import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ProjectInfo } from "../../../../modules/projects/domain/projectInfo";
import { useCustomHeaderStyles } from "../../../styles/components/foundational/CustomHeader.styles";
import { useEditableProjectHeaderStyles } from "../../../styles/screens/projects/projects.EditableProjectHeader.styles";
import BannerButton from "../../foundational/BannerButton";
import CustomHeader from "../../foundational/Headers/CustomHeader";
import { EditableHeader } from "../../foundational/Headers/EditableHeader";
import ProjectStatusSelector from "./ProjectStatusSelector";

type EditableProjectHeaderProps = {
    projectInfo: ProjectInfo;
    onSave?: (newTitle: string) => void;
}

// TODO: There's a performance concern here where after some app usage, the app lags and stops responding. It also causes the whole emulator to lag. Not sure if it's here, but started this commit
// TODO: make onSave do something
const EditableProjectHeader: React.FC<EditableProjectHeaderProps> = ({ projectInfo, onSave = () => { } }) => {
    const baseHeaderStyles = useCustomHeaderStyles();
    const styles = useEditableProjectHeaderStyles();

    return (
        <EditableHeader
            initialTitle={projectInfo.title}
            headerViewStyles={[styles.headerCollapsedView, styles.headerCommon, styles.borderBottom]}
            onSave={onSave}
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
                        <ProjectStatusSelector currentStatus={projectInfo.status} />
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
