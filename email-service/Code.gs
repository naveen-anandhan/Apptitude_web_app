/**
 * Google Apps Script email service.
 *
 * Deploy as:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * The script receives JSON:
 * {
 *   name, email, studentId, score, total, percentage
 * }
 *
 * It sends an email from the Google account that owns the script.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (!data.email || !data.name) {
      return jsonResponse({ ok: false, error: "Missing email/name" });
    }

    var subject = "Aptitude Test Result";
    var body =
      "Hi " + data.name + ",\n\n" +
      "Your aptitude test has been evaluated.\n\n" +
      "Student ID: " + data.studentId + "\n" +
      "Score: " + data.score + " / " + data.total + "\n" +
      "Percentage: " + data.percentage + "%\n\n" +
      "Thank you for attending the test.\n";

    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
    });

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
