import React, { ReactNode } from "react";
import { ColorValue, Modal, Pressable, StyleSheet } from "react-native";

interface CustomModalProps {
    children: ReactNode;
    isVisible: boolean;
    onClose: () => void;
    containerColour?: ColorValue;
}

const CustomModal: React.FC<CustomModalProps> = ({ children, isVisible, onClose, containerColour = "white" }) => {
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

// TODO: put styles in its own file for consistency across the app
const styles = StyleSheet.create({
    overlay: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
        padding: 8
    }
});

export default CustomModal;
