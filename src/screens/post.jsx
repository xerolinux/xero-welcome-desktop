import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import PostHeader from "../components/PostHeader";

import youtubeLogo from "../assets/youtube.svg";
import mastodonLogo from "../assets/mastodon.svg";
import discordLogo from "../assets/discord.svg";

function Post() {
  async function RunPostCommand(name) {
    await invoke(name).catch((error) => console.log(error));
  }

  return (
    <div>
      <PostHeader />
      <div style={{ marginLeft: "2%" }}>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ marginTop: 20, fontSize: 18 }}>
            This is where you configure your system using variety of our
            scripts. We will do our best to help you
          </p>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ fontSize: 18 }}>
            tweak your system for a good balance between best performance &amp;
            stability.
          </p>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ marginTop: 20, fontSize: 18 }}>
            Use only what you need, not all are meant to be used. Also, this is
            just the beginning, we will have
          </p>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ fontSize: 18 }}>
            more tweaks added as time goes by. Oh, and this tool was meant to
            only be used with XeroLinux. If you
          </p>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ fontSize: 18 }}>
            like some of the features and want to use them on another Arch-based
            Distro, you can,
          </p>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <p style={{ fontSize: 18 }}>though it's not recommended...</p>
        </div>
        <div style={{ marginTop: 20, marginLeft: "2%" }}>
          <p style={{ fontSize: 18 }}>
            Please do NOT ask for support if you do, thanks!
            <b> Enjoy tweaking your XeroLinux!!!</b>
          </p>
        </div>

        <div className="row" style={{ marginTop: 80, marginLeft: -10 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("apply_defaults")}
            >
              Restore Defaults
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("switch_zsh")}
            >
              Switch to ZSH with OMZ/P10K
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("refresh_keys")}
            >
              Fix ArchLinux Keyrings
            </Button>
          </Stack>
        </div>

        <div className="row" style={{ marginTop: 20, marginLeft: -10 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("oh_my_bash")}
            >
              Apply Oh My BASH!
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("init_snapper")}
            >
              Initialize Snapper (BTRFS)
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("enable_wayland")}
            >
              Enable Wayland Session
            </Button>
          </Stack>
        </div>

        <div className="row" style={{ marginTop: 20, marginLeft: -10 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("enable_firewall")}
            >
              Install/Enable Firewall
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("enable_hblock")}
            >
              Install/Enable HBlock
            </Button>
            <Button
              variant="contained"
              style={{ height: 40, width: 300, fontSize: 16, backgroundColor: "#4a047c" }}
              onClick={() => RunPostCommand("fix_res")}
            >
              QEMU Resolution Fix
            </Button>
          </Stack>
        </div>
      </div>

      <footer class="absolute inset-x-0 bottom-0 p-4 sm:p-6 dark:bg-gray-900">
        <hr class="my-10 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-10" />
        <div
          class="sm:flex sm:items-center sm:justify-between"
          style={{ marginTop: -15 }}
        >
          <span class="text-md text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a
              onClick={() => OpenFaqPage("open_xero_main")}
              class="hover:underline"
            >
              XeroLinux™
            </a>
            . All Rights Reserved.
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                src={youtubeLogo}
                onClick={() => OpenFaqPage("open_xero_youtube")}
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
                onClick={() => OpenFaqPage("open_xero_mastodon")}
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
                onClick={() => OpenFaqPage("open_xero_discord")}
                alt="discord"
                class="w-7 h-7"
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

export default Post;
