import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ProjectInfo } from "../../../../common/types/projectInfo";
import { appColourPalette } from "../../../styles/appColourPalette";
import ProjectStatusSelector from "../../screens/shared/ProjectStatusSelector";
import CustomHeader, { headerStyles } from "./CustomHeader";
import { EditableHeader } from "./EditableHeader";

interface EditableProjectHeaderProps {
    projectInfo: ProjectInfo;
    onSave?: (newTitle: string) => void;
}

// TODO: refactor style usages
// TODO: There's a performance concern here where after some app usage, the app lags and stops responding. It also causes the whole emulator to lag. Not sure if it's here, but started this commit
// TODO: make onSave do something
export const EditableProjectHeader: React.FC<EditableProjectHeaderProps> = ({ projectInfo, onSave }) => {
    return (
        <EditableHeader
            initialTitle={projectInfo.title}
            headerViewStyles={[style.headerBody, style.borderBottom, { flex: 1 }]}
            onSave={onSave}
            renderReadonlyMode={(title, onEnterEditMode) => (
                <Pressable onPress={onEnterEditMode}>
                    <CustomHeader title={title} />
                </Pressable>
            )}
            renderEditMode={(title, setTitle, onExitEditMode) => (
                <View style={[style.headerBody, style.borderBottom]}>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                        style={[headerStyles.headerTitleText, style.borderBottom, { width: "100%" }]}
                    />
                    <View style={{ marginTop: 10 }}>
                        <Text>Project Status:</Text>
                        <ProjectStatusSelector currentStatus={projectInfo.status} />
                    </View>
                    <Pressable onPress={onExitEditMode}>
                        <Text style={{ color: "blue", marginTop: 10, marginBottom: 12 }}>Done</Text>
                    </Pressable>
                </View>
            )}
        />
    );
};

const style = StyleSheet.create({
    headerBody: {
        backgroundColor: appColourPalette.primary,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: appColourPalette.separator
    }
});
