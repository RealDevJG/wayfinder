import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { useCustomHeaderStyles } from "../../../styles/components/foundational/CustomHeader.styles";
import CustomPressable from "../CustomPressable";

const backIcon = require("../../../../../resources/assets/images/global/back-icon.png") as ImageSourcePropType;
const profileIcon = require("../../../../../resources/assets/images/global/profile-icon.png") as ImageSourcePropType;

type CustomHeaderProps = {
    title: string;
    leftButtonIcon?: ImageSourcePropType;
    rightButtonIcon?: ImageSourcePropType;
    onLeftButton?: () => void;
    onRightButton?: () => void;
    showLeftButton?: boolean;
    showRightButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, leftButtonIcon, rightButtonIcon, onLeftButton, onRightButton, showLeftButton = true, showRightButton = true }) => {
    const navigation = useNavigation();
    const styles = useCustomHeaderStyles();

    leftButtonIcon ??= backIcon;
    rightButtonIcon ??= profileIcon;
    onLeftButton ??= onBackButton;

    function onBackButton() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerBody}>
                {showLeftButton ?
                    <CustomPressable style={styles.headerButton} buttonDownStyle={styles.headerButtonDown} buttonUpStyle={styles.headerButtonUp} onPress={onLeftButton}>
                        <Image style={styles.headerButtonIcon} source={leftButtonIcon} />
                    </CustomPressable>
                    : <CustomPressable style={[styles.headerButton, styles.headerButtonUp]} buttonUpStyle={styles.headerButtonUp} />
                }
                <View>
                    <Text style={styles.headerTitleText}>{title}</Text>
                </View>
                {showRightButton ?
                    <CustomPressable style={styles.headerButton} buttonDownStyle={styles.headerButtonDown} buttonUpStyle={styles.headerButtonUp} onPress={onRightButton}>
                        <Image style={styles.headerButtonIcon} source={rightButtonIcon} />
                    </CustomPressable>
                    : <CustomPressable style={[styles.headerButton, styles.headerButtonUp]} buttonUpStyle={styles.headerButtonUp} />
                }
            </View>
        </View>
    );
}

export default CustomHeader;
