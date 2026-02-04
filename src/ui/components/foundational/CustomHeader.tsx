import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColourPalette } from "../../styles/appColourPalette";

interface CustomHeaderProps {
    title: string,
    showBackButton?: boolean
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, showBackButton = true }) => {
    return (
        <>
            <StatusBar style="auto" backgroundColor={appColourPalette.statusBar} />
            <View style={styles.header}>
                <Text style={styles.headerTitleText}>{title}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: "100%",
        backgroundColor: appColourPalette.primary,
        borderBottomWidth: 1,
        borderBottomColor: appColourPalette.separator,
        justifyContent: "center"
    },
    headerTitleText: {
        color: appColourPalette.text,
        textAlign: "center",
        fontSize: 24,
        fontWeight: 400
    }
});

export default CustomHeader;
