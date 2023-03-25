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


type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

pub enum PacmanHelper {
    Pak,
    Yay,
    Paru,
    Pacman,
}

pub fn get_installer_command() -> PacmanHelper {
    if Path::new("/sbin/pak").exists() {
        return PacmanHelper::Pak;
    } else if Path::new("/sbin/yay").exists() {
        return PacmanHelper::Yay;
    } else if Path::new("/sbin/paru").exists() {
        return PacmanHelper::Paru;
    }

    PacmanHelper::Pacman
}

#[tauri::command]
pub async fn enable_hblock() {
    let handle = thread::spawn(|| {
        match run_hblock_async() {
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

#[tokio::main]
pub async fn run_hblock_async() -> Result<()> {
    let task_thread = task::spawn(run_hblock_command());

    let _result = task_thread.await??;

    Ok(())
}

async fn run_hblock_command() -> Result<()> {
    let (command, root) = match get_installer_command() {
        PacmanHelper::Yay => ("yay -S hblock; sudo hblock", false),
        PacmanHelper::Paru => ("paru --removemake -S hblock; sudo hblock", false),
        _ => ("pacman -S hblock; hblock", true),
    };
    //let _ = utils::run_cmd_terminal(String::from(cmd), escalate);
    if root {
        let _output = Command::new("konsole")
            .arg("-e")
            .arg("sudo")
            .arg("bash")
            .arg("-c")
            .arg(&command)
            .output()
            .expect("[!] Failed to execute process...");
    } else {
        let _output = Command::new("konsole")
            .arg("-e")
            .arg("bash")
            .arg("-c")
            .arg(&command)
            .output()
            .expect("[!] Failed to execute process...");
    }

    Ok(())
}

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
    let script_thread = task::spawn(start_other_install(
        command.to_owned(),
        args.to_owned(),
        packages.to_owned(),
    ));

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

//////////////////////////
//                      //
//  Root Script Runner  //
//                      //
//////////////////////////

async fn start_script_refresh(args: String) -> Result<()> {
    let file = String::from("./src/scripts/refresh_keys.sh");

    let _output = Command::new("konsole")
        .arg("-e")
        .arg("sudo")
        .arg("bash")
        .arg(&file)
        .arg(&args)
        .output()
        .expect("[!] Failed to execute process...");

    Ok(())
}

#[tokio::main]
pub async fn run_refresh(args: String) -> Result<()> {
    let script_thread = task::spawn(start_script_refresh(args.to_owned()));

    let _result = script_thread.await??;

    Ok(())
}
