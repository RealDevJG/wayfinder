import React, { useState } from "react";
import { View, ViewProps } from "react-native";

export interface EditableHeaderProps {
    initialTitle: string;
    headerViewStyles: ViewProps | object; // Only meant to pass header dimensions, like height
    renderReadonlyMode: (title: string, onEnterEditMode: () => void) => React.ReactNode;
    renderEditMode: (title: string, setTitle: (t: string) => void, onExitEditMode: () => void) => React.ReactNode;
    onSave?: (newTitle: string) => void;
}

export const EditableHeader: React.FC<EditableHeaderProps> = ({ initialTitle, headerViewStyles, renderReadonlyMode, renderEditMode, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    function handleEnterEditMode() {
        setIsEditing(true);
    }

    function handleExitEditMode() {
        setIsEditing(false);
        onSave?.(title);
    }

    return (
        <View style={headerViewStyles}>
            {isEditing
                ? renderEditMode(title, setTitle, handleExitEditMode)
                : renderReadonlyMode(title, handleEnterEditMode)
            }
        </View>
    );
};
