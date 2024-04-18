/// Logic for fetching book data from Google Books API
///
/// Volume search by ISBN:
/// - https://www.googleapis.com/books/v1/volumes?q=isbn:9781761186769
///
/// Response: isbn_wasm_mod/data-samples/google-books-volume.json
///
///
///
//
use super::BrowserRuntime;
use crate::utils::{execute_http_request, log};

use serde::{Deserialize, Serialize};

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct IndustryIdentifier {
    pub r#type: String,
    pub identifier: String,
}

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ImageLinks {
    pub small_thumbnail: String,
    pub thumbnail: String,
}

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ListPrice {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub amount: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub currency_code: Option<String>,
}

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SaleInfo {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub list_price: Option<ListPrice>,
}

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub(crate) struct VolumeInfo {
    pub title: String,
    pub authors: Vec<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    pub industry_identifiers: Vec<IndustryIdentifier>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub page_count: Option<i64>,
    pub categories: Vec<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image_links: Option<ImageLinks>,
}

/// Part of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Volume {
    pub id: String,
    pub self_link: String,
    pub volume_info: VolumeInfo,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sale_info: Option<SaleInfo>,
}

/// The root of GoogleBooks API response
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Volumes {
    pub kind: String,
    pub total_items: i64,
    pub items: Vec<Volume>,
}

/// Fetches book data from Google Books API
pub async fn get_book_data(isbn: &str, runtime: &BrowserRuntime) -> super::Result<Volumes> {
    log!("get_book_data for: {isbn}");

    let url = format!("https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}");

    execute_http_request::<Volumes, u8>(&url, None, runtime).await
}
