/**
 * London Community Fest 2026 — Sponsor enquiry handler
 *
 * Paste into Google Apps Script (Extensions → Apps Script) bound to your sheet.
 * Deploy: Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 *
 * Sheet columns (row 1 headers recommended):
 * Timestamp | Company | Contact | Email | Phone | Business type | Package | Preferred contact | Message | Consent
 */
function doPost(e) {
  try {
    var sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sponsor enquiries") ||
      SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    var company = data.company_name || data.companyName || "";
    var contact = data.contact_name || data.contactName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var businessType =
      data.business_type_label || data.business_type || data.businessType || "";
    var tier =
      data.tier_interest_label || data.tier_interest || data.tierInterest || "";
    var preferredContact =
      data.preferred_contact_label ||
      data.preferred_contact ||
      data.preferredContact ||
      "";
    var message = data.message || "";
    var consent =
      data.consent_given ||
      (data.consent === true || data.consent === "true" ? "Yes" : "No");

    sheet.appendRow([
      new Date(),
      company,
      contact,
      email,
      phone,
      businessType,
      tier,
      preferredContact,
      message,
      consent,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Sponsor enquiry submitted successfully",
        company_name: company,
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
