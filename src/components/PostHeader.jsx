import { CardHeader } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@material-tailwind/react";

import settings from "../assets/settings.svg";

export default function PostHeader() {
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
            alt="settings"
            src={settings}
            sx={{ width: 72, height: 72 }}
          />
          <Stack style={{ marginTop: -10, paddingBottom: 25 }}>
            <Typography variant="h2" style={postHeaderStyle}>
              Post-Install
            </Typography>
            <Typography variant="h2" style={postHeaderStyle}>
              Configuration
            </Typography>
          </Stack>
        </Stack>
      </div>
    </CardHeader>
  );
}

///////////////////////////
//        STYLING        //
///////////////////////////

const postHeaderStyle = {
  color: "white",
  fontFamily: "Michroma",
};
