#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![feature(string_remove_matches)]

mod welcome_command;
mod footer_command;
mod driver_command;
mod post_command;
mod faq_command;
mod utils;
mod logger;


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            footer_command::open_xero_main,
            footer_command::open_xero_discord,
            footer_command::open_xero_mastodon,
            footer_command::open_xero_youtube,
            footer_command::open_xero_kofi,
            footer_command::open_xero_liberapay,
            footer_command::open_xero_fundrazr,
            welcome_command::check_live_env,
            welcome_command::start_installer,
            welcome_command::open_xero_github,
            welcome_command::open_xero_forum,
            welcome_command::run_system_update,
            welcome_command::fix_gpg_keys,
            welcome_command::update_mirrors,
            welcome_command::fix_res_vmware,
            welcome_command::set_autostart,
            driver_command::open_optimus_discord,
            driver_command::open_optimus_tools,
            driver_command::switch_to_lightdm,
            driver_command::switch_to_sddm,
            driver_command::install_nvidia_drivers,
            driver_command::install_radeon_drivers,
            post_command::apply_defaults,
            post_command::switch_zsh,
            post_command::xero_iso_builder,
            post_command::init_snapper,
            post_command::enable_wayland,
            post_command::enable_firewall,
            post_command::fix_res,
            post_command::refresh_keys,
            faq_command::open_faq_page,
            utils::open_creator_page,
            utils::enable_hblock,
            utils::install_apps
        ])
        .run(tauri::generate_context!())
        .expect("[!] Error while running application...");
}
