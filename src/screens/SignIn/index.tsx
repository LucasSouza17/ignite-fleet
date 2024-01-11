import { useState } from "react";
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Realm from 'realm'
import { useApp } from "@realm/react";

import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "@env";

import { Container, Title, Slogan } from "./styles";
import { Button } from "../../components/Button";

import backgroundImg from "../../assets/background.png";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
  const [isAutheticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const { idToken } = await GoogleSignin.signIn();

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google.");
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticating(false);
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google.");
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAutheticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
