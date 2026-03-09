import React, { useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { useEditableHeaderStyles } from "../../../styles/components/foundational/EditableHeader.styles";

export type EditableHeaderProps = {
    initialTitle: string;
    headerViewStyles: ViewStyle | ViewStyle[]; // Only meant to pass header dimensions, like height
    renderReadonlyMode: (title: string, onEnterEditMode: () => void) => React.ReactNode;
    renderEditMode: (title: string, setTitle: (t: string) => void, onExitEditMode: () => void) => React.ReactNode;
    onSave?: (newTitle: string) => void;
}

export const EditableHeader: React.FC<EditableHeaderProps> = ({ initialTitle, headerViewStyles, renderReadonlyMode, renderEditMode, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const styles = useEditableHeaderStyles();

    function handleEnterEditMode() {
        setIsEditing(true);
    }

    function handleExitEditMode() {
        setIsEditing(false);
        onSave?.(title);
    }

    return (
        <>
            <View style={[headerViewStyles, { zIndex: 999 }]}>
                {isEditing
                    ? renderEditMode(title, setTitle, handleExitEditMode)
                    : renderReadonlyMode(title, handleEnterEditMode)
                }
            </View>
            {isEditing ?
                <Pressable style={[styles.overlay, { zIndex: 998 }]} onPress={handleExitEditMode} />
                : <></>
            }
        </>
    );
};
