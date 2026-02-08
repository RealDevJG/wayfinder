import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { appColourPalette } from "../../../styles/appColourPalette";
import CustomModal from "../../foundational/CustomModal";
import PressableButton from "../../foundational/PressableButton";

interface NewProjectModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isVisible, onClose }) => {
    const [title, onTitleChanged] = useState<string>("");
    const [summary, onSummaryChanged] = useState<string>("");

    return (
        <CustomModal containerColour={appColourPalette.secondary} isVisible={isVisible} onClose={onClose}>
            <Text style={styles.modalTitle}>Add Project</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={text => onTitleChanged(text)} value={title} autoCapitalize="words" editable />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Summary</Text>
                <TextInput style={[styles.textInput, styles.summaryTextInput]} onChangeText={text => onSummaryChanged(text)} value={summary} multiline numberOfLines={10} editable />
            </View>
            <View style={styles.buttonsContainer}>
                <PressableButton style={styles.buttons} buttonUpStyle={styles.buttonCancelUp} buttonDownStyle={styles.buttonCancelDown} onPress={onClose}>
                    <Text>Cancel</Text>
                </PressableButton>
                <PressableButton style={styles.buttons} buttonUpStyle={styles.buttonAdd}>
                    <Text>Add</Text>
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
