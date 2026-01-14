import { StyleSheet } from "react-native";
import { appColourPalette } from "../appColourPalette";

export const useStaticHeaderStyles = () => {
    return staticHeaderStyles;
}

const staticHeaderStyles = StyleSheet.create({
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
        fontSize: 28,
        fontWeight: 400
    }
});
