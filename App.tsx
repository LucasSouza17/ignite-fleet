import 'react-native-get-random-values'
import './src/libs/dayjs'

import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "styled-components/native";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { REALM_APP_ID } from "@env";

import theme from "./src/theme";

import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";
import { SignIn } from "./src/screens/SignIn";
import { RealmProvider } from "./src/libs/realm";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{flex: 1, backgroundColor: theme.COLORS.GRAY_800}}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          {fontsLoaded ? (
            <UserProvider fallback={SignIn}>
              <RealmProvider>
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
