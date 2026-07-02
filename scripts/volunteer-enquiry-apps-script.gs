/**
 * London Community Fest 2026 — Volunteer signup handler
 *
 * OPTION A (recommended): Open YOUR existing Google Sheet → Extensions → Apps Script,
 * paste this file, save, Deploy → New deployment → Web app → Anyone.
 * Writes to the tab you opened the script from (or "Volunteer signups" if that tab exists).
 *
 * OPTION B (standalone): Script properties → SPREADSHEET_ID = your sheet ID.
 * Optional: SHEET_NAME = exact tab name (e.g. "Volunteer signups").
 *
 * Expected columns (row 1):
 * Timestamp | Full Name | Email Address | Mobile Number |
 * Additional Information | Consent | Status | Notes
 *
 * This script does NOT create new tabs or spreadsheets.
 */

function getVolunteerSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    var id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    if (!id) {
      throw new Error(
        "No spreadsheet linked. Open Extensions → Apps Script from your sheet, " +
          "or set SPREADSHEET_ID in Script properties.",
      );
    }
    ss = SpreadsheetApp.openById(id);
  }

  var sheetName = PropertiesService.getScriptProperties().getProperty("SHEET_NAME");
  var sheet = sheetName ? ss.getSheetByName(sheetName) : ss.getSheetByName("Volunteer signups");

  if (!sheet) {
    sheet = ss.getActiveSheet();
  }

  if (!sheet) {
    throw new Error("Could not find a sheet tab to write volunteer signups to.");
  }

  return sheet;
}

function doPost(e) {
  try {
    var sheet = getVolunteerSheet();
    var raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    var name = data.contact_name || data.contactName || data.fullName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var message = data.message || "";
    var consent = data.consent === true || data.consent === "true";

    if (!name || !email || !phone) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Please provide your name, email, and mobile number.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      phone,
      message,
      consent ? "Yes" : "No",
      "New",
      "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Volunteer signup submitted successfully",
        contact_name: name,
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
