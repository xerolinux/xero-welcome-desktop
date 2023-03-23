import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Button from "@mui/material/Button";

import youtubeLogo from "../assets/youtube.svg";
import mastodonLogo from "../assets/mastodon.svg";
import discordLogo from "../assets/discord.svg";

import FaqHeader from "../components/FaqHeader";

function Faq() {
  async function OpenFaqPage(page) {
    await invoke("open_faq_page", { url: page });
  }

  return (
    <div>
      <FaqHeader />
      <div>
        <div className="row">
          <p className="text-center" style={{ marginTop: 40, fontSize: 20 }}>
            This is where you find the list of the Frequently Asked Questions,
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 20 }}>
            in case you are having issues.
          </p>
        </div>
        <div className="row">
          <p className="text-center" style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25, marginBottom: -20 }}>
            Answers are hosted on XeroLinux
            Forums
          </p>
        </div>
        <div className="row gap-4" style={{ marginTop: 60 }}>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-87.html")
            }
          >
            Failed mirror (404) update issues
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-115.html")
            }
          >
            Issues with Pacman Backend
          </Button>
        </div>
        <div className="row gap-4" style={{ marginTop: 25 }}>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-118.html")
            }
          >
            Building ISO from Source
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-95.html")
            }
          >
            Auto mount drives on startup
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-5.html")
            }
          >
            Dual booting with Windows
          </Button>
        </div>
        <div className="row gap-4" style={{ marginTop: 25 }}>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-37.html")
            }
          >
            Downgrading specific Packages
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-144.html")
            }
          >
            How to Rice KDE Plasma
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-164.html")
            }
          >
            Grub Issues (Boot to Bios)
          </Button>
        </div>
        <div className="row gap-4" style={{ marginTop: 25 }}>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-235.html")
            }
          >
            Amethyst AUR How To
          </Button>
          <Button
            variant="contained"
            style={{ height: 40, width: 300, backgroundColor: "#4a047c" }}
            onClick={() =>
              OpenFaqPage("https://forum.xerolinux.xyz/thread-90.html")
            }
          >
            vmlinuz-linux not found issues
          </Button>
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

export default Faq;
