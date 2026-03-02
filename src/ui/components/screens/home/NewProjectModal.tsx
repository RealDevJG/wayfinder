import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ProjectInfo } from "../../../../modules/projects/domain/projectInfo";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import { appColourPalette } from "../../../styles/appColourPalette";
import { useNewProjectModalStyles } from "../../../styles/screens/home/home.NewProjectModal.styles";
import CustomModal from "../../foundational/CustomModal";
import CustomPressable from "../../foundational/CustomPressable";
import ProjectStatusSelector from "../shared/ProjectStatusSelector";

type NewProjectModalProps = {
    type: "add" | "update";
    isVisible: boolean;
    lastPressedProject: ProjectInfo | null;
    onClose: () => void;
    onAcceptButton: (title: string, summary: string, status: ProjectStatusEnum) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ type, isVisible, lastPressedProject, onClose, onAcceptButton }) => {
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [status, setStatus] = useState<ProjectStatusEnum>(ProjectStatusEnum.Idea);

    const styles = useNewProjectModalStyles();
    const acceptButtonText = type[0].toLocaleUpperCase() + type.slice(1);

    useEffect(() => {
        if (type === "update" && lastPressedProject) {
            setTitle(lastPressedProject.title);
            setSummary(lastPressedProject.summary);
            setStatus(lastPressedProject.status);
        }
    }, [lastPressedProject]);

    function handleClose() {
        onClose();
        setStatus(ProjectStatusEnum.Idea);
    }

    function handleAccept() {
        onAcceptButton(title, summary, status);
        onClose();

        setStatus(ProjectStatusEnum.Idea);
    }

    return (
        <CustomModal containerColour={appColourPalette.secondary} isVisible={isVisible} onClose={handleClose}>
            <Text style={styles.modalTitle}>Add Project</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={text => setTitle(text)} value={title} autoCapitalize="words" editable />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Summary</Text>
                <TextInput style={[styles.textInput, styles.summaryTextInput]} onChangeText={text => setSummary(text)} value={summary} multiline numberOfLines={10} editable />
            </View>
            <ProjectStatusSelector currentStatus={status} setStatusState={setStatus} />
            <View style={styles.buttonsContainer}>
                <CustomPressable style={styles.buttons} buttonUpStyle={styles.buttonCancelUp} buttonDownStyle={styles.buttonCancelDown} onPress={handleClose}>
                    <Text>Cancel</Text>
                </CustomPressable>
                <CustomPressable style={styles.buttons} buttonUpStyle={styles.buttonAdd} onPress={handleAccept}>
                    <Text>{acceptButtonText}</Text>
                </CustomPressable>
            </View>
        </CustomModal>
    );
}

export default NewProjectModal;
