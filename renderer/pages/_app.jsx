import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../lib/theme";
import App from "next/app";
import { appWithTranslation } from "../i18n";

class MyApp extends App {
    useEffect() {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    };
    
    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <title>with-javascript-material-ui</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default appWithTranslation(MyApp);
