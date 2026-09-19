/**
 * Google Apps Script - Result Handler (Email & Google Sheets)
 *
 * Deploy as:
 *   Deploy -> New deployment -> Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * This script accepts the payload sent by test.js:
 * {
 *   studentName, phoneNumber, department, email, score, pass
 * }
 */

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(contents);

    var studentName = data.studentName || data.name || "Student";
    var studentEmail = data.email || data.studentEmail || "";
    var studentPhone = data.phoneNumber || data.studentId || "";
    var department = data.department || "General";
    var score = data.score || "";
    var pass = data.pass || "";
    var timestamp = new Date().toLocaleString();

    // Optional: If this script is attached to a Google Sheet, record the submission
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet();
      if (sheet) {
        var tab = sheet.getActiveSheet();
        if (tab.getLastRow() === 0) {
          tab.appendRow([
            "Timestamp",
            "Student Name",
            "Mobile / ID",
            "Department",
            "Email",
            "Score",
            "Status"
          ]);
        }
        tab.appendRow([
          timestamp,
          studentName,
          studentPhone,
          department,
          studentEmail,
          score,
          pass
        ]);
      }
    } catch (sheetErr) {
      Logger.log("Sheet logging note: " + sheetErr);
    }

    // Send confirmation email to student if email is provided
    if (studentEmail) {
      try {
        var subject = "PUMO Aptitude Assessment Result - " + studentName;
        var body =
          "Hi " + studentName + ",\n\n" +
          "Thank you for completing the PUMO Aptitude Assessment.\n\n" +
          "Assessment Summary:\n" +
          "------------------------------------\n" +
          "Department : " + department + "\n" +
          "Mobile / ID: " + studentPhone + "\n" +
          "Score      : " + score + "\n" +
          "Result     : " + pass + "\n" +
          "Submitted  : " + timestamp + "\n" +
          "------------------------------------\n\n" +
          "Best regards,\nPUMO Tech Systems Team";

        MailApp.sendEmail({
          to: studentEmail,
          subject: subject,
          body: body
        });
      } catch (mailErr) {
        Logger.log("Email sending note: " + mailErr);
      }
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
