import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appColourPalette } from "../../styles/appColourPalette";
import PressableButton from "./PressableButton";

// TODO: make profileIcon passable so other icons can be in the top right as well
const backIcon = require("../../../../resources/assets/images/Global/back-icon.png");
const profileIcon = require("../../../../resources/assets/images/Global/profile-icon.png");

interface CustomHeaderProps {
    title: string,
    showBackButton?: boolean
    onRightButton?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, showBackButton = true, onRightButton }) => {
    const navigation = useNavigation();

    function onBackButton() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerBody}>
                <StatusBar style="auto" backgroundColor={appColourPalette.statusBar} />
                {showBackButton ?
                    <PressableButton style={styles.headerButton} buttonDownStyle={styles.headerButtonDown} buttonUpStyle={styles.headerButtonUp} onPress={onBackButton}>
                        <Image style={styles.headerButtonIcon} source={backIcon} />
                    </PressableButton>
                    : <PressableButton style={[styles.headerButton, styles.headerButtonUp]} buttonUpStyle={styles.headerButtonUp} />
                }
                <View>
                    <Text style={styles.headerTitleText}>{title}</Text>
                </View>
                {onRightButton ?
                    <PressableButton style={styles.headerButton} buttonDownStyle={styles.headerButtonDown} buttonUpStyle={styles.headerButtonUp} onPress={onRightButton}>
                        <Image style={styles.headerButtonIcon} source={profileIcon} />
                    </PressableButton>
                    : <PressableButton style={[styles.headerButton, styles.headerButtonUp]} buttonUpStyle={styles.headerButtonUp} />
                }
            </View>
        </View>
    );
}

const headerButtonSize = 30;

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1
    },
    headerBody: {
        flex: 1,
        padding: 5,
        flexDirection: "row",
        backgroundColor: appColourPalette.primary,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: appColourPalette.separator,
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitleText: {
        color: appColourPalette.text,
        textAlign: "center",
        fontSize: 24,
        fontWeight: 400
    },
    headerButtonIcon: {
        width: headerButtonSize,
        height: headerButtonSize
    },
    headerButton: {
        width: headerButtonSize,
        height: headerButtonSize,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    headerButtonText: {
        fontWeight: 600,
        fontSize: 12,
        color: appColourPalette.text
    },
    headerButtonUp: {
        backgroundColor: appColourPalette.primary
    },
    headerButtonDown: {
        backgroundColor: appColourPalette.primaryDarker
    }
});

export default CustomHeader;
