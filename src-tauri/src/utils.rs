//! Application Utility Crate
//!
//! This module provides helper functions for running setup scripts,
//! triggered by user interface selections, in an efficient and async
//! manner.
//!
//! It also provides a function for the UI to retrieve package description
//! info for the various apps listed in the application installer section of
//! the welcome app.

use std::path::Path;
use std::process::Command;
use std::thread;
use tokio::task;

use crate::logger;

enum PacmanHelper {
    Pak,
    Yay,
    Paru,
    Pacman,
}

fn get_installer_command() -> PacmanHelper {
    if Path::new("/sbin/pak").exists() {
        return PacmanHelper::Pak;
    } else if Path::new("/sbin/yay").exists() {
        return PacmanHelper::Yay;
    } else if Path::new("/sbin/paru").exists() {
        return PacmanHelper::Paru;
    }

    PacmanHelper::Pacman
}

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

/// Executes various helper scripts located in the `scripts` directory
async fn start_script(name: String, root: bool) -> Result<()> {
    let file = format!("./src/scripts/{}", name);
    if root {
        let _output = Command::new("konsole")
            .arg("-e")
            .arg("sudo")
            .arg("bash")
            .arg(&file)
            .output()
            .expect("[!] Failed to execute process...");
    } else {
        let _output = Command::new("konsole")
            .arg("-e")
            .arg("bash")
            .arg(&file)
            .output()
            .expect("[!] Failed to execute process...");
    }

    Ok(())
}

/// Primary entry point of async script functionality
#[tokio::main]
pub async fn run_async(name: &str, root: bool) -> Result<()> {
    let script_thread = task::spawn(start_script(name.to_owned(), root));

    let _result = script_thread.await??;

    Ok(())
}


/// Utility function to open creator web pages using provided `url`
#[tauri::command]
pub async fn open_creator_page(uri: String) {
    let _output = Command::new("firefox")
        .arg(&uri)
        .output()
        .expect("[!] open_creator_page -> Command executed with failing error code");
}

/// Primary installer command used by frontend
#[tauri::command]
pub async fn install_apps(apps: Vec<String>, app_type: String) {
    if app_type == "native" {
        install_apps_native(apps);
    } else {
        install_apps_flatpak(apps);
    }
}


///////////////////////////////
////                       ////
////    Native Installer   ////
////                       ////
///////////////////////////////

#[tokio::main]
async fn install_pacman_async(packages: String) -> Result<()> {
    let script_thread = task::spawn(start_pacman_install(packages.to_owned()));

    let _result = script_thread.await??;

    Ok(())
}

async fn start_pacman_install(packages: String) -> Result<()> {
    let _output = Command::new("konsole")
        .arg("-e")
        .arg("sudo")
        .arg("bash")
        .arg("./src/scripts/install_apps_pacman.sh")
        .arg(&packages)
        .output()
        .expect("[!] Failed to execute process...");

    Ok(())
}


#[tokio::main]
async fn install_other_async(command: &str, args: &str, packages: String) -> Result<()> {
    let script_thread = task::spawn(start_other_install(command.to_owned(), args.to_owned(), packages.to_owned()));

    let _result = script_thread.await??;

    Ok(())
}

async fn start_other_install(command: String, args: String, packages: String) -> Result<()> {
    let _output = Command::new("konsole")
        .arg("-e")
        .arg("bash")
        .arg("./src/scripts/install_apps_other.sh")
        .arg(&command)
        .arg(&args)
        .arg(&packages)
        .output()
        .expect("[!] Failed to execute process...");

    Ok(())
}


fn install_apps_native(apps: Vec<String>) {

    let (command, arg) = match get_installer_command() {
        PacmanHelper::Pak => ("pak", "-Sy"),
        PacmanHelper::Yay => ("yay", "-Sy"),
        PacmanHelper::Paru => ("paru", "-Sy"),
        _ => ("pacman", "-Sy"),
    };

    let packages = apps.iter().map(|s| s.to_string() + " ").collect::<String>();


    if command == "pacman" {
        //println!("Installer App Used -> {} {}", &command, &arg);
        let handle = thread::spawn(|| {
            match install_pacman_async(packages) {
                // If function returned OK...
                Ok(_) => {
                    logger::debug("[+] Process finished successfully!");
                }
                // Otherwise...
                Err(_) => {
                    logger::warn("[!] Async function returned errors...");
                }
            }
        });

        handle.join().unwrap();
    } else {
        //println!("Installer App Used -> {} {}", &command, &arg);
        let handle = thread::spawn(|| {
            match install_other_async(command, arg, packages) {
                // If function returned OK...
                Ok(_) => {
                    logger::debug("[+] Process finished successfully!");
                }
                // Otherwise...
                Err(_) => {
                    logger::warn("[!] Async function returned errors...");
                }
            }
        });

        handle.join().unwrap();
    }
}


///////////////////////////////
////                       ////
////   Flatpak Installer   ////
////                       ////
///////////////////////////////

#[tokio::main]
async fn install_flatpak_async(packages: String) -> Result<()> {
    let script_thread = task::spawn(start_flatpak_install(packages.to_owned()));

    let _result = script_thread.await??;

    Ok(())
}

async fn start_flatpak_install(packages: String) -> Result<()> {
    let _output = Command::new("konsole")
        .arg("-e")
        .arg("bash")
        .arg("./src/scripts/install_apps_flatpak.sh")
        .arg(&packages)
        .output()
        .expect("[!] Failed to execute process...");

    Ok(())
}

fn install_apps_flatpak(apps: Vec<String>) {

    let packages = apps.iter().map(|s| s.to_string() + " ").collect::<String>();

    let handle = thread::spawn(|| {
        match install_flatpak_async(packages) {
            // If function returned OK...
            Ok(_) => {
                logger::debug("[+] Process finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                logger::warn("[!] Async function returned errors...");
            }
        }
    });

    handle.join().unwrap();
}