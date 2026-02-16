import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo } from "../../common/types/projectInfo";
import { ProjectStatus } from "../../common/types/projectStatus";
import { WAYFINDER_API_CLIENT } from "../../core/api/axios/clients";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.projectView.styles";
import { useStaticHomeStyles } from "../styles/screens/home/home.styles";
import { useUserStore } from "../../state/zustand/userStore";

// TODO: was speeding coding so all this needs refactoring
export default function Home() {
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
    const [fetchedProjects, setFetchedProjects] = useState<ProjectInfo[] | null>(null);
    const [lastPressedProject, setLastPressedProject] = useState<ProjectInfo | null>(null);

    const navigation = useNavigation<any>();

    const globalStyles = useStaticGlobalStyles();
    const staticStyles = useStaticHomeStyles();
    const projectViewStyles = useHomeProjectViewStyles();

    function gotoLoginScreen() {
        navigation.navigate("OAuthLogin");
    }

    function gotoProjectScreen(projectInfo: ProjectInfo) {
        navigation.navigate("Projects", { projectInfo });
    }

    // TODO: when adding offline-usage through local db and request queue, refactor this
    function fetchProjectData() {
        const user = useUserStore.getState().user;

        if (!user) {
            setFetchedProjects(null);
            return;
        }

        WAYFINDER_API_CLIENT.get("/projects").then(async (res) => {
            const projects: ProjectInfo[] = await res.data;
            setFetchedProjects(projects);
        }).catch(() => setFetchedProjects(null));
    }

    // TODO: when adding offline-usage through local db and request queue, refactor this
    function handleAddProject(title: string, summary: string, status: ProjectStatus) {
        const user = useUserStore.getState().user;

        if (!user) {
            return;
        }

        WAYFINDER_API_CLIENT.post("/projects", { title, summary, status })
            .finally(() => {
                fetchProjectData();
            });
    }

    // TODO: when adding offline-usage through local db and request queue, refactor this
    function handleUpdateProject(title: string, summary: string, status: ProjectStatus) {
        const user = useUserStore.getState().user;

        if (!user) {
            return;
        }

        WAYFINDER_API_CLIENT.patch(`/projects/${lastPressedProject!.id}`, { title, summary, status })
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

    // TODO: when adding offline-usage through local db and request queue, refactor this
    function handleDeleteProject() {
        const user = useUserStore.getState().user;

        if (!user) {
            return;
        }

        WAYFINDER_API_CLIENT.delete(`/projects/${lastPressedProject!.id}`)
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
                            onDelete={onDelete}
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
