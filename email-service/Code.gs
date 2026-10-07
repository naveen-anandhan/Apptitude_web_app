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

    // Handle sub-categories (MECH, SAP, Python Full Stack, Java Full Stack) -> map to base tab
    let specialization = data.specialization || "";
    if (department.startsWith("MECH")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ")[1];
      }
      department = "MECH";
    } else if (department.startsWith("SAP")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ").slice(1).join(" - ");
      }
      department = "SAP";
    } else if (department.startsWith("Python Full Stack")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ").slice(1).join(" - ");
      }
      department = "Python Full Stack";
    } else if (department.startsWith("Java Full Stack")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ").slice(1).join(" - ");
      }
      department = "Java Full Stack";
    }

    // Look for existing department sheet tab
    let sheet =
      spreadsheet.getSheetByName(department);

    // If not found directly, check alternative names for UI/UX, PLC, and HTML/CSS/JS
    if (!sheet) {
      if (department.includes("UI/UX") || department.includes("Digital Marketing")) {
        sheet =
          spreadsheet.getSheetByName("UI/UX / Digital Marketing") ||
          spreadsheet.getSheetByName("UI/UX");
      } else if (department.includes("PLC") || department.includes("Automation")) {
        sheet =
          spreadsheet.getSheetByName("PLC / Automation") ||
          spreadsheet.getSheetByName("PLC");
      } else if (department.includes("HTML") || department.includes("JavaScript")) {
        sheet =
          spreadsheet.getSheetByName("HTML - CSS - JavaScript") ||
          spreadsheet.getSheetByName("HTML / CSS / JavaScript");
      }
    }

    // If sheet still does not exist, create it automatically
    if (!sheet) {
      // Clean department name to ensure valid Google Sheet tab name (forbids : \ ? * [ ] /)
      const safeTabName = department.replace(/[:\\?*\[\]\/]/g, "-").substring(0, 100).trim();
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
        "Pass",
        "Tab Switches"
      ]);
    } else {
      // If existing tab doesn't have Column 8 header, automatically add "Tab Switches"
      const col8Header = sheet.getRange(1, 8).getValue();
      if (!col8Header) {
        sheet.getRange(1, 8).setValue("Tab Switches");
        sheet.getRange(1, 8).setFontWeight("bold");
      }
    }

    // Tab switch count from website (anti-cheat detection)
    const tabSwitches = (data.tabSwitches !== undefined && data.tabSwitches !== null)
      ? Number(data.tabSwitches)
      : 0;

    // Add student result
    sheet.appendRow([
      new Date(),
      data.studentName,
      data.phoneNumber,
      specialization || "-",
      data.email,
      data.score,
      data.pass,
      tabSwitches
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

// Utility: Call this from Apps Script editor once if you want to add "Tab Switches" header to all existing tabs immediately
function addTabSwitchesHeaderToAllSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  sheets.forEach(function(sheet) {
    if (sheet.getLastRow() > 0) {
      const header = sheet.getRange(1, 8).getValue();
      if (!header) {
        sheet.getRange(1, 8).setValue("Tab Switches");
        sheet.getRange(1, 8).setFontWeight("bold");
      }
    }
  });
}
