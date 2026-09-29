/**
 * Google Apps Script - Result Handler for Aptitude Test
 *
 * Automatically finds or creates department sheet tabs:
 * - If department tab exists (e.g., Java Full Stack, MECH, General), records result there.
 * - If department tab is NOT present (e.g., UI/UX / Digital Marketing, PLC / Automation),
 *   automatically creates the tab, adds standard headings, and appends the student's result.
 *
 * Deploy instructions:
 * 1. Open Google Sheet: Extensions -> Apps Script
 * 2. Paste this entire code into Code.gs
 * 3. Click Deploy -> Manage deployments
 * 4. Click Edit (pencil icon) -> New version -> Click Deploy
 */

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Parse incoming JSON payload from test submission
    const data = JSON.parse(e.postData.contents);

    let department = (data.department || "General").trim();
    let specialization = (data.specialization || "").trim();

    // Handle MECH sub-categories (Creo / CATIA) -> map to MECH tab
    if (department.startsWith("MECH")) {
      if (department.includes(" - ")) {
        specialization = specialization || department.split(" - ")[1].trim();
      }
      department = "MECH";
    }

    // Look for existing tab matching the department
    let sheet = spreadsheet.getSheetByName(department);

    // If not found directly, check common name variations before creating
    if (!sheet) {
      if (department.includes("UI/UX") || department.includes("Digital Marketing")) {
        sheet = spreadsheet.getSheetByName("UI/UX / Digital Marketing") ||
                spreadsheet.getSheetByName("UI/UX") ||
                spreadsheet.getSheetByName("Digital Marketing");
      } else if (department.includes("PLC") || department.includes("Automation")) {
        sheet = spreadsheet.getSheetByName("PLC / Automation") ||
                spreadsheet.getSheetByName("PLC");
      }
    }

    // If tab STILL does not exist, create it automatically!
    if (!sheet) {
      // Clean tab name to ensure Google Sheet compatibility
      const safeTabName = department.replace(/[:\\?*\[\]]/g, "-").substring(0, 100).trim();
      sheet = spreadsheet.insertSheet(safeTabName);
    }

    // Add standard headings if this is a newly created or empty tab
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Student Name",
        "Mobile Number",
        "Specialization",
        "Email",
        "Score",
        "Pass"
      ]);

      // Format header row (bold & freeze header)
      try {
        const headerRange = sheet.getRange(1, 1, 1, 7);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#f1f5f9");
        sheet.setFrozenRows(1);
      } catch (styleErr) {
        // Continue even if styling fails
      }
    }

    // Append the student's assessment result
    sheet.appendRow([
      new Date(),
      data.studentName || "-",
      data.phoneNumber || "-",
      specialization || "-",
      data.email || "-",
      data.score || "-",
      data.pass || "-"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, department: sheet.getName() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "PUMO Aptitude Assessment Google Sheet Webhook is active and running."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
