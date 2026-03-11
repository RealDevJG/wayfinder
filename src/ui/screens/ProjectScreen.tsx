import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectInfo, UpdateProjectInfo } from "../../modules/projects/domain/projectInfo";
import { services } from "../../modules/ServiceManager";
import { SnapshotInfo } from "../../modules/snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../modules/snapshots/domain/snapshotStopReasonEnum";
import { Constants } from "../../shared/utils/constants";
import CustomPressable from "../components/foundational/CustomPressable";
import Section from "../components/foundational/Section";
import EditableProjectHeader from "../components/screens/projects/EditableProjectHeader";
import NewSnapshotModal from "../components/screens/projects/NewSnapshotModal";
import ProjectSnapshotView from "../components/screens/projects/ProjectSnapshotView";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { useGlobalStyles } from "../styles/global.styles";
import { useProjectStyles } from "../styles/screens/projects/projects.styles";
import { askDelete } from "../utils/askDelete";

const newItemIcon = require("../../../resources/assets/images/global/new-item-icon.png") as ImageSourcePropType;

export default function ProjectScreen() {
    const route = useRoute();
    const navigation = useNavigation<any>();

    const { projectInfo } = route.params as { projectInfo: ProjectInfo };
    const [unsavedProjectInfo, setUnsavedProjectInfo] = useState<ProjectInfo>(projectInfo);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fetchedSnapshots, setFetchedSnapshots] = useState<SnapshotInfo[] | null>(null);
    const [lastPressedSnapshot, setLastPressedSnapshot] = useState<SnapshotInfo | null>(null);

    const styles = useProjectStyles();
    const globalStyles = useGlobalStyles();

    const debouncedSave = useDebouncedCallback(attemptSaveChanges, Constants.AUTO_SAVE_MS);

    const sortedSnapshots = useMemo(() => {
        if (!fetchedSnapshots) {
            return [];
        }

        return [...fetchedSnapshots].sort((a, b) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return dateB - dateA;
        });
    }, [fetchedSnapshots]);

    useEffect(() => {
        debouncedSave();
    }, [unsavedProjectInfo]);

    useFocusEffect(useCallback(() => {
        updateSnapshotListUi();
    }, []));

    function gotoSnapshotScreen(projectId: string, snapshotInfo: SnapshotInfo) {
        navigation.navigate("Snapshot", { projectId, snapshotInfo });
    }

    function handleAddSnapshot(gitBranch: string, lastAction: string, stopReason: SnapshotStopReasonEnum) {
        services.projectService.newSnapshot(projectInfo.id, gitBranch, lastAction, stopReason)
            .then(updateSnapshotListUi);
    }

    function handleSnapshotDelete() {
        const onConfirm = () => services.projectService
            .deleteSnapshot(projectInfo.id, lastPressedSnapshot!.id)
            .then(updateSnapshotListUi);

        askDelete(onConfirm);
    }

    function updateSnapshotListUi() {
        services.projectService.fetchSnapshots(projectInfo.id)
            .then((fetchedSnapshots) => setFetchedSnapshots(fetchedSnapshots));
    }

    async function handleSummaryChanged(text: string) {
        const project: ProjectInfo = {
            ...unsavedProjectInfo,
            summary: text
        }

        setUnsavedProjectInfo(project);
    }

    function attemptSaveChanges() {
        if (projectInfo === unsavedProjectInfo) {
            return;
        }

        const projectData: UpdateProjectInfo = {
            id: projectInfo.id,
            summary: unsavedProjectInfo.summary,
        }

        services.projectService.updateProject(projectData);
    }

    function renderNewSnapshotButton() {
        return (
            <CustomPressable
                buttonUpStyle={styles.newItemButtonUp}
                buttonDownStyle={styles.newItemButtonDown}
                onPress={() => setIsModalVisible(true)}
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
                            {sortedSnapshots.map((snapshot, index) => (
                                <ProjectSnapshotView
                                    key={index}
                                    snapshotInfo={{ ...snapshot, updatedAt: new Date(snapshot.updatedAt).toDateString() }}
                                    onPress={() => gotoSnapshotScreen(projectInfo.id, snapshot)}
                                    onPressIn={() => setLastPressedSnapshot(snapshot)}
                                    onDelete={handleSnapshotDelete}
                                />
                            ))}
                        </View>
                    </Section>
                </ScrollView>
            </View>
            <NewSnapshotModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAcceptButton={handleAddSnapshot} />
        </SafeAreaView>
    );
}
