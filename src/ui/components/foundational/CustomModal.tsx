import React, { ReactNode } from "react";
import { ColorValue, Modal, Pressable } from "react-native";
import { useCustomModalStyles } from "../../styles/components/foundational/CustomModal.styles";

type CustomModalProps = {
    children: ReactNode;
    isVisible: boolean;
    onClose: () => void;
    containerColour?: ColorValue;
}

const CustomModal: React.FC<CustomModalProps> = ({ children, isVisible, onClose, containerColour = "white" }) => {
    const styles = useCustomModalStyles();

    return (
        <Modal visible={isVisible} backdropColor={"#00000050"}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={[styles.container, { backgroundColor: containerColour }]} onPress={(e) => { e.bubbles = false }}>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

export default CustomModal;
