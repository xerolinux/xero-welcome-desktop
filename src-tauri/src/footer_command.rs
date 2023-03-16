use std::process::Command;


////////////////////////////////////////////////////////
//      This is the new updated window function       //
//   Instead of opening a smaller secondary WebView,  //
//     it creates a new subprocess running Firefox    //
//       passing the URL to automatically load        //
////////////////////////////////////////////////////////

#[tauri::command]
pub async fn open_xero_main() {
    let _output = Command::new("firefox").arg("https://xerolinux.xyz").output().expect("[!] open_xero_main -> Command executed with failing error code");
}

#[tauri::command]
pub async fn open_xero_discord() {
    let _output = Command::new("firefox").arg("https://discord.gg/Xg6T78ahtK").output().expect("[!] open_xero_discord -> Command executed with failing error code");
}

#[tauri::command]
pub async fn open_xero_mastodon() {
    let _output = Command::new("firefox").arg("https://fosstodon.org/@TechXero").output().expect("[!] open_xero_mastodon -> Command executed with failing error code");
}

#[tauri::command]
pub async fn open_xero_youtube() {
    let _output = Command::new("firefox").arg("https://youtube.com/@XeroLinux").output().expect("[!] open_xero_youtube -> Command executed with failing error code");
}
#[tauri::command]
pub async fn open_xero_patreon() {
    let _output = Command::new("firefox").arg("https://www.patreon.com/XeroLinux/membership").output().expect("[!] open_xero_patreon -> Command executed with failing error code");
}
#[tauri::command]
pub async fn open_xero_fundrazr() {
    let _output = Command::new("firefox").arg("https://fnd.us/523mC5").output().expect("[!] open_xero_fundrazr -> Command executed with failing error code");
}
