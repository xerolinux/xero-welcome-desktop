//! Post-Install Utility Crate
//!
//! This module provides helper functions for running important
//! post install scripts. These allow new (and current) users to 
//! further tweak different aspects of their system.
//!
//! The scripts that are called from this crate alter functionality
//! of everything from a user's default terminal setup to quick firewall
//! implementation.

use std::process::Command;
use subprocess::Exec;
use std::thread;
use tokio::task;

use crate::logger;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

/// Executes post install scripts located in the `scripts` directory
async fn begin_post_script(name: String, root: bool) -> Result<()> {
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

/// Entry point of async post install
#[tokio::main]
pub async fn start_post_async(name: &str, root: bool) -> Result<()> {
    let script_thread = task::spawn(begin_post_script(name.to_owned(), root));

    let _result = script_thread.await??;

    Ok(())
}

/// UI triggered function call for post-install scripts
#[tauri::command]
pub async fn run_post_command(script: String) {
    let handle = thread::spawn(move || {
        match start_post_async(&script, false) {
            // If function returned OK...
            Ok(_) => {
                print!("\n\n");
                logger::debug("Post command finished successfully!");
            }
            // Otherwise...
            Err(_) => {
                print!("\n\n");
                logger::warn("Post function returned errors...");
            },
        }
    });

    
    handle.join().unwrap();
}

#[tauri::command]
fn fix_res() {
    Exec::shell(String::from("xrandr -s 1920x1080 && xrandr --dpi 96")).join().unwrap();
}