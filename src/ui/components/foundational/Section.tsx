import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useSectionStyles } from "../../styles/components/foundational/Section.styles";

type SectionProps = {
    title?: string;
    optionComponent?: ReactNode;
    children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, optionComponent, children }) => {
    const styles = useSectionStyles();

    return (
        <>
            <View style={styles.dividerHeaderContainer}>
                <View style={[styles.edgeDivider, styles.dividerCommon]} />
                {title ?
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                    : <></>
                }
                <View style={[styles.middleDivider, styles.dividerCommon]} />
                {optionComponent}
                <View style={[styles.edgeDivider, styles.dividerCommon]} />
            </View>
            <View>
                {children}
            </View>
        </>
    );
}

export default Section;
