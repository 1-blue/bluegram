import "styled-components";
import { Color } from "@src/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    color: Color;
  }
}
