/**
 * London Community Fest 2026 — Waitlist handler
 *
 * OPTION A (recommended): Open your Google Sheet → Extensions → Apps Script,
 * paste this file, save, Deploy → New deployment → Web app → Anyone.
 *
 * OPTION B (standalone script project): Project Settings → Script properties →
 * add SPREADSHEET_ID = the ID from your sheet URL
 * (https://docs.google.com/spreadsheets/d/THIS_PART/edit)
 *
 * Sheet tab: "Waitlist" (or first tab). Row 1: Timestamp | Email | Event
 */

function getWaitlistSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    var id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    if (!id) {
      throw new Error(
        "No spreadsheet linked. Use Extensions → Apps Script from your sheet, " +
          "or set SPREADSHEET_ID in Script properties.",
      );
    }
    ss = SpreadsheetApp.openById(id);
  }

  return ss.getSheetByName("Waitlist") || ss.getSheets()[0];
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function emailExists(sheet, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  var emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  var target = normalizeEmail(email);

  for (var i = 0; i < emails.length; i++) {
    if (normalizeEmail(emails[i][0]) === target) {
      return true;
    }
  }

  return false;
}

function doPost(e) {
  try {
    var sheet = getWaitlistSheet();
    var raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    var email = normalizeEmail(data.email);
    var eventSlug = data.event_slug || "london-community-fest-2026";

    if (!email) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Please enter a valid email address.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (emailExists(sheet, email)) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "This email is already on the waitlist.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([new Date(), email, eventSlug]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "You are on the waitlist. We will notify you when registration opens.",
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
