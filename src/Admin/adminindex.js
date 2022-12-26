import React from 'react';
import ScrollToTop from "./components/scroll-to-top";
import {StyledChart} from "./components/chart";
import ThemeProvider from "./theme";
import Routes from "./routes";


export default function adminindex() {
    return (
        <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Routes/>
        </ThemeProvider>
    );
}
