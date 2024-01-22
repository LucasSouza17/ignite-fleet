import "react-native-get-random-values";
import "./src/libs/dayjs";

import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { WifiSlash } from "phosphor-react-native";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {useNetInfo} from '@react-native-community/netinfo'

import { ThemeProvider } from "styled-components/native";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { REALM_APP_ID } from "@env";

import theme from "./src/theme";

import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";
import { SignIn } from "./src/screens/SignIn";
import { RealmProvider, syncConfig } from "./src/libs/realm";
import { TopMessage } from "./src/components/TopMessage";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const netInfo = useNetInfo();

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
          {!netInfo.isConnected && <TopMessage title="Você está off-line" icon={WifiSlash} />}
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          {fontsLoaded ? (
            <UserProvider fallback={SignIn}>
              <RealmProvider sync={syncConfig} fallback={Loading}>
                <Routes />
              </RealmProvider>
            </UserProvider>
          ) : (
            <Loading />
          )}
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
