#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// P0: proves Rust <-> frontend IPC. Vault FS access lands with tauri-plugin-fs (P-tauri-fs).
#[tauri::command]
fn vault_default_path() -> String {
    "C:\\Users\\rongj\\Desktop\\学习".to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![vault_default_path])
        .run(tauri::generate_context!())
        .expect("error while running EF-Lernvault");
}
