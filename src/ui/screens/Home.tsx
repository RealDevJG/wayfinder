import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo, UpdateProjectInfo } from "../../modules/projects/domain/projectInfo";
import { ProjectStatusEnum } from "../../modules/projects/domain/projectStatusEnum";
import { services } from "../../modules/ServiceManager";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.ProjectView.styles";
import { askDelete } from "../utils/askDelete";

export default function Home() {
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
    const [fetchedProjects, setFetchedProjects] = useState<ProjectInfo[] | null>(null);
    const [lastPressedProject, setLastPressedProject] = useState<ProjectInfo | null>(null);

    const navigation = useNavigation<any>();

    const globalStyles = useGlobalStyles();
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
        services.projectService.fetchProjects()
            .then((fetchedProjects) => setFetchedProjects(fetchedProjects));
    }

    function handleAddProject(title: string, summary: string, status: ProjectStatusEnum) {
        services.projectService.newProject(title, summary, status)
            .then(updateProjectListUi);
    }

    function handleUpdateProject(title: string, summary: string, status: ProjectStatusEnum) {
        const projectData: UpdateProjectInfo = {
            id: lastPressedProject!.id,
            title: title,
            summary: summary,
            status: status
        }

        services.projectService.updateProject(projectData)
            .then(updateProjectListUi);
    }

    function handleDelete() {
        const onConfirm = () => services.projectService
            .deleteProject(lastPressedProject!.id)
            .then(updateProjectListUi);

        askDelete(onConfirm);
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Wayfinder" showLeftButton={false} onRightButton={gotoLoginScreen} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={globalStyles.contentContainer}>
                <ScrollView style={globalStyles.scrollView}>
                    {fetchedProjects?.toReversed().map((project, index) => (
                        <ProjectView
                            key={index}
                            projectInfo={{ ...project, lastActive: new Date(project.lastActive).toDateString() }}
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
