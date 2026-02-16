import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ProjectInfo } from "../../../../common/types/projectInfo";
import { ProjectStatus } from "../../../../common/types/projectStatus";
import { appColourPalette } from "../../../styles/appColourPalette";
import CustomModal from "../../foundational/CustomModal";
import PressableButton from "../../foundational/PressableButton";
import ProjectStatusSelector from "../shared/ProjectStatusSelector";

interface NewProjectModalProps {
    type: "add" | "update";
    isVisible: boolean;
    lastPressedProject: ProjectInfo | null;
    onClose: () => void;
    onAcceptButton: (title: string, summary: string, status: ProjectStatus) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ type, isVisible, lastPressedProject, onClose, onAcceptButton }) => {
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.Idea);

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
        setStatus(ProjectStatus.Idea);
    }

    function handleAccept() {
        onAcceptButton(title, summary, status);
        onClose();

        setStatus(ProjectStatus.Idea);
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
                <PressableButton style={styles.buttons} buttonUpStyle={styles.buttonCancelUp} buttonDownStyle={styles.buttonCancelDown} onPress={handleClose}>
                    <Text>Cancel</Text>
                </PressableButton>
                <PressableButton style={styles.buttons} buttonUpStyle={styles.buttonAdd} onPress={handleAccept}>
                    <Text>{acceptButtonText}</Text>
                </PressableButton>
            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 20,
        fontWeight: 500
    },
    textInputContainer: {
        alignSelf: "flex-start",
        justifyContent: "space-between",
        margin: 3
    },
    textInput: {
        backgroundColor: appColourPalette.secondary,
        borderColor: appColourPalette.primaryDarker,
        width: 240,
        borderWidth: 1,
        paddingTop: 4,
        paddingBottom: 4
    },
    textInputTitle: {
        fontSize: 15,
        marginBottom: 2,
        fontWeight: 500
    },
    summaryTextInput: {
        height: "auto"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        width: "60%"
    },
    buttons: {
        width: "48%",
        justifyContent: "center",
        alignItems: "center",
        padding: 3
    },
    buttonAdd: {
        backgroundColor: appColourPalette.primaryDarker
    },
    buttonCancelUp: {
        backgroundColor: appColourPalette.danger
    },
    buttonCancelDown: {
        backgroundColor: appColourPalette.dangerDarker
    }
});

export default NewProjectModal;
