#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use sha2::{Sha512, Digest};

#[tauri::command]
fn hash_with_sha512(raw_input: String) -> String {
    let mut hasher = Sha512::new();
    hasher.update(raw_input);
    return format!("{:x}", hasher.finalize());
}

use cli_clipboard::{ClipboardContext, ClipboardProvider};

#[tauri::command]
fn copy_to_clipboard(raw_input: String) {
    let mut ctx = ClipboardContext::new().unwrap();
    ctx.set_contents(raw_input.to_owned()).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![hash_with_sha512, copy_to_clipboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
