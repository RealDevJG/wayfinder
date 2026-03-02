import { ConfigContext, ExpoConfig } from "expo/config";

const APP_NAME = "wayfinder";
const PASCAL_APP_NAME = APP_NAME[0].toUpperCase() + APP_NAME.slice(1);
const APP_VERSION = "1.0.0";

const BACKGROUND_COLOUR = "#00ceff";

function getScheme() {
	const env = process.env.EXPO_PUBLIC_APP_ENV;
	return `${APP_NAME}-${env}`;
}

function getName() {
	const env = process.env.EXPO_PUBLIC_APP_ENV;

	if (env === "prod") {
		return PASCAL_APP_NAME;
	}

	return `${PASCAL_APP_NAME}-${env}`;
}

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: getName(),
	slug: PASCAL_APP_NAME,
	scheme: getScheme(),
	version: APP_VERSION,
	orientation: "default",
	icon: "./resources/assets/images/branding/icon.png",
	userInterfaceStyle: "light",
	newArchEnabled: true,
	splash: {
		image: "./resources/assets/images/branding/splash-icon.png",
		resizeMode: "contain",
		backgroundColor: BACKGROUND_COLOUR
	},
	ios: {
		supportsTablet: true
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./resources/assets/images/branding/adaptive-icon.png",
			backgroundColor: BACKGROUND_COLOUR
		},
		edgeToEdgeEnabled: true,
		predictiveBackGestureEnabled: false,
		package: `net.devjg.${getScheme().replaceAll("-", ".")}`
	},
	androidStatusBar: {
		translucent: false
	},
	web: {
		favicon: "./resources/assets/images/branding/favicon.png"
	},
	extra: {
		eas: {
			projectId: "01b7ed55-ea7b-46db-b841-84d5e72ec812"
		}
	},
	owner: "realdevjg"
});
