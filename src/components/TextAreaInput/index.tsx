import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container, Input, Label } from "./styles";

type Props = TextInputProps & {
  label: string;
};

export const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        ref={ref}
        multiline
        autoCapitalize="sentences"
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
});
