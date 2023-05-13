import * as React from "react";
import { CardHeader } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { invoke } from "@tauri-apps/api/tauri";

import nr from "../assets/nr.png";
import logo from "../assets/xero.svg";
import info from "../assets/info.svg";

import github from "../assets/github.svg";
import medium from "../assets/medium.svg";
import twitter from "../assets/twitter.svg";
import website from "../assets/website.png";

const creditsModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 350,
  bgcolor: "#2f2f2f",
  border: "2px solid #FFCFF2",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function WelcomeHeader() {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const toggleInfo = () => setInfoOpen(!isInfoOpen);

  async function RunCreatorCommand(endpoint) {
    await invoke("open_creator_page", { uri: endpoint });
  }

  return (
    <CardHeader
      style={{ backgroundImage: `linear-gradient(175deg, #cba6f7, #8839ef)` }} 
      className="relative"
    >
      <IconButton
        size="small"
        sx={{ height: 15, width: 15 }}
        style={{ marginTop: "4%", marginLeft: 20 }}
      >
        <Avatar
          alt="Info"
          sx={{ height: 25, width: 25 }}
          src={info}
          onClick={toggleInfo}
        />
      </IconButton>
      <div className="row">
        <img
          src={logo}
          alt="xero-logo"
          style={{ height: 175, width: 175, marginTop: -50 }}
        />
      </div>
      <div className="row">
        <Typography variant="h3" style={welcomeHeaderStyle}>
          Welcome to Xerolinux!
        </Typography>
      </div>
      <Modal
        open={isInfoOpen}
        onClose={toggleInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={creditsModalStyle}>
          <div className="text-center">
            <div className="row">
              <img src={nr} alt="Null-Return" style={{ width: 150 }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Created by Ed Rutherford
              </Typography>
            </div>
            <div>
              <Typography variant="h4" style={{ fontSize: 18 }}>
                Founder and Lead Developer of Null-Return IT Services &
                Consulting
              </Typography>
            </div>
            <div className="row gap-8">
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%" }}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={github}
                  onClick={() =>
                    RunCreatorCommand("https://github.com/dedSyn4ps3")
                  }
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%" }}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={medium}
                  onClick={() =>
                    RunCreatorCommand(
                      "https://medium.com/@erutherford_nullreturn"
                    )
                  }
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%" }}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={twitter}
                  onClick={() =>
                    RunCreatorCommand("https://twitter.com/EddieSneed66")
                  }
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%" }}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={website}
                  onClick={() =>
                    RunCreatorCommand("https://www.nullreturn-it.com")
                  }
                />
              </IconButton>
            </div>
            <div className="flex justify-center" style={{ marginTop: 20 }}>
              <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
                Made with{" "}
                <span>
                  <FavoriteIcon style={{ color: "red" }} />
                </span>{" "}
                in Ohio
              </Typography>
            </div>
          </div>
        </Box>
      </Modal>
    </CardHeader>
  );
}

const welcomeHeaderStyle = {
  marginTop: -20,
  paddingBottom: 10,
  color: "white",
  fontFamily: "Michroma",
};