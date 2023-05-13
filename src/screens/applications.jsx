import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import AppsHeader from "../components/AppsHeader";
import ApplicationTabs from "../components/TabsPanel";

import youtubeLogo from "../assets/youtube.svg";
import mastodonLogo from "../assets/mastodon.svg";
import discordLogo from "../assets/discord.svg";

function Applications() {
  async function RunBackendCommand(window_label) {
    await invoke(window_label);
  }

  return (
    <div>
      <AppsHeader />
      <div>
        {/* ADD TAB DECLARATION HERE */}
        <div style={{ marginTop: 5, padding: 10 }}>
          <ApplicationTabs />
        </div>
      </div>
    </div>
  );
}

export default Applications;
