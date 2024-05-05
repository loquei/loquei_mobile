import "styled-components";
import { theme } from "../theme";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType { }
}