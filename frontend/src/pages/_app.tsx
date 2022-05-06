import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

// store
import wrapper from "@src/store/configureStore";

// style
import GlobalStyles from "@src/styles/GlobalStyles";
import theme from "@src/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
