/**
 * London Community Fest 2026 — Vendor application handler
 *
 * Paste into Google Apps Script bound to your vendor sheet.
 * Deploy: Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 *
 * Sheet columns (row 1 headers recommended):
 * Timestamp | Business | Contact | Email | Phone | Stall type | Description | Halal certified
 */
function doPost(e) {
  try {
    var sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Vendor applications") ||
      SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    var business = data.business_name || data.businessName || "";
    var contact = data.contact_name || data.contactName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var stallType = data.stall_type_label || data.stall_type || data.stallType || "";
    var description = data.description || "";
    var halal =
      data.halal_certified_label ||
      (data.halal_certified === true || data.halal_certified === "true" ? "Yes" : "No");

    sheet.appendRow([
      new Date(),
      business,
      contact,
      email,
      phone,
      stallType,
      description,
      halal,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Vendor application submitted successfully",
        business_name: business,
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
