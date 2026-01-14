import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { appColourPalette } from "../styles/appColourPalette";
import { useStaticHeaderStyles } from "../styles/components/wayfinderHeader.styles";

interface WayfinderHeaderProps {
    title: string,
    showBackButton?: boolean
}

const WayfinderHeader: React.FC<WayfinderHeaderProps> = ({ title, showBackButton = true }) => {
    const styles = useStaticHeaderStyles();

    return (
        <>
            <StatusBar style="auto" backgroundColor={appColourPalette.statusBar} />
            <View style={styles.header}>
                <Text style={styles.headerTitleText}>{title}</Text>
            </View>
        </>
    );
}

export default WayfinderHeader;
