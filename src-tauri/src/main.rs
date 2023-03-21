#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod welcome_command;
mod footer_command;
mod driver_command;
mod post_command;
mod faq_command;
mod utils;
mod logger;

///////////////////////////////////////////////////
//   This was the original WebView function      //
//   that opened a secondary window to display   //
//   information related to the clicked icon     //
///////////////////////////////////////////////////

// #[tauri::command]
// async fn open_xero_main(handle: tauri::AppHandle) {
//   let _docs_window = tauri::WindowBuilder::new(
//     &handle,
//     "info", /* the unique window label */
//     tauri::WindowUrl::External("https://xerolinux.xyz".parse().unwrap())
//   ).title("XeroLinux Home").inner_size(1080.0, 760.0).build().unwrap();
// }


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            footer_command::open_xero_main,
            footer_command::open_xero_discord,
            footer_command::open_xero_mastodon,
            footer_command::open_xero_youtube,
            footer_command::open_xero_patreon,
            footer_command::open_xero_fundrazr,
            welcome_command::open_xero_github,
            welcome_command::open_xero_forum,
            welcome_command::run_system_update,
            welcome_command::fix_gpg_keys,
            welcome_command::update_mirrors,
            welcome_command::set_autostart,
            driver_command::open_optimus_discord,
            driver_command::open_optimus_tools,
            driver_command::switch_to_lightdm,
            driver_command::switch_to_sddm,
            driver_command::install_nvidia_drivers,
            driver_command::install_radeon_drivers,
            post_command::run_post_command,
            post_command::fix_res,
            faq_command::open_faq_page,
            utils::open_creator_page,
            utils::install_apps
        ])
        .run(tauri::generate_context!())
        .expect("[!] Error while running application...");
}
