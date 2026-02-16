import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/foundational/CustomHeader";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { ProjectInfo } from "../../common/types/projectInfo";

export default function Projects() {
    const route = useRoute();
    const { projectInfo } = route.params as { projectInfo: ProjectInfo };

    const globalStyles = useStaticGlobalStyles();

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title={projectInfo.title} />
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
