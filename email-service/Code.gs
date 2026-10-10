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

    // Handle sub-categories (MECH, DA/DS/BA, SAP, Python Full Stack, Java Full Stack) -> map to base tab
    let specialization = data.specialization || "";
    if (department.startsWith("MECH")) {
      if (department.includes(" - ")) {
        specialization = department.split(" - ")[1];
      }
      department = "MECH";
    } else if (
      department.startsWith("DA/DS/BA") ||
      department.startsWith("DS/DA/BA") ||
      department.includes("DA/DS/BA") ||
      department.includes("DS/DA/BA")
    ) {
      if (!specialization && department.includes(" - ")) {
        specialization = department.split(" - ").slice(1).join(" - ").trim();
      }
      department = "DA/DS/BA";
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

    // If not found directly, check alternative names for UI/UX, PLC, HTML/CSS/JS, and DA/DS/BA
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
      } else if (
        department === "DA/DS/BA" ||
        department === "DS/DA/BA" ||
        department.includes("DA") ||
        department.includes("DS")
      ) {
        sheet =
          spreadsheet.getSheetByName("DA/DS/BA") ||
          spreadsheet.getSheetByName("DS/DA/BA") ||
          spreadsheet.getSheetByName("DA-DS-BA") ||
          spreadsheet.getSheetByName("DA / DS / BA");
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

// Utility: Call this from Apps Script editor once to merge separate DA/DS/BA tabs (like "DA/DS/BA - Python", "DA/DS/BA - MySQL", "DA/DS/BA - Pandas") into the single "DA/DS/BA" tab
function mergeDaDsBaTabs() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let mainSheet =
    spreadsheet.getSheetByName("DA/DS/BA") ||
    spreadsheet.getSheetByName("DS/DA/BA") ||
    spreadsheet.getSheetByName("DA-DS-BA") ||
    spreadsheet.getSheetByName("DA / DS / BA");

  if (!mainSheet) {
    mainSheet = spreadsheet.insertSheet("DA/DS/BA");
    mainSheet.appendRow([
      "Date & Time",
      "Student Name",
      "Mobile Number",
      "Specialization",
      "Email",
      "Score",
      "Pass",
      "Tab Switches"
    ]);
  }

  const allSheets = spreadsheet.getSheets();
  let mergedCount = 0;

  allSheets.forEach(function(subSheet) {
    const name = subSheet.getName();
    const isSubTab = (
      name.startsWith("DA/DS/BA - ") ||
      name.startsWith("DS/DA/BA - ") ||
      name.startsWith("DA-DS-BA - ")
    );

    if (isSubTab && name !== mainSheet.getName()) {
      const inferredSpec = name.split(" - ").slice(1).join(" - ").trim();
      const lastRow = subSheet.getLastRow();
      const lastCol = subSheet.getLastColumn();

      if (lastRow > 1) {
        const data = subSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
        data.forEach(function(row) {
          // If Specialization column (index 3) is empty or "-", set inferred specialization
          if (!row[3] || row[3] === "-") {
            row[3] = inferredSpec;
          }
          mainSheet.appendRow(row);
          mergedCount++;
        });
      }

      spreadsheet.deleteSheet(subSheet);
    }
  });

  Logger.log("Merged " + mergedCount + " entries into " + mainSheet.getName());
}
