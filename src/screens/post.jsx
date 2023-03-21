import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import PostHeader from "../components/PostHeader";

function Post() {

  async function RunPostCommand(c) {
    await invoke("run_post_command", { command: c }).catch((error) =>
      console.log(error)
    );
  }

  async function FixResolution() {
    await invoke("fix_res");
  }

  return (
    <div>
      <PostHeader />
      <div>
        <div className="row">
          <p style={{ marginTop: 40, fontSize: 20 }}>
            This is where you configure your system using variety of our scripts. We will do our best to
          </p>
        </div>
        <div className="row">
          <p style={{ fontSize: 20 }}>
            help you tweak your system for a good balance between best 
          </p>
        </div>
        <div className="row">
          <p style={{ fontSize: 20 }}>
            performance &amp; stability.
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ marginTop: 20, fontSize: 20 }}>
            Use only what you need, not all are meant to be used. Also, this is just the beginning,
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 20 }}>
            we will have more tweaks added as time goes by. Oh, and this tool was meant to only be used with XeroLinux.
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 20 }}>
            If you like some of the features and want to use them on another Arch-based Distro,
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 20 }}>
            you can, though it's not recommended...
          </p>
        </div>
        <div className="row" style={{ marginTop: 20 }}>
          <p className="text-center" style={{ fontSize: 20 }}>
            Please do NOT ask for support if you do. Thanks!
          </p>
        </div>
        <div className="row" style={{ marginTop: 20 }}>
          <p className="text-center" style={{ fontSize: 20 }}>
            <b>
              Enjoy tweaking your XeroLinux ;)
            </b>
          </p>
        </div>

        <div className="row gap-12" style={{ marginTop: 60 }}>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunPostCommand("apply_defaults.sh")}
          >
            Restore Default Desktop Settings
          </Button>
          <Link to={"/drivers"}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("switch_to_zsh.sh")}
            >
              Switch to ZSH with OMZ/P10K
            </Button>
          </Link>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunPostCommand("")} // **TODO **
          >
            Fix ArchLinux Keyrings
          </Button>
        </div>

        <div className="row gap-12" style={{ marginTop: 20 }}>
          <Link to={"/faq"}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("oh_my_bash.sh")}
            >
              Apply Oh My BASH!
            </Button>
          </Link>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunPostCommand("init_snapper.sh")}
          >
            Initialize Snapper (BTRFS)
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunPostCommand("enable_wayland.sh")}
          >
            Enable Wayland Session
          </Button>
        </div>

        <div className="row gap-12" style={{ marginTop: 20 }}>
          <Link to={"/apps"}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("firewalled.sh")}
            >
              Install/Enable Firewall
            </Button>
          </Link>
          <Link to={"/apps"}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("")} // ** TODO **
            >
              Install/Enable HBlock
            </Button>
          </Link>
          <Link to={"/apps"}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
              onClick={() => FixResolution()}
            >
              QEMU Resolution Fix
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
