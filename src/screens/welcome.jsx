import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import { Modal } from "flowbite-react";

import youtubeLogo from "../assets/youtube.svg";
import mastodonLogo from "../assets/mastodon.svg";
import discordLogo from "../assets/discord.svg";
import donate from "../assets/money.svg";
import logo from "../assets/donate.png";
import patreon from "../assets/patreon.svg"

import WelcomeHeader from "../components/WelcomeHeader";
import StartupSwitch from "../components/StartupSwitch";


function Welcome() {
  
  async function RunBackendCommand(name) {
    await invoke(name);
  }

  async function ChangeAutoStart(status) {
    await invoke("set_autostart", { autostart: status});
  }

  function UpdateToggle() {
    toggleChecked();
    ChangeAutoStart(!isChecked);
  }

  const [isDonateOpen, setDonateOpen] = React.useState(false);
  const toggleDonate = () => setDonateOpen(!isDonateOpen);

  const [isChecked, setChecked] = React.useState(true);
  const toggleChecked = () => setChecked(!isChecked);

  return (
    <div>
      <WelcomeHeader />
      <div>
        <div className="row">
          <p style={{ marginTop: 20, fontSize: 18 }}>
            <b>Thank you for joining our community!</b>
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ marginTop: 20, fontSize: 18 }}>
            We, the XeroLinux Developers, hope that you will enjoy using
            XeroLinux as much as we enjoy building it.
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 18 }}>
            The links below will help you get started with your new operating
            system.
          </p>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <p className="text-center" style={{ fontSize: 18 }}>
            <b>
              So enjoy the experience, and don't hesitate to send us your
              feedback.
            </b>
          </p>
        </div>
        <div className="row" style={{ marginTop: 40 }}>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("run_system_update")}
          >
            Update System Now
          </Button>
        </div>

        <div className="row gap-10" style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("update_mirrors")}
          >
            Update Arch Mirrors
          </Button>
          <Link to={"/drivers"}>
            <Button
              variant="contained"
              style={{ width: 300, backgroundColor: "#4a047c" }}
            >
              Install Drivers
            </Button>
          </Link>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("fix_gpg_keys")}
          >
            Fix GnuPG Keys
          </Button>
        </div>

        <div className="row gap-10" style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("open_xero_faq")}
          >
            F.A.Q.
          </Button>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("open_xero_github")}
          >
            Source Code (GitHub)
          </Button>
          <Button
            variant="contained"
            style={{ width: 300, backgroundColor: "#4a047c" }}
            onClick={() => RunBackendCommand("open_xero_forum")}
          >
            Forums
          </Button>
        </div>

        <div className="row gap-10" style={{ marginTop: 20 }}>
          <Link to={"/apps"}>
            <Button
              variant="contained"
              style={{ width: 300, backgroundColor: "#4a047c" }}
            >
              Install Applications
            </Button>
          </Link>
        </div>
      </div>

      <footer class="absolute inset-x-0 bottom-0 p-4 sm:p-6 dark:bg-gray-900 mt-5">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div
          class="sm:flex sm:items-center sm:justify-between"
          style={{ marginTop: -10 }}
        >
          <span class="text-md text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a
              onClick={() => RunBackendCommand("open_xero_main")}
              class="hover:underline"
            >
              XeroLinux™
            </a>
            . All Rights Reserved.
          </span>
          <Chip
            avatar={<Avatar alt="Donate" src={donate} />}
            label="DONATE"
            color="success"
            clickable
            onClick={toggleDonate}
          />
          <Modal show={isDonateOpen} size="4xl" popup={true} onClose={toggleDonate}>
            <Modal.Header style={{ backgroundColor: "#3f3f3f" }}/>
            <Modal.Body style={{ backgroundColor: "#2f2f2f" }}>
              <div className="text-center">
                <div className="row">
                  <img
                    src={logo}
                    alt="donate-banner"
                    style={{height: 175}}
                  />
                </div>
                <h3 className="text-lg font-bold">
                In light of the current situation, maintaining the project, or any extra ones, pro-bono,
                </h3>
                <h3 className="text-lg font-bold">
                is harder than it should be. Your contributions will go a long way
                </h3>
                <h3 className="mb-5 text-lg font-bold">
                into sustaining it for a long time to come.
                </h3>
                <h3 className="mb-5 text-lg font-bold">
                (Fundrazr = {' '} <span style={{color: 'yellow', fontWeight: 'bold'}}>One-Time</span>{' '} / Patreon = <span style={{color: 'green', fontWeight: 'bold'}}>Monthly</span>)
                </h3>
                <div className="flex justify-center gap-4">
                  <Button variant="contained" style={{ backgroundImage: `linear-gradient(185deg, #FF0076, #590FB7)` }} onClick={() => RunBackendCommand("open_xero_fundrazr")} startIcon={<Avatar alt="fundrazr" src={donate} />}>FundRazr</Button>
                  <Button variant="contained" style={{ backgroundImage: `linear-gradient(185deg, #FF0076, #590FB7)` }} onClick={() => RunBackendCommand("open_xero_patreon")} startIcon={<Avatar alt="patreon" src={patreon} />}>Patreon</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <FormControlLabel
            control={<StartupSwitch sx={{ mr: 1, ml: -1 }} checked={isChecked} onChange={UpdateToggle} />}
            label="Run at Startup"
          />
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                src={youtubeLogo}
                onClick={() => RunBackendCommand("open_xero_youtube")}
                alt="youtube"
                class="w-6 h-6"
              />
              <span class="sr-only">YouTube Channel</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                src={mastodonLogo}
                onClick={() => RunBackendCommand("open_xero_mastodon")}
                alt="mastodon"
                class="w-6 h-6"
              />
              <span class="sr-only">Mastodon Page</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                src={discordLogo}
                onClick={() => RunBackendCommand("open_xero_discord")}
                alt="discord"
                class="w-6 h-6"
              />
              <span class="sr-only">Discord Page</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6"
                fill="white"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">GitHub Account</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
