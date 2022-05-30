// type
import { CSSProperties } from "react";

// common-component
import Spinner from "@src/components/common/Spinner";

// style
import { Wrapper } from "./style";

type Props = {
  type: "submit" | "button";
  contents: React.ReactNode | string;
  loading?: boolean;
  primary?: boolean;
  follow?: boolean;
  style?: CSSProperties;
  spinnerColor?: string;
  [index: string]: any;
};

const Button = ({
  type,
  contents,
  loading,
  primary,
  follow,
  style,
  spinnerColor,
  ...props
}: Props) => {
  return (
    <Wrapper
      type={type}
      primary={primary}
      follow={follow}
      {...props}
      style={style}
    >
      {loading ? <Spinner kinds="button" color={spinnerColor} /> : contents}
    </Wrapper>
  );
};

export default Button;
