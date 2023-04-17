///////////////////////////////////////////////////////////
//                                                       //
//   These are the primary helper functions for running  //
//     commands to execute functions tied to the         //
//        corresponding home screen button               //
//                                                       //
///////////////////////////////////////////////////////////

use std::path::Path;
use std::process::Command;
use subprocess::Exec;
use std::thread;
use std::{fs, str};

use crate::logger;
use crate::utils;

extern crate dirs;



///////////////////////////////////
//      Live ISO Installer       //
///////////////////////////////////

#[tauri::command]
pub fn start_installer() {
    let cmd = String::from("sudo -E calamares -D6");

    thread::spawn(move || {
        Exec::shell(cmd).join().unwrap();
    });
}

#[tauri::command]
pub fn check_live_env() -> bool {
    let live_path = Path::new("/run/archiso/airootfs");
    let installer_path = Path::new("/usr/bin/calamares");

    if (live_path.exists()) && (installer_path.exists()){
        true
    } else {
        false
    }
}


///////////////////////////////////
//      Documentation Helper     //
//           Functions           //
///////////////////////////////////

#[tauri::command]
pub async fn open_xero_github() {
    let _output = Command::new("firefox")
        .arg("https://github.com/xerolinux/xero-welcome")
        .output()
        .expect("[!] open_xero_github -> Command executed with failing error code");
}
#[tauri::command]
pub async fn open_xero_forum() {
    let _output = Command::new("firefox")
        .arg("https://forum.xerolinux.xyz")
        .output()
        .expect("[!] open_xero_forum -> Command executed with failing error code");
}

//////////////////////////////////
//        System Related        //
//       Helper Functions       //
//////////////////////////////////

#[tauri::command]
pub async fn run_system_update() {
    let handle = thread::spawn(|| {
        match utils::run_async(
            "/usr/share/xerowelcome-desktop/scripts/update_system.sh",
            true,
        ) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            }
        }
    });

    handle.join().unwrap();
}

#[tauri::command]
pub async fn fix_gpg_keys() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/fix_keys.sh", true) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            }
        }
    });

    handle.join().unwrap();
}

#[tauri::command]
pub async fn update_mirrors() {
    let handle = thread::spawn(|| {
        match utils::run_async(
            "/usr/share/xerowelcome-desktop/scripts/rank_mirrors.sh",
            true,
        ) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Async function returned errors...");
            }
        }
    });

    handle.join().unwrap();
}

#[tauri::command]
pub async fn fix_res_vmware() {
    let _ = utils::run_vmware();
}

#[tauri::command]
pub fn set_autostart(autostart: bool) -> Result<(), String> {
    let desktop_file = Path::new("/usr/share/applications/xerowelcome-desktop.desktop");

    let mut xero_autostart = dirs::config_dir().unwrap();
    xero_autostart.push("autostart");
    xero_autostart.push("xerowelcome-desktop.desktop");

    let xero_autostart_str: &str = match xero_autostart.to_str() {
        None => panic!("autostart path is not a valid UTF-8 sequence"),
        Some(s) => s,
    };

    if autostart && !xero_autostart.exists() {
        logger::debug("[+] Autostart file does not exist, copying...");
        let success = match fs::copy(&desktop_file, &xero_autostart_str) {
            Ok(_) => true,
            Err(_) => false,
        };

        if !success {
            return Err(("Error creating auto-start config").into());
        };
    };

    if !autostart && xero_autostart.exists() {
        logger::debug("[+] Removing autostart file...");
        let success = match fs::remove_file(&xero_autostart) {
            Ok(_) => true,
            Err(_) => false,
        };

        if !success {
            return Err(("Error creating auto-start config").into());
        };
    };

    Ok(())
}
