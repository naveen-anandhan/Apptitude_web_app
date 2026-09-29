function doPost(e) {
  try {

    // Get the spreadsheet
    const spreadsheet =
      SpreadsheetApp.getActiveSpreadsheet();

    // Get data from website
    const data =
      JSON.parse(e.postData.contents);

    // Get department
    let department =
      data.department;

    // Make sure department was provided
    if (!department) {
      throw new Error("Department is missing.");
    }

    // Handle MECH sub-categories (Creo / CATIA) -> map to MECH tab
    let specialization = data.specialization || "";
    if (department.startsWith("MECH")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ")[1];
      }
      department = "MECH";
    }

    // Look for existing department sheet tab
    let sheet =
      spreadsheet.getSheetByName(department);

    // If not found directly, check alternative names for UI/UX and PLC
    if (!sheet) {
      if (department.includes("UI/UX") || department.includes("Digital Marketing")) {
        sheet =
          spreadsheet.getSheetByName("UI/UX / Digital Marketing") ||
          spreadsheet.getSheetByName("UI/UX");
      } else if (department.includes("PLC") || department.includes("Automation")) {
        sheet =
          spreadsheet.getSheetByName("PLC / Automation") ||
          spreadsheet.getSheetByName("PLC");
      }
    }

    // If sheet still does not exist, create it automatically
    if (!sheet) {
      // Clean department name to ensure valid Google Sheet tab name
      const safeTabName = department.replace(/[:\\?*\[\]]/g, "-").substring(0, 100).trim();
      sheet =
        spreadsheet.insertSheet(safeTabName);
    }

    // Add headings if sheet is empty
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
    }

    // Add student result
    sheet.appendRow([
      new Date(),
      data.studentName,
      data.phoneNumber,
      specialization || "-",
      data.email,
      data.score,
      data.pass
    ]);

    // Send success response
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        status: "active",
        message: "Webhook is running."
      })
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}
