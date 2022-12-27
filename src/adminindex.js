// routes
// theme
// components
import React from 'react';
import DashboardLayout from "./Admin/layouts/dashboard";
import {StyledChart} from "./Admin/components/chart";
import ScrollToTop from "./Admin/components/scroll-to-top";
import ThemeProvider from "./Admin/theme";
// ----------------------------------------------------------------------

const  Adminindex = () => {
  return (
    <React.Fragment>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <DashboardLayout
          Link to ='/adminindex/app'
          >
      </DashboardLayout>
    </ThemeProvider>
  </React.Fragment>
  );
}
export default Adminindex;