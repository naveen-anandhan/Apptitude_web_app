import {
  ensureAnonymousLogin,
  getTest
} from "./firebase.js";

import { APP_CONFIG } from "./config.js";

import { saveStudent } from "./common.js";


const form =
  document.getElementById("studentForm");

const messageEl =
  document.getElementById("message");


form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const name =
      document
        .getElementById("studentName")
        .value
        .trim();


    const phone =
      document
        .getElementById("studentId")
        .value
        .trim();


    const department =
      document
        .getElementById("department")
        .value;


    const email =
      document
        .getElementById("studentEmail")
        .value
        .trim();


    // Check whether all fields are filled
    if (
      !name ||
      !phone ||
      !department ||
      !email
    ) {

      messageEl.textContent =
        "Please fill in all the details.";

      return;
    }


    try {

      // Automatically sign the student in anonymously.
      // The student does not need a username or password.

      await ensureAnonymousLogin();


      // Now the student is authenticated,
      // so Firestore can be accessed.

      const test =
        await getTest(
          APP_CONFIG.TEST_ID
        );


      // Check whether the assessment is active.

      if (test.active === false) {

        messageEl.textContent =
          "This test is currently unavailable.";

        return;
      }


      // Save student details for the test.

      saveStudent({

        name:
          name,

        studentId:
          phone,

        department:
          department,

        email:
          email

      });


      // Clear any previous test data.

      sessionStorage.removeItem(
        "answers"
      );

      sessionStorage.removeItem(
        "testStart"
      );

      sessionStorage.removeItem(
        "lastResult"
      );


      // Start the assessment.

      location.href =
        "test.html";


    } catch (error) {

      // Keep the technical error in the browser console
      // for administrator debugging.

      console.error(
        "Assessment start error:",
        error
      );


      // Show a simple message to the student
      // instead of exposing Firebase error details.

      messageEl.textContent =
        "Unable to start the assessment right now. Please check your internet connection and try again.";

    }

  }
);