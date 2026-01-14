import { ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PressableButton from "../components/PressableButton";
import ProjectView from "../components/screens/home/ProjectView";
import { useDynamicHomeStyles, useStaticHomeStyles } from "../styles/screens/home/home.styles";
import { ProjectStatus } from "../types/projectStatus";
import { useHomeProjectViewStyles } from "../styles/screens/home/home.projectView.styles";
import WayfinderHeader from "../components/WayfinderHeader";

export default function Home() {
    const insets = useSafeAreaInsets();

    const staticStyles = useStaticHomeStyles();
    const dynamicStyles = useDynamicHomeStyles(insets);
    const projectViewStyles = useHomeProjectViewStyles();

    // TODO: will come from backend database
    const lastActive = new Date().toDateString();

    return (
        <SafeAreaView style={staticStyles.container}>
            <WayfinderHeader title="Wayfinder" showBackButton={false} />
            {/* The below View allows for the inner ScrollView to use flex properly */}
            <View style={staticStyles.projectListContainer}>
                <ScrollView style={staticStyles.projectListScrollView}>
                    <ProjectView styles={projectViewStyles} uuid="0" title="Wayfinder" status={ProjectStatus.MidFeature} lastActive={lastActive}
                        summary="A way to track project progress, such as where each project was left off and what should be done next"/>
                    <ProjectView styles={projectViewStyles} uuid="1" title="Backup Creator" status={ProjectStatus.Resting} lastActive={lastActive}
                        summary="A quick backup app using 7zip and symlinks"/>
                    <ProjectView styles={projectViewStyles} uuid="2" title="Vale" status={ProjectStatus.Idea} lastActive={lastActive}
                        summary="A game engine written in C++"/>
                    <ProjectView styles={projectViewStyles} uuid="3" title="Vale.js" status={ProjectStatus.Discontinued} lastActive={lastActive}
                        summary="A JavaScript varient of my game engine"/>
                    <ProjectView styles={projectViewStyles} uuid="4" title="The Vault" status={ProjectStatus.MidFeature} lastActive={lastActive}
                        summary="My portfolio website"/>
                    <ProjectView styles={projectViewStyles} uuid="5" title="Retina" status={ProjectStatus.Idea} lastActive={lastActive}
                        summary="A path tracer"/>
                    <ProjectView styles={projectViewStyles} uuid="6" title="Drawing App (p5.js)" status={ProjectStatus.MidFeature} lastActive={lastActive}
                        summary="A drawing app like Microsoft paint, written in JavaScript"/>
                    <ProjectView styles={projectViewStyles} uuid="7" title="Moosic" status={ProjectStatus.OnHold} lastActive={lastActive}
                        summary="A local music player app"/>
                </ScrollView>
            </View>
            <PressableButton style={dynamicStyles.addProjectButton} onPress={() => {}}
                    buttonUpStyleOverride={staticStyles.addProjectButtonUp} buttonDownStyleOverride={staticStyles.addProjectButtonDown}>
                <Text style={staticStyles.addProjectButtonText}>+</Text>
            </PressableButton>
        </SafeAreaView>
    );
}
