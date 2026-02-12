import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo } from "../../common/types/projectInfo";
import { ProjectStatus } from "../../common/types/projectStatus";
import { WAYFINDER_API_CLIENT } from "../../core/api/axios/clients";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/CustomHeader";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.projectView.styles";
import { useStaticHomeStyles } from "../styles/screens/home/home.styles";

// TODO: was speeding coding so all this needs refactoring
export default function Home() {
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
    const [fetchedProjects, setFetchedProjects] = useState<ProjectInfo[] | null>(null);
    const [lastPressedProjectId, setLastPressedProjectId] = useState<string>("");

    const navigation = useNavigation<any>();

    const globalStyles = useStaticGlobalStyles();
    const staticStyles = useStaticHomeStyles();
    const projectViewStyles = useHomeProjectViewStyles();

    function gotoLoginScreen() {
        navigation.navigate("OAuthLogin");
    }

    function fetchProjectData() {
        WAYFINDER_API_CLIENT.get("/projects").then(async (res) => {
            const projects: ProjectInfo[] = await res.data;
            setFetchedProjects(projects);
        }).catch(() => setFetchedProjects(null));
    }

    function handleAddProject(title: string, summary: string) {
        const status = ProjectStatus.Idea;

        WAYFINDER_API_CLIENT.post("/projects", { title, summary, status })
            .finally(() => {
                fetchProjectData();
            });
    }

    function handleUpdateProject(title: string, summary: string) {
        const status = ProjectStatus.OnHold;

        WAYFINDER_API_CLIENT.patch(`/projects/${lastPressedProjectId}`, { title, summary, status })
            .finally(() => {
                fetchProjectData();
            });
    }

    function onDelete() {
        Alert.alert("Are you sure you want to delete this item?", "It will permanently be gone", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "DELETE",
                style: "destructive",
                onPress: handleDeleteProject
            }
        ]);
    }

    function handleDeleteProject() {
        WAYFINDER_API_CLIENT.delete(`/projects/${lastPressedProjectId}`)
            .finally(() => {
                fetchProjectData();
            });
    }

    useFocusEffect(useCallback(fetchProjectData, []));

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Wayfinder" showBackButton={false} onRightButton={gotoLoginScreen} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={globalStyles.contentContainer}>
                <ScrollView style={staticStyles.projectListScrollView}>
                    {fetchedProjects && fetchedProjects.map((project, index) => (
                        <ProjectView
                            key={index}
                            projectId={index.toString()}
                            title={project.title}
                            summary={project.summary}
                            status={project.status}
                            lastActive={new Date(project.lastActive).toDateString()}
                            styles={projectViewStyles}
                            onPress={() => alert(`you pressed ${project.title}`)}
                            onPressIn={() => setLastPressedProjectId(project.id)}
                            onEdit={() => setIsUpdateModalVisible(true)}
                            onDelete={onDelete}
                        />
                    ))}
                </ScrollView>
            </View>
            <BannerButton onPress={() => setIsAddModalVisible(true)}>
                <Text style={globalStyles.bannerButtonText}>Add Project</Text>
            </BannerButton>
            <NewProjectModal isVisible={isAddModalVisible} acceptButtonText="Add" onClose={() => setIsAddModalVisible(false)} onAcceptButton={handleAddProject} />
            <NewProjectModal isVisible={isUpdateModalVisible} acceptButtonText="Update" onClose={() => setIsUpdateModalVisible(false)} onAcceptButton={handleUpdateProject} />
        </SafeAreaView>
    );
}
