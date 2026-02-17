import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ProjectInfo } from "../../../../common/types/projectInfo";
import { appColourPalette } from "../../../styles/appColourPalette";
import BannerButton from "../../foundational/BannerButton";
import CustomHeader, { headerStyles } from "../../foundational/Headers/CustomHeader";
import { EditableHeader } from "../../foundational/Headers/EditableHeader";
import ProjectStatusSelector from "./ProjectStatusSelector";

interface EditableProjectHeaderProps {
    projectInfo: ProjectInfo;
    onSave?: (newTitle: string) => void;
}

// TODO: There's a performance concern here where after some app usage, the app lags and stops responding. It also causes the whole emulator to lag. Not sure if it's here, but started this commit
// TODO: make onSave do something
export const EditableProjectHeader: React.FC<EditableProjectHeaderProps> = ({ projectInfo, onSave = () => { } }) => {
    return (
        <EditableHeader
            initialTitle={projectInfo.title}
            headerViewStyles={[style.headerCollapsedView, style.headerCommon, style.borderBottom]}
            onSave={onSave}
            renderReadonlyMode={(title, onEnterEditMode) => (
                <Pressable onPress={onEnterEditMode}>
                    <CustomHeader title={title} />
                </Pressable>
            )}
            renderEditMode={(title, setTitle, onExitEditMode) => (
                <View style={[style.headerCommon, style.borderBottom]}>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                        style={[headerStyles.headerTitleText, style.borderBottom]}
                    />
                    <View style={style.statusBlock}>
                        <Text>Status:</Text>
                        <ProjectStatusSelector currentStatus={projectInfo.status} />
                    </View>
                    <BannerButton style={style.doneButtonView} onPress={onExitEditMode} buttonUpStyle={style.doneButtonUp} buttonDownStyle={style.doneButtonDown} >
                        <Text style={style.doneButtonText}>Done</Text>
                    </BannerButton>
                </View>
            )}
        />
    );
};

const style = StyleSheet.create({
    headerCollapsedView: {
        flex: 1
    },
    headerCommon: {
        backgroundColor: appColourPalette.primary,
        justifyContent: "space-between",
        alignItems: "center"
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: appColourPalette.separator,
        width: "100%"
    },
    statusBlock: {
        marginTop: 10
    },
    doneButtonView: {
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        alignItems: "center"
    },
    doneButtonText: {
        color: appColourPalette.text
    },
    doneButtonUp: {
        backgroundColor: appColourPalette.accent
    },
    doneButtonDown: {
        backgroundColor: appColourPalette.accentDarker
    }
});
