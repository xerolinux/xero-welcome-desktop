//! Post-Install Utility Crate
//!
//! This module provides helper functions for running important
//! post install scripts. These allow new (and current) users to 
//! further tweak different aspects of their system.
//!
//! The scripts that are called from this crate alter functionality
//! of everything from a user's default terminal setup to quick firewall
//! implementation.

use subprocess::Exec;
use std::thread;

use crate::logger;
use crate::utils;

#[tauri::command]
pub fn fix_res() {
    Exec::shell(String::from("xrandr -s 1920x1080 && xrandr --dpi 96")).join().unwrap();
}

#[tauri::command]
pub async fn apply_defaults() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/apply_defaults.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn switch_zsh() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/switch_to_zsh.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn xero_iso_builder() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/iso_builder.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn init_snapper() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/init_snapper.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn enable_wayland() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/enable_wayland.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn enable_firewall() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/firewalled.sh", false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn refresh_keys() {
    let pacman = pacmanconf::Config::with_opts(None, Some("/etc/pacman.conf"), Some("/")).unwrap();
    let alpm = alpm_utils::alpm_with_conf(&pacman).unwrap();
    // pacman -Qq | grep keyring
    let nl = alpm
        .localdb()
        .search([".*-keyring"].iter())
        .unwrap()
        .into_iter()
        .filter(|pkg| pkg.name() != "gnome-keyring")
        .map(|pkg| {
            let mut pkgname = String::from(pkg.name());
            pkgname.remove_matches("-keyring");
            format!("{} ", pkgname)
        })
        .collect::<String>();

    let _ = utils::run_refresh(nl);
}