import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo } from "../../common/types/projectInfo";
import { EditableProjectHeader } from "../components/screens/shared/EditableProjectHeader";
import { useStaticGlobalStyles } from "../styles/global.styles";

export default function Projects() {
    const route = useRoute();
    const { projectInfo } = route.params as { projectInfo: ProjectInfo };

    const globalStyles = useStaticGlobalStyles();

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <EditableProjectHeader projectInfo={projectInfo} />
            <View style={globalStyles.contentContainer}>
                <Text>Test</Text>
                <Text>{projectInfo.title}</Text>
                <Text>{projectInfo.status}</Text>
                <Text>{projectInfo.summary}</Text>
                <Text>{projectInfo.lastActive}</Text>
            </View>
        </SafeAreaView>
    );
}
