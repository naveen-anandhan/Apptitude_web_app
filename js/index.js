import { getTest } from "./firebase.js";
import { APP_CONFIG } from "./config.js";
import { saveStudent } from "./common.js";

const form = document.getElementById("studentForm");
const messageEl = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("studentId").value.trim();
  const department = document.getElementById("department").value;
  const email = document.getElementById("studentEmail").value.trim();

  if (!name || !phone || !department || !email) {
    messageEl.textContent = "Please fill in all the details.";
    return;
  }

  try {
    const test = await getTest(APP_CONFIG.TEST_ID);

    if (test.active === false) {
      messageEl.textContent = "This test is currently unavailable.";
      return;
    }

    // Save student details for the test
    saveStudent({
      name: name,
      studentId: phone,
      department: department,
      email: email
    });

    // Clear any previous test data
    sessionStorage.removeItem("answers");
    sessionStorage.removeItem("testStart");
    sessionStorage.removeItem("lastResult");

    // Start the test
    location.href = "test.html";

  } catch (error) {

    console.error(error);

    messageEl.textContent =
      error.message || "Unable to start the test.";
  }
});