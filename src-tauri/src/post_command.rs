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
        match utils::run_async("apply_defaults.sh", true) {
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
        match utils::run_async("switch_to_zsh.sh", true) {
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
pub async fn oh_my_bash() {
    let handle = thread::spawn(|| {
        match utils::run_async("oh_my_bash.sh", true) {
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
        match utils::run_async("init_snapper.sh", true) {
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
        match utils::run_async("enable_wayland.sh", true) {
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
        match utils::run_async("firewalled.sh", true) {
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

/*
fn on_hblock_btn_clicked(_: &gtk::Button) {
    let (cmd, escalate) = match utils::get_pacman_wrapper() {
        PacmanWrapper::Yay => ("bash -c \"yay -S hblock; sudo hblock\"", false),
        PacmanWrapper::Paru => ("bash -c \"paru --removemake -S hblock; sudo hblock\"", false),
        _ => ("bash -c \"pacman -S hblock; hblock\"", true),
    };
    let _ = utils::run_cmd_terminal(String::from(cmd), escalate);
}
*/