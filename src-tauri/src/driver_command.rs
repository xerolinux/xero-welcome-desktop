///////////////////////////////////////////////////////////
//                                                       //
//   These are the primary helper functions for running  //
//     commands to execute functions tied to the         //
//        corresponding home screen button               //
//                                                       //
///////////////////////////////////////////////////////////

use std::process::Command;
use std::thread;

use crate::utils;
use crate::logger;

///////////////////////////////////
//      ASUS Helper Docs         //
///////////////////////////////////

#[tauri::command]
pub async fn open_optimus_tools() {
    let _output = Command::new("firefox").arg("https://asus-linux.org").output().expect("[!] open_optimus_tools -> Command executed with failing error code");
}

#[tauri::command]
pub async fn open_optimus_discord() {
    let _output = Command::new("firefox").arg("https://discord.com/invite/4ZKGd7Un5t").output().expect("[!] open_optimus_discord -> Command executed with failing error code");
}

//////////////////////////////////
//        Driver Related        //
//       Helper Functions       //
//////////////////////////////////

#[tauri::command]
pub async fn install_nvidia_drivers() {
    let handle = thread::spawn(|| {
        match utils::run_async("nVidia_drivers.sh", true) {
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
pub async fn install_radeon_drivers() {
    let handle = thread::spawn(|| {
        match utils::run_async("FOSS_drivers.sh", true) {
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
pub async fn switch_to_lightdm() {
    let handle = thread::spawn(|| {
        match utils::run_async("switch_to_lightdm.sh", true) {
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
pub async fn switch_to_sddm() {
    let handle = thread::spawn(|| {
        match utils::run_async("switch_to_sddm.sh", true) {
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
