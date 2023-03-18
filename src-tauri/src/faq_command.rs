//! FAQ Screen Helper Function(s)
//!
//! Meant to provide any helper functions required
//! by FAQ screen interactions

use std::process::Command;

/// Convenience function to open a provided help page
#[tauri::command]
pub async fn open_faq_page(url: String) {
    let _output = Command::new("firefox").arg(format!("{}", &url)).output().expect("[!] open_faq_page -> Command executed with failing error code");
}