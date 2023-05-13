import { CardHeader } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import packages from "../assets/package.svg";

export default function AppsHeader() {
  return (
    <CardHeader
      style={{ backgroundImage: `linear-gradient(175deg, #cba6f7, #8839ef)` }}
      className="relative"
    >
      <Stack direction="row" style={{ justifyContent: "space-between" }}>
        <Link to={"/"}>
          <div className="pt-10 pl-2">
            <button
              type="button"
              className="text-white bg-ctp-mauve focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm py-2.5 text-center flex"
            >
              <svg
                class="w-6 h-6 mr-2"
                style={{ marginTop: -2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Go Back
            </button>
          </div>
        </Link>
      </Stack>
      <div className="row">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="packages"
            variant="square"
            src={packages}
            sx={{ width: 50, height: 50 }}
          />
          <Typography variant="h2" style={appsHeaderStyle}>
            Install Some Packages!
          </Typography>
        </Stack>
      </div>
      <div className="row">
        <p className="text-center" style={appBodyStyle}>
          Our developers and community members have put together a collection of
        </p>
      </div>
      <div className="row">
        <p className="text-center" style={appBodyStyle}>
          hand-picked packages for our users to choose from to install.
        </p>
      </div>
      <div className="row">
        <p className="text-center" style={appBodyStyle}>
          Simply browse through the different sections and select the apps you
          wish to
        </p>
      </div>
      <div className="row" style={{ marginBottom: 20 }}>
        <p className="text-center" style={appBodyStyle}>
          have available on your system, and our application installer will
          handle the rest!
        </p>
      </div>
    </CardHeader>
  );
}

///////////////////////////
//   COMPONENT STYLING   //
///////////////////////////

const appsHeaderStyle = {
  marginBottom: 20,
  color: "white",
  fontFamily: "Michroma",
};

const appBodyStyle = { fontSize: 20, color: "white", fontWeight: "500" };
