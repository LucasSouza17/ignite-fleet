import { IconProps } from "phosphor-react-native";
import { Container, SizeProps } from "./styles";
import { IconBoxProps } from "../ButtonIcon";
import { useTheme } from "styled-components/native";

type Props = {
  size?: SizeProps;
  icon: IconBoxProps;
};

export function IconBox({ size = "NORMAL", icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const iconSize = size === "NORMAL" ? 24 : 16;

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  );
}
