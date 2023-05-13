import { useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import apps from "../data/app_util/flatpak.json";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const flatpakInstallList = [];
//const flatpakSaveList = [];

export default function FlatpakList() {
  async function installFlatpakApps(list) {
    await invoke("install_apps", { apps: list, appType: "flatpak" });
  }

  return (
    <>
      <div style={{ marginTop: -65, marginBottom: 40 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
          style={{ marginRight: 40 }}
        >
          <button
            type="button"
            className="text-white bg-ctp-blue focus:ring-4  focus:ring-white dark:focus:ring-white font-medium rounded-lg text-sm py-2.5 text-center flex"
            onClick={() => installFlatpakApps(flatpakInstallList)}
          >
            <svg
              class="w-6 h-6 mr-2"
              style={{ marginTop: -2 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.782,0H5.023C3.96,0,3.091,0.87,3.091,1.931v22.942c0,1.062,0.869,1.931,1.932,1.931h16.759 c1.062,0,1.931-0.87,1.931-1.931V1.931C23.713,0.87,22.843,0,21.782,0z M4.123,25.257v-6.185l6.187,6.185H4.123z M6.392,19.881 c0.024-0.023,0.03-0.055,0.053-0.077c0.298-0.297,5.831-2.918,5.831-2.918s-2.615,5.535-2.914,5.832 c-0.024,0.022-0.059,0.028-0.083,0.058L6.392,19.881z M22.681,25.257h-6.188l6.188-6.185V25.257z M13.402,20.104 c-0.683,0-1.345-0.086-1.987-0.227c0.438-0.895,0.901-1.865,1.327-2.771l0.618-1.303l-1.301,0.618 c-1.359,0.644-2.863,1.364-4.028,1.948c-2.357-1.684-3.908-4.426-3.908-7.542c0-5.126,4.153-9.279,9.279-9.279 c5.126,0,9.279,4.153,9.279,9.279C22.681,15.947,18.528,20.104,13.402,20.104z"></path>{" "}
              <path d="M13.402,7.732c-1.709,0-3.093,1.384-3.093,3.095c0,1.706,1.384,3.089,3.093,3.089c1.708,0,3.093-1.383,3.093-3.089 C16.495,9.116,15.11,7.732,13.402,7.732z M13.402,12.889c-1.141,0-2.062-0.927-2.062-2.063c0-1.14,0.921-2.064,2.062-2.064 s2.062,0.924,2.062,2.064C15.464,11.962,14.543,12.889,13.402,12.889z"></path>
            </svg>
            Install Selected (Flatpak)
          </button>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableCell sx={{ pl: 4, fontSize: 13 }} align="center">
              Name
            </TableCell>
            <TableCell sx={{ pl: 20, fontSize: 13 }} align="justify">
              Description
            </TableCell>
            <TableCell sx={{ pr: 12, fontSize: 13 }} align="center">
              Package
            </TableCell>
            <TableCell sx={{ pr: 5, fontSize: 13 }} align="right">
              Install
            </TableCell>
          </TableHead>
        </Table>
      </TableContainer>
      <ThemeProvider theme={darkTheme}>
        <CustomizedAccordions />
      </ThemeProvider>
    </>
  );
}

const Accordion = styled((props) => <MuiAccordion disableGutters {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  })
);

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.7rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(245, 245, 245, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CustomizedAccordions() {
  return (
    <div className="appsList" style={{ marginBottom: -60 }}>
      {apps.map((app, index) => {
        let imgRef = useRef();
        let onImageError = () =>
          (imgRef.current.src = "./app-icons/settings.svg");

        return (
          <Accordion TransitionProps={{ unmountOnExit: false }}>
            <AccordionSummary id={index}>
              <Stack direction="row" spacing={1}>
                <img
                  ref={imgRef}
                  src={`./app-icons/${app.icon}.svg`}
                  onError={onImageError}
                  alt={app.icon}
                  class="w-6 h-6"
                />
                <Typography fontSize={14}>{app.name}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <InnerTable section={index} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

function InnerTable(props) {
  // Remove from install list
  const removeApp = (pkg) => {
    for (var i = 0; i < flatpakInstallList.length; i++) {
      if (flatpakInstallList[i] === pkg) {
        flatpakInstallList.splice(i, 1);
      }
    }
  };

  // Add package to install list
  function addApp(pkg) {
    if (flatpakInstallList.length === 0) {
      flatpakInstallList.push(pkg);
    } else {
      flatpakInstallList.indexOf(pkg) === -1
        ? flatpakInstallList.push(pkg)
        : console.log("This item already exists");
    }
  }

  // Detect whether box checked is true or false,
  // then run corresponding function
  const handleChange = (event) => {
    if (event.target.checked) {
      addApp(event.target.name);
    } else {
      removeApp(event.target.name);
    }

    //console.log(`${event.target.name} -> ${event.target.checked}`);
    //console.log(`Current FLATPAK list to install -> ${flatpakInstallList}`);
  };

  const app = apps[props.section];

  return (
    <>
      {app.apps.map((a) => {
        let imgRef = useRef();
        let onImageError = () =>
          (imgRef.current.src = "./app-icons/settings.svg");

        return (
          <Box sx={{ flexGrow: 1, pl: 1, pr: 1 }}>
            <Grid container spacing={10}>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1}>
                  <img
                    ref={imgRef}
                    src={`./app-icons/${a.icon}.svg`}
                    onError={onImageError}
                    alt={a.icon}
                    class="w-6 h-6"
                  />
                  <Typography fontSize={14}>{a.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} style={{marginLeft: -95}}>
                <Typography fontSize={14}>{a.description}</Typography>
              </Grid>
              <Grid item xs={3} style={{marginLeft: 25}}>
                <Typography fontSize={14}>{a.pkg}</Typography>
              </Grid>
              <Grid item xs={1} style={{marginLeft: -15}}>
                <Checkbox sx={{ mt: -1.25, ml: 3 }} name={a.pkg} onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
}
