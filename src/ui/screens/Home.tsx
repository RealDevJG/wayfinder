import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ProjectStatus } from "../../common/types/projectStatus";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/CustomHeader";
import PressableButton from "../components/foundational/PressableButton";
import NewProjectModal from "../components/screens/home/NewProjectModal";
import ProjectView from "../components/screens/home/ProjectView";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.projectView.styles";
import { useDynamicHomeStyles, useStaticHomeStyles } from "../styles/screens/home/home.styles";

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    const globalStyles = useStaticGlobalStyles();
    const staticStyles = useStaticHomeStyles();
    const dynamicStyles = useDynamicHomeStyles(insets);
    const projectViewStyles = useHomeProjectViewStyles();

    function gotoLoginScreen() {
        navigation.navigate("OAuthLogin");
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Wayfinder" showBackButton={false} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={globalStyles.contentContainer}>
                <ScrollView style={staticStyles.projectListScrollView}>
                    {tempProjects.map((project, index) => (
                        <ProjectView
                            key={index}
                            uuid={index.toString()}
                            title={project.title}
                            summary={project.summary}
                            status={project.status}
                            lastActive={project.lastActive}
                            styles={projectViewStyles}
                        />
                    ))}
                </ScrollView>
            </View>
            <PressableButton style={dynamicStyles.addProjectButton} buttonUpStyle={staticStyles.addProjectButtonUp} buttonDownStyle={staticStyles.addProjectButtonDown} onPress={() => setIsModalVisible(true)}>
                <Text style={staticStyles.addProjectButtonText}>+</Text>
            </PressableButton>
            <NewProjectModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            <BannerButton onPress={gotoLoginScreen}>
                <Text style={globalStyles.bannerButtonText}>LOGIN</Text>
            </BannerButton>
        </SafeAreaView>
    );
}

// TODO: everything below this comment will come from the backend database and is temporarily here
interface ProjectInfo {
    title: string;
    summary: string;
    status: ProjectStatus;
    lastActive: string;
}

const lastActive = new Date().toDateString();

const tempProjects: ProjectInfo[] = [
    {
        title: "Wayfinder",
        summary: "A way to track project progress, such as where each project was left off and what should be done next",
        status: ProjectStatus.MidFeature,
        lastActive: lastActive,
    },
    {
        title: "Backup Creator",
        summary: "A quick backup app using 7zip and symlinks",
        status: ProjectStatus.Resting,
        lastActive: lastActive,
    },
    {
        title: "Vale",
        summary: "A game engine written in C++",
        status: ProjectStatus.Idea,
        lastActive: lastActive,
    },
    {
        title: "Vale.js",
        summary: "A JavaScript varient of my game engine",
        status: ProjectStatus.Discontinued,
        lastActive: lastActive,
    },
    {
        title: "The Vault",
        summary: "My portfolio website",
        status: ProjectStatus.MidFeature,
        lastActive: lastActive,
    },
    {
        title: "Retina",
        summary: "A path tracer",
        status: ProjectStatus.Idea,
        lastActive: lastActive,
    },
    {
        title: "Drawing App (p5.js)",
        summary: "A drawing app like Microsoft paint, written in JavaScript",
        status: ProjectStatus.MidFeature,
        lastActive: lastActive,
    },
    {
        title: "Moosic",
        summary: "A local music player app",
        status: ProjectStatus.OnHold,
        lastActive: lastActive,
    },
    {
        title: "Snooker Game",
        summary: "A snooker game made in p5.js for university",
        status: ProjectStatus.Completed,
        lastActive: lastActive,
    },
    {
        title: "DJ Application",
        summary: "A DJ app made for university",
        status: ProjectStatus.Completed,
        lastActive: lastActive,
    },
    {
        title: "What will we eat",
        summary: "App to help decide what to eat and keep track of ingredient locations in your own house - university group project",
        status: ProjectStatus.Discontinued,
        lastActive: lastActive,
    },
    {
        title: "Endless Nightmares",
        summary: "A 2D procedurally generated dungeon crawler",
        status: ProjectStatus.OnHold,
        lastActive: lastActive,
    },
    {
        title: "Wavy Time",
        summary: "A mobile app to help mark down your day as quickly as it happens",
        status: ProjectStatus.Completed,
        lastActive: lastActive,
    },
    {
        title: "ConvertToHEVC",
        summary: "A script that converts an existing video to use High Efficiency Video Coding to save storage space",
        status: ProjectStatus.Completed,
        lastActive: lastActive,
    }
]
