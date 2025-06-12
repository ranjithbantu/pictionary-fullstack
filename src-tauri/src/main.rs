#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{State, WebviewWindowBuilder};
use tauri::utils::config::WebviewUrl;
use std::sync::Mutex;

#[derive(Default)]
struct GameState(Mutex<String>);

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let url = WebviewUrl::App("index.html".into());
            WebviewWindowBuilder::new(app, "main", url)
                .title("Pictionary")
                .inner_size(1024.0, 768.0)
                .build()?;
            Ok(())
        })
        .manage(GameState::default())
        .invoke_handler(tauri::generate_handler![get_word, set_word])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_word(state: State<GameState>) -> String {
    state.0.lock().unwrap().clone()
}

#[tauri::command]
fn set_word(state: State<GameState>, new_word: String) {
    *state.0.lock().unwrap() = new_word;
} 