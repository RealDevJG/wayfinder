import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo } from "../../modules/projects/domain/projectInfo";
import { ProjectStatusEnum } from "../../modules/projects/domain/projectStatusEnum";
import { services } from "../../modules/ServiceManager";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.ProjectView.styles";
import { useHomeStyles } from "../styles/screens/home/home.styles";

export default function Home() {
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
    const [fetchedProjects, setFetchedProjects] = useState<ProjectInfo[] | null>(null);
    const [lastPressedProject, setLastPressedProject] = useState<ProjectInfo | null>(null);

    const navigation = useNavigation<any>();

    const globalStyles = useGlobalStyles();
    const staticStyles = useHomeStyles();
    const projectViewStyles = useHomeProjectViewStyles();

    useFocusEffect(useCallback(() => {
        updateProjectListUi();
    }, []));

    function gotoLoginScreen() {
        navigation.navigate("OAuthLogin");
    }

    function gotoProjectScreen(projectInfo: ProjectInfo) {
        navigation.navigate("Projects", { projectInfo });
    }

    function updateProjectListUi() {
        services.projectService.fetchProjectData()
            .then((fetchedProjects) => setFetchedProjects(fetchedProjects));
    }

    function handleAddProject(title: string, summary: string, status: ProjectStatusEnum) {
        services.projectService.addProjectData(title, summary, status)
            .then(updateProjectListUi);
    }

    function handleUpdateProject(title: string, summary: string, status: ProjectStatusEnum) {
        services.projectService.updateProjectData(lastPressedProject!.id, title, summary, status)
            .then(updateProjectListUi);
    }

    function handleDelete() {
        Alert.alert("Are you sure you want to delete this item?", "It will permanently be gone", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "DELETE",
                style: "destructive",
                onPress: () => services.projectService.deleteProject(lastPressedProject!.id)
                    .then(updateProjectListUi)
            }
        ]);
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Wayfinder" showLeftButton={false} onRightButton={gotoLoginScreen} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={globalStyles.contentContainer}>
                <ScrollView style={staticStyles.projectListScrollView}>
                    {fetchedProjects?.toReversed().map((project, index) => (
                        <ProjectView
                            key={index}
                            projectId={index.toString()}
                            title={project.title}
                            summary={project.summary}
                            status={project.status}
                            lastActive={new Date(project.lastActive).toDateString()}
                            styles={projectViewStyles}
                            onPress={() => gotoProjectScreen(project)}
                            onPressIn={() => setLastPressedProject(project)}
                            onEdit={() => setIsUpdateModalVisible(true)}
                            onDelete={handleDelete}
                        />
                    ))}
                </ScrollView>
            </View>
            <BannerButton onPress={() => setIsAddModalVisible(true)}>
                <Text style={globalStyles.bannerButtonText}>Add Project</Text>
            </BannerButton>
            <NewProjectModal isVisible={isAddModalVisible} type="add" onClose={() => setIsAddModalVisible(false)} onAcceptButton={handleAddProject} lastPressedProject={lastPressedProject} />
            <NewProjectModal isVisible={isUpdateModalVisible} type="update" onClose={() => setIsUpdateModalVisible(false)} onAcceptButton={handleUpdateProject} lastPressedProject={lastPressedProject} />
        </SafeAreaView>
    );
}
