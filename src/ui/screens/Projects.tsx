import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo, UpdateProjectInfo } from "../../modules/projects/domain/projectInfo";
import { services } from "../../modules/ServiceManager";
import CustomPressable from "../components/foundational/CustomPressable";
import Section from "../components/foundational/Section";
import EditableProjectHeader from "../components/screens/projects/EditableProjectHeader";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { useGlobalStyles } from "../styles/global.styles";
import { useProjectStyles } from "../styles/screens/projects/projects.styles";

const newItemIcon = require("../../../resources/assets/images/global/new-item-icon.png") as ImageSourcePropType;

export default function Projects() {
    const route = useRoute();
    const styles = useProjectStyles();
    const globalStyles = useGlobalStyles();

    const { projectInfo } = route.params as { projectInfo: ProjectInfo };
    const [unsavedProjectInfo, setUnsavedProjectInfo] = useState<ProjectInfo>(projectInfo);

    const debouncedSave = useDebouncedCallback(attemptSaveChanges, 600);

    useEffect(() => {
        debouncedSave();
    }, [unsavedProjectInfo]);

    async function handleSummaryChanged(text: string) {
        const project: ProjectInfo = {
            ...unsavedProjectInfo,
            summary: text
        }

        setUnsavedProjectInfo(project);
    }

    function attemptSaveChanges() {
        if (projectInfo == unsavedProjectInfo) {
            return;
        }

        const projectData: UpdateProjectInfo = {
            id: projectInfo.id,
            summary: unsavedProjectInfo.summary,
        }

        services.projectService.updateProjectData(projectData);
    }

    function renderNewSnapshotButton() {
        return (
            <CustomPressable
                buttonUpStyle={styles.newItemButtonUp}
                buttonDownStyle={styles.newItemButtonDown}
                onPress={() => alert("pressed add new snapshot")}
            >
                <Image style={styles.newItemButtonIcon} source={newItemIcon} />
            </CustomPressable>
        )
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <EditableProjectHeader projectInfo={projectInfo} />
            <View style={globalStyles.contentContainer}>
                <ScrollView style={globalStyles.scrollView}>
                    <Section title="Summary">
                        <TextInput
                            value={unsavedProjectInfo.summary}
                            onChangeText={text => handleSummaryChanged(text)}
                            numberOfLines={12}
                            multiline
                            editable
                        />
                    </Section>
                    <Section title="Snapshots" optionComponent={renderNewSnapshotButton()}>
                        <View style={styles.sectionPadding}>
                            <Text>TODO: create and add snapshot components to be displayed here</Text>
                        </View>
                    </Section>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
