import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo } from "../../common/types/projectInfo";
import { WAYFINDER_API_CLIENT } from "../../core/api/axios/clients";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/CustomHeader";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.projectView.styles";
import { useStaticHomeStyles } from "../styles/screens/home/home.styles";

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fetchedProjects, setFetchedProjects] = useState<ProjectInfo[]>();

    const navigation = useNavigation<any>();

    const globalStyles = useStaticGlobalStyles();
    const staticStyles = useStaticHomeStyles();
    const projectViewStyles = useHomeProjectViewStyles();

    function gotoLoginScreen() {
        navigation.navigate("OAuthLogin");
    }

    useFocusEffect(
        useCallback(() => {
            WAYFINDER_API_CLIENT.get("/projects").then(async (res) => {
                const projects: ProjectInfo[] = await res.data;
                setFetchedProjects(projects);
            });
        }, [])
    );

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Wayfinder" showBackButton={false} onRightButton={gotoLoginScreen} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={globalStyles.contentContainer}>
                <ScrollView style={staticStyles.projectListScrollView}>
                    {fetchedProjects && fetchedProjects.map((project, index) => (
                        <ProjectView
                            key={index}
                            uuid={index.toString()}
                            title={project.title}
                            summary={project.summary}
                            status={project.status}
                            lastActive={new Date(project.lastActive).toDateString()}
                            styles={projectViewStyles}
                        />
                    ))}
                </ScrollView>
            </View>
            <BannerButton onPress={() => setIsModalVisible(true)}>
                <Text style={globalStyles.bannerButtonText}>Add Project</Text>
            </BannerButton>
            <NewProjectModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </SafeAreaView>
    );
}
