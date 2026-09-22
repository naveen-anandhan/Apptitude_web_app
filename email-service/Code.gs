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

    // Allowed departments matching the website
    const allowedDepartments = [
      "SAP",
      "Python Full Stack",
      "Java Full Stack",
      "DA/DS/BA",
      "Embedded",
      "MECH",
      "General",
      "UI/UX",
      "UIUX",
      "PLC / Automation",
      "PLC",
      "Others"
    ];

    // Check department
    if (!allowedDepartments.includes(department)) {
      throw new Error(
        "Invalid department: " + department
      );
    }

    // Get the department sheet tab
    let sheet =
      spreadsheet.getSheetByName(department);

    // If sheet doesn't exist, create it automatically
    if (!sheet) {
      sheet =
        spreadsheet.insertSheet(department);
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
