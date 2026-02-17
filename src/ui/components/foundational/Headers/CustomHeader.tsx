import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appColourPalette } from "../../../styles/appColourPalette";
import CustomPressable from "../CustomPressable";

// TODO: make profileIcon passable so other icons can be in the top right as well
const backIcon = require("../../../../../resources/assets/images/global/back-icon.png");
const profileIcon = require("../../../../../resources/assets/images/global/profile-icon.png");

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
        <View style={headerStyles.headerContainer}>
            <View style={headerStyles.headerBody}>
                <StatusBar style="auto" backgroundColor={appColourPalette.statusBar} />
                {showBackButton ?
                    <CustomPressable style={headerStyles.headerButton} buttonDownStyle={headerStyles.headerButtonDown} buttonUpStyle={headerStyles.headerButtonUp} onPress={onBackButton}>
                        <Image style={headerStyles.headerButtonIcon} source={backIcon} />
                    </CustomPressable>
                    : <CustomPressable style={[headerStyles.headerButton, headerStyles.headerButtonUp]} buttonUpStyle={headerStyles.headerButtonUp} />
                }
                <View>
                    <Text style={headerStyles.headerTitleText}>{title}</Text>
                </View>
                {onRightButton ?
                    <CustomPressable style={headerStyles.headerButton} buttonDownStyle={headerStyles.headerButtonDown} buttonUpStyle={headerStyles.headerButtonUp} onPress={onRightButton}>
                        <Image style={headerStyles.headerButtonIcon} source={profileIcon} />
                    </CustomPressable>
                    : <CustomPressable style={[headerStyles.headerButton, headerStyles.headerButtonUp]} buttonUpStyle={headerStyles.headerButtonUp} />
                }
            </View>
        </View>
    );
}

// TODO: put styles in its own file for consistency across the app
const headerButtonSize = 34;

export const headerStyles = StyleSheet.create({
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
