import {
  ensureAnonymousLogin,
  getTest,
  getSpecializationsConfig
} from "./firebase.js?v=2.1";

import { APP_CONFIG } from "./config.js?v=2.1";

import { saveStudent } from "./common.js?v=2.1";


const form =
  document.getElementById("studentForm");

const messageEl =
  document.getElementById("message");

const deptSelect =
  document.getElementById("department");

const sapGroup =
  document.getElementById("sapSubCategoryGroup");

const sapSubSelect =
  document.getElementById("sapSubCategory");

const pythonGroup =
  document.getElementById("pythonSubCategoryGroup");

const pythonSubSelect =
  document.getElementById("pythonSubCategory");

const javaGroup =
  document.getElementById("javaSubCategoryGroup");

const javaSubSelect =
  document.getElementById("javaSubCategory");

const mechGroup =
  document.getElementById("mechSubCategoryGroup");

const mechSubSelect =
  document.getElementById("mechSubCategory");

const uiuxGroup =
  document.getElementById("uiuxSubCategoryGroup");

const uiuxSubSelect =
  document.getElementById("uiuxSubCategory");

const daDsBaGroup =
  document.getElementById("daDsBaSubCategoryGroup");

const daDsBaSubSelect =
  document.getElementById("daDsBaSubCategory");

const generalGroup =
  document.getElementById("generalSpecializationGroup");

const generalSubSelect =
  document.getElementById("generalSpecialization");


// Helper function to hide and reset a subcategory group
function resetGroup(group, select) {
  if (group) group.style.display = "none";
  if (select) {
    select.required = false;
    select.value = "";
  }
}

// Function to toggle specialization visibility according to currently selected department
function updateSpecializationVisibility() {
  if (!deptSelect) return;
  const val = deptSelect.value;

  const mapping = [
    { key: "SAP", group: sapGroup, select: sapSubSelect },
    { key: "DA/DS/BA", group: daDsBaGroup, select: daDsBaSubSelect },
    { key: "Python Full Stack", group: pythonGroup, select: pythonSubSelect },
    { key: "Java Full Stack", group: javaGroup, select: javaSubSelect },
    { key: "MECH", group: mechGroup, select: mechSubSelect },
    { key: "UI/UX / Digital Marketing", group: uiuxGroup, select: uiuxSubSelect, altKey: "UI/UX" },
    { key: "General", group: generalGroup, select: generalSubSelect }
  ];

  mapping.forEach(item => {
    const isMatch = (val === item.key || (item.altKey && val === item.altKey));
    if (isMatch) {
      if (item.group) item.group.style.display = "block";
      if (item.select) item.select.required = true;
    } else {
      if (item.group) item.group.style.display = "none";
      if (item.select) {
        item.select.required = false;
      }
    }
  });
}

// Load custom specializations created dynamically by Admin in Firestore
async function loadCustomSpecializations() {
  try {
    const config = await getSpecializationsConfig(APP_CONFIG.TEST_ID);
    if (!config || typeof config !== "object") return;

    const deptSelectMap = {
      "DA/DS/BA": daDsBaSubSelect,
      "SAP": sapSubSelect,
      "Python Full Stack": pythonSubSelect,
      "Java Full Stack": javaSubSelect,
      "MECH": mechSubSelect,
      "UI/UX / Digital Marketing": uiuxSubSelect,
    };

    Object.entries(config).forEach(([dept, specs]) => {
      const select = deptSelectMap[dept];
      if (select && Array.isArray(specs)) {
        const existingValues = Array.from(select.options).map(o => o.value);
        specs.forEach(spec => {
          if (!existingValues.includes(spec)) {
            const opt = document.createElement("option");
            opt.value = spec;
            opt.textContent = spec;
            select.appendChild(opt);
          }
        });
      }
    });
  } catch (err) {
    console.warn("Could not load custom specializations:", err);
  } finally {
    updateSpecializationVisibility();
  }
}

// Attach listener and trigger immediately to handle pre-selected/restored form values
if (deptSelect) {
  deptSelect.addEventListener("change", updateSpecializationVisibility);
  updateSpecializationVisibility();
}

loadCustomSpecializations();
window.addEventListener("DOMContentLoaded", updateSpecializationVisibility);


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
      deptSelect
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


    let finalDepartment = department;
    let specialization = "";

    if (department === "SAP") {
      const sub = sapSubSelect ? sapSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your SAP Specialization (SAP FICO or SAP MM).";
        return;
      }
      finalDepartment = `SAP - ${sub}`;
      specialization = sub;
    } else if (department === "DA/DS/BA") {
      const sub = daDsBaSubSelect ? daDsBaSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your DA/DS/BA Specialization (MySQL or Python).";
        return;
      }
      finalDepartment = `DA/DS/BA - ${sub}`;
      specialization = sub;
    } else if (department === "Python Full Stack") {
      const sub = pythonSubSelect ? pythonSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your Python Full Stack Specialization (Front End, Back End, or Full Stack).";
        return;
      }
      finalDepartment = `Python Full Stack - ${sub}`;
      specialization = sub;
    } else if (department === "Java Full Stack") {
      const sub = javaSubSelect ? javaSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your Java Full Stack Specialization (Front End, Back End, or Full Stack).";
        return;
      }
      finalDepartment = `Java Full Stack - ${sub}`;
      specialization = sub;
    } else if (department === "MECH") {
      const sub = mechSubSelect ? mechSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your Mechanical Specialization (Creo, CATIA, or AutoCAD).";
        return;
      }
      finalDepartment = `MECH - ${sub}`;
      specialization = sub;
    } else if (department === "UI/UX" || department === "UI/UX / Digital Marketing") {
      const sub = uiuxSubSelect ? uiuxSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your UI/UX / Digital Marketing Specialization (Digital Marketing, UI/UX Design, or Product Design).";
        return;
      }
      finalDepartment = "UI/UX / Digital Marketing";
      specialization = sub;
    } else if (department === "General") {
      const sub = generalSubSelect ? generalSubSelect.value : "";
      if (!sub) {
        messageEl.textContent =
          "Please select your degree stream / department.";
        return;
      }
      finalDepartment = "General";
      specialization = sub;
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
          finalDepartment,

        specialization:
          specialization,

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

      sessionStorage.removeItem(
        "tabSwitches"
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