// common-component
import Spinner from "@src/components/common/Spinner";

// style
import { Wrapper } from "./style";

type Props = {
  type: "submit" | "button";
  contents: React.ReactNode | string;
  loading?: boolean;
  primary?: boolean;
  [index: string]: any;
};

const Button = ({ type, contents, loading, primary }: Props) => {
  return (
    <Wrapper type={type} primary={primary}>
      {loading ? <Spinner kinds="button" /> : contents}
    </Wrapper>
  );
};

export default Button;
