import { forwardRef } from "react";
import { useTheme } from "styled-components/native";
import { TextInput, TextInputProps } from "react-native";

import { Container, Input, Label } from "./styles";

type Props = TextInputProps & {
  label: string;
};

export const LicensePlateInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme();

    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    );
  }
);
