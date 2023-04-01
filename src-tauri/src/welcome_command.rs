///////////////////////////////////////////////////////////
//                                                       //
//   These are the primary helper functions for running  //
//     commands to execute functions tied to the         //
//        corresponding home screen button               //
//                                                       //
///////////////////////////////////////////////////////////

use std::process::Command;
use std::path::Path;
use std::{fs, str};
use std::thread;

use crate::utils;
use crate::logger;


///////////////////////////////////
//      Documentation Helper     //
//           Functions           //
///////////////////////////////////

#[tauri::command]
pub async fn open_xero_github() {
    let _output = Command::new("firefox").arg("https://github.com/xerolinux/xero-welcome").output().expect("[!] open_xero_github -> Command executed with failing error code");
}
#[tauri::command]
pub async fn open_xero_forum() {
    let _output = Command::new("firefox").arg("https://forum.xerolinux.xyz").output().expect("[!] open_xero_forum -> Command executed with failing error code");
}

//////////////////////////////////
//        System Related        //
//       Helper Functions       //
//////////////////////////////////

#[tauri::command]
pub async fn run_system_update() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/update_system.sh", true) {
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
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
pub async fn update_mirrors() {
    let handle = thread::spawn(|| {
        match utils::run_async("/usr/share/xerowelcome-desktop/scripts/rank_mirrors.sh", true) {
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
pub fn set_autostart(autostart: bool) -> Result<(), String> {
    let autostart_path: String = String::from("$HOME/.config/autostart/xerowelcome-desktop.desktop");
    let desktop_path: String = String::from("/usr/share/applications/xerowelcome-desktop.desktop");

    let config_dir = Path::new(&autostart_path).parent().unwrap();

    if !config_dir.exists() {
        let success = match fs::create_dir_all(config_dir) {
            Err(_) => false,
            Ok(_) => true 
        };

        if !success {
            return Err(("Error creating auto-start config").into())
        };
    }

    if autostart && !check_file(&autostart_path) {
        let success = match std::os::unix::fs::symlink(desktop_path, autostart_path) {
            Err(_) => false,
            Ok(_) => true 
        };

        if !success {
            return Err(("ERROR: Failed to create symlink").into())
        }

    } 
    
    if !autostart && check_file("$HOME/.config/autostart/xerowelcome-desktop.desktop") {
        let success = match std::fs::remove_file("$HOME/.config/autostart/xerowelcome-desktop.desktop"){
            Err(_) => false,
            Ok(_) => true 
        };

        if !success {
            return Err(("ERROR: Failed to remove auto-start").into())
        };
    };

    Ok(())

}


fn check_file(path: &str) -> bool {
    let metadata = fs::metadata(path);
    if let Ok(meta) = metadata {
        meta.file_type().is_file()
    } else {
        false
    }
}