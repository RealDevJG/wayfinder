import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { OAuthProvider } from "../../../../shared/domain/oAuthProvider";
import { useOAuthViewStyles } from "../../../styles/screens/oauthlogin/oauthlogin.OAuthLoginView.styles";
import BannerButton from "../../foundational/BannerButton";

type OAuthLoginViewProps = {
    providerTitle: OAuthProvider;
    providerImage: ImageSourcePropType;
    onPress: () => void;
}

const OAuthLoginView: React.FC<OAuthLoginViewProps> = ({ providerTitle, providerImage, onPress }) => {
    const styles = useOAuthViewStyles();

    return (
        <BannerButton style={styles.containerButton} buttonUpStyle={styles.containerButtonUp} buttonDownStyle={styles.containerButtonDown} onPress={onPress}>
            <View style={styles.containerContents}>
                <Image style={styles.providerImage} source={providerImage} />
            </View>
            <View style={styles.containerContents}>
                <Text style={styles.providerTitle}>{providerTitle}</Text>
            </View>
        </BannerButton>
    );
}

export default OAuthLoginView;
