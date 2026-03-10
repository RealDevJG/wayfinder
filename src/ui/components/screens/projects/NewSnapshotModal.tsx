import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { DEFAULT_SNAPSHOT_STOP_REASON, SnapshotStopReasonEnum } from "../../../../modules/snapshots/domain/snapshotStopReasonEnum";
import { appColourPalette } from "../../../styles/appColourPalette";
import { useNewItemModalStyles } from "../../../styles/components/shared/NewItemModal.styles";
import CustomModal from "../../foundational/CustomModal";
import CustomPressable from "../../foundational/CustomPressable";
import SnapshotStopReasonSelector from "../shared/SnapshotStopReasonSelector";

type NewSnapshotModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onAcceptButton: (branch: string, lastAction: string, stopReason: SnapshotStopReasonEnum) => void;
}

const NewSnapshotModal: React.FC<NewSnapshotModalProps> = ({ isVisible, onClose, onAcceptButton }) => {
    const [branch, setBranch] = useState<string>("");
    const [lastAction, setLastAction] = useState<string>("");
    const [stopReason, setStopReason] = useState<SnapshotStopReasonEnum>(DEFAULT_SNAPSHOT_STOP_REASON);

    const styles = useNewItemModalStyles();

    function handleClose() {
        onClose();
        setStopReason(DEFAULT_SNAPSHOT_STOP_REASON);
    }

    function handleAccept() {
        onAcceptButton(branch, lastAction, stopReason);
        onClose();

        setStopReason(DEFAULT_SNAPSHOT_STOP_REASON);
    }

    return (
        <CustomModal containerColour={appColourPalette.secondary} isVisible={isVisible} onClose={handleClose}>
            <Text style={styles.modalTitle}>New Snapshot</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Branch</Text>
                <TextInput style={styles.textInput} onChangeText={text => setBranch(text)} value={branch} autoCapitalize="words" editable />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputTitle}>Last Action</Text>
                <TextInput style={[styles.textInput, styles.summaryTextInput]} onChangeText={text => setLastAction(text)} value={lastAction} multiline numberOfLines={10} editable />
            </View>
            <SnapshotStopReasonSelector currentStopReason={stopReason} setStopReasonState={setStopReason} />
            <View style={styles.buttonsContainer}>
                <CustomPressable style={styles.buttons} buttonUpStyle={styles.buttonCancelUp} buttonDownStyle={styles.buttonCancelDown} onPress={handleClose}>
                    <Text>Cancel</Text>
                </CustomPressable>
                <CustomPressable style={styles.buttons} buttonUpStyle={styles.buttonAdd} onPress={handleAccept}>
                    <Text>Add</Text>
                </CustomPressable>
            </View>
        </CustomModal>
    );
}

export default NewSnapshotModal;
