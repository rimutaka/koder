use wasm_bindgen::prelude::*;

use web_sys::{Window, WorkerGlobalScope};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Makes JS `console.log` available in Rust
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

/// A demo function to test if WASM is callable from background.js
#[wasm_bindgen]
pub fn hello_wasm() {
    log("Hello from WASM!");
}

/// This is a proxy for report_progress() in progress.js
/// to send messages to other js scripts.
#[wasm_bindgen(module = "/src/progress.js")]
extern "C" {
    pub fn report_progress(msg: &str);
}

/// All error handling in this crate is based on either retrying a request after some time
/// or exiting gracefully.
#[derive(Debug, Clone, PartialEq)]
pub enum RetryAfter {
    Seconds(i64),
    Never,
}

/// The result type that should be used in place of std::Result
/// throughout the app
pub type Result<T> = std::result::Result<T, RetryAfter>;

#[allow(dead_code)]
pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Logs output into browser console. It is not the same console as for the web page because the extension runs separately.
/// Look for the service worker console.
macro_rules!  log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into())
    }
}
