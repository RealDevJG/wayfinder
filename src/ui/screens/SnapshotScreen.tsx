import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { services } from "../../modules/ServiceManager";
import { SnapshotInfo } from "../../modules/snapshots/domain/snapshotInfo";
import { SnapshotStopReasonEnum } from "../../modules/snapshots/domain/snapshotStopReasonEnum";
import { Constants } from "../../shared/utils/constants";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import Section from "../components/foundational/Section";
import SnapshotStopReasonSelector from "../components/screens/shared/SnapshotStopReasonSelector";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";
import { colourPalette } from "../styles/colourPalette";
import { useGlobalStyles } from "../styles/global.styles";

const textFields: Array<{ key: keyof SnapshotInfo; title: string; multiline?: boolean }> = [
    { key: "gitBranch", title: "Git Branch", multiline: false },
    { key: "lastAction", title: "Last Action", multiline: true },
    { key: "lastThoughts", title: "Last Thoughts", multiline: true },
    { key: "nextSteps", title: "Next Steps", multiline: true },
    { key: "blockers", title: "Blockers", multiline: true },
];

export default function SnapshotScreen() {
    const route = useRoute();
    const globalStyles = useGlobalStyles();

    const { projectId, snapshotInfo } = route.params as { projectId: string, snapshotInfo: SnapshotInfo };
    const [snapshot, setSnapshot] = useState<SnapshotInfo>(snapshotInfo);

    const debouncedSave = useDebouncedCallback(attemptSaveChanges, Constants.AUTO_SAVE_MS);

    function attemptSaveChanges(currentSnapshot: SnapshotInfo) {
        if (currentSnapshot === snapshotInfo) {
            return;
        }

        services.projectService.updateSnapshot(projectId, currentSnapshot);
    }

    function updateField<K extends keyof SnapshotInfo>(key: K, newValue: SnapshotInfo[K]) {
        setSnapshot(existingValues => ({
            ...existingValues,
            [key]: newValue
        }));
    }

    useEffect(() => {
        debouncedSave(snapshot);
    }, [snapshot, debouncedSave]);

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="Editing Snapshot" showRightButton={false} />
            <View style={globalStyles.contentContainer}>
                <ScrollView style={globalStyles.scrollView}>
                    {textFields.map(({ key, title, multiline }) => (
                        <Section key={key} title={title}>
                            <TextInput
                                value={String(snapshot[key] || "")}
                                onChangeText={text => updateField(key, text)}
                                selectionColor={colourPalette.text}
                                editable
                                {...(multiline && {
                                    multiline: true,
                                    numberOfLines: 12
                                })}
                            />
                        </Section>
                    ))}
                    <Section title="Session Stop Reason">
                        <View style={{ margin: 6 }}>
                            <SnapshotStopReasonSelector
                                currentStopReason={snapshot.stopReason}
                                setStopReasonState={(reason: SnapshotStopReasonEnum) => updateField("stopReason", reason)}
                            />
                        </View>
                    </Section>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
