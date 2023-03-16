import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import AppsList from "./AppsList";
import FlatpakList from "./FlatpakList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomizedTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(24, 23, 25, 0.80)",
    color: "rgba(255, 255, 255, 0.95)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`apps-tabpanel-${index}`}
      aria-labelledby={`apps-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function tabProps(index) {
  return {
    id: `apps-tab-${index}`,
    "aria-controls": `apps-tabpanel-${index}`,
  };
}

export default function ApplicationTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <ThemeProvider theme={darkTheme}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ mr: 3 }}
            centered
            aria-label="application tabs"
          >
            <CustomizedTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <b>{"System Managed"}</b>
                  </Typography>
                  Your typical application, installed system-wide; Uses
                  libraries installed and available from <b>{"pacman"}</b>
                </React.Fragment>
              }
              placement="left"
            >
              <Tab label="Native Binaries" {...tabProps(0)} />
            </CustomizedTooltip>
            <CustomizedTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <b>{"Containerized"}</b>
                  </Typography>
                  Applications are managed by Flatpak and include all needed
                  dependencies; Installed in an isolated environment
                </React.Fragment>
              }
              placement="right"
            >
              <Tab label="Flatpaks" {...tabProps(1)} />
            </CustomizedTooltip>
          </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0}>
        <AppsList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FlatpakList />
      </TabPanel>
    </Box>
  );
}
