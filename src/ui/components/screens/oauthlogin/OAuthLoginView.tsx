import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { appColourPalette } from "../../../styles/appColourPalette";
import PressableButton from "../../foundational/PressableButton";

interface OAuthLoginViewProps {
    providerTitle: string;
    providerImage: ImageSourcePropType;
    onPress: () => void;
}

const OAuthLoginView: React.FC<OAuthLoginViewProps> = ({ providerTitle, providerImage, onPress }) => {
    return (
        <PressableButton style={styles.containerButton} buttonUpStyleOverride={styles.containerButtonUp} buttonDownStyleOverride={styles.containerButtonDown} onPress={onPress}>
            <View style={styles.containerContents}>
                <Image style={styles.providerImage} source={providerImage} />
            </View>
            <View style={styles.containerContents}>
                <Text style={styles.providerTitle}>{providerTitle}</Text>
            </View>
        </PressableButton>
    );
}

const styles = StyleSheet.create({
    containerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        padding: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: appColourPalette.separator
    },
    containerButtonUp: {
        backgroundColor: appColourPalette.secondary
    },
    containerButtonDown: {
        backgroundColor: appColourPalette.secondaryDarker
    },
    containerContents: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    providerTitle: {
        fontSize: 16,
        textAlign: "center"
    },
    providerImage: {
        width: 50,
        height: 50
    }
});

export default OAuthLoginView;
