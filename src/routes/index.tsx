import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { TopMessage } from "../components/TopMessage";
import { AppRoutes } from "./app.routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Routes() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        config={{
          info: ({ text1 }) => <TopMessage title={String(text1)} />,
        }}
      />
    </NavigationContainer>
  );
}
