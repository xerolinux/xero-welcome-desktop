import * as React from "react";
import { CardHeader } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Modal } from "flowbite-react";

import { invoke } from "@tauri-apps/api/tauri";

import nr from "../assets/nr.png"
import logo from "../assets/xero.svg";
import info from "../assets/info.svg";

import github from "../assets/github.svg"
import medium from "../assets/medium.svg"
import twitter from "../assets/twitter.svg"
import website from "../assets/website.png"

export default function WelcomeLiveHeader() {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const toggleInfo = () => setInfoOpen(!isInfoOpen);

  async function RunCreatorCommand(endpoint) {
    await invoke('open_creator_page', {uri: endpoint});
  }

  return (
    <CardHeader
      style={{ backgroundImage: `linear-gradient(185deg, #FF0076, #590FB7)` }}
      className="relative"
    >
      <IconButton
        size="small"
        sx={{ height: 25, width: 25 }}
        style={{ marginTop: "3%", marginLeft: 20 }}
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
          style={{ height: 225, width: 225, marginTop: -60 }}
        />
      </div>
      <div className="row">
        <Typography variant="h2" style={welcomeHeaderStyle}>
          Welcome to Xerolinux!
        </Typography>
      </div>
      <Modal show={isInfoOpen} size="3xl" popup={true} onClose={toggleInfo}>
        <Modal.Header style={{ backgroundColor: "#3f3f3f" }}/>
        <Modal.Body style={{ backgroundColor: "#2f2f2f" }}>
          <div className="text-center">
            <div className="row">
              <img src={nr} alt="Null-Return" style={{width:150}}/>
            </div>
            <div style={{marginTop:20}}>
              <Typography variant="h4" style={{fontWeight: 'bold'}}>
                Created by Ed Rutherford
              </Typography>
            </div>
            <div>
              <Typography variant="h4" style={{fontSize: 18}}>
                Founder and Lead Developer of Null-Return IT Services & Consulting
              </Typography>
            </div>
            <div className="row gap-8">
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%"}}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={github}
                  onClick={() => RunCreatorCommand("https://github.com/dedSyn4ps3")}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%"}}
              >
                <Avatar
                  alt="Info"
                  sx={{ height: 40, width: 40 }}
                  src={medium}
                  onClick={() => RunCreatorCommand("https://medium.com/@erutherford_nullreturn")}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%"}}
              >
                <Avatar
                  sx={{ height: 40, width: 40 }}
                  src={twitter}
                  onClick={() => RunCreatorCommand("https://twitter.com/EddieSneed66")}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ height: 40, width: 40 }}
                style={{ marginTop: "3%"}}
              >
                <Avatar
                  sx={{ height: 40, width: 40 }}
                  src={website}
                  onClick={() => RunCreatorCommand("https://www.nullreturn-it.com")}
                />
              </IconButton>
            </div>
            <div className="flex justify-center" style={{marginTop:20}}>
              <Typography style={{fontSize: 18, fontWeight:'bold'}}>
                Made with {' '}<span><FavoriteIcon style={{color:'red'}}/></span>{' '} in Ohio
              </Typography> 
            </div>
          </div>
        </Modal.Body>
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