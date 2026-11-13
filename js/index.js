import {
  ensureAnonymousLogin,
  getTest,
  getSpecializationsConfig,
  listenToSpecializationsConfig,
  DEFAULT_DEPARTMENTS,
  DEFAULT_SPECS
} from "./firebase.js?v=3.0";

import { APP_CONFIG } from "./config.js?v=3.0";
import { saveStudent } from "./common.js?v=3.0";

// DOM Elements
const form = document.getElementById("studentForm");
const messageEl = document.getElementById("message");
const adminPortalBtn = document.getElementById("adminPortalBtn");

// Show or hide the Admin button based on APP_CONFIG.ADMIN_BUTTON ("enable" / "disable")
if (adminPortalBtn) {
  const adminState = String(APP_CONFIG.ADMIN_BUTTON || "").trim().toLowerCase();
  const isEnabled = adminState === "enable" || adminState === "enabled" || adminState === "true" || APP_CONFIG.ADMIN_BUTTON === true;
  adminPortalBtn.style.display = isEnabled ? "inline-flex" : "none";
}

const deptSelect = document.getElementById("department");
const sapGroup = document.getElementById("sapSubCategoryGroup");
const sapSubSelect = document.getElementById("sapSubCategory");
const pythonGroup = document.getElementById("pythonSubCategoryGroup");
const pythonSubSelect = document.getElementById("pythonSubCategory");
const javaGroup = document.getElementById("javaSubCategoryGroup");
const javaSubSelect = document.getElementById("javaSubCategory");
const mechGroup = document.getElementById("mechSubCategoryGroup");
const mechSubSelect = document.getElementById("mechSubCategory");
const uiuxGroup = document.getElementById("uiuxSubCategoryGroup");
const uiuxSubSelect = document.getElementById("uiuxSubCategory");
const daDsBaGroup = document.getElementById("daDsBaSubCategoryGroup");
const daDsBaSubSelect = document.getElementById("daDsBaSubCategory");
const generalGroup = document.getElementById("generalSpecializationGroup");
const generalSubSelect = document.getElementById("generalSpecialization");

// Friendly labels for options
function getFriendlyLabel(dept, spec) {
  if (dept === "Python Full Stack") {
    if (spec === "Front End") return "Front End (HTML / CSS / JavaScript)";
    if (spec === "Back End") return "Back End (Python Technical + Aptitude)";
    if (spec === "Full Stack") return "Full Stack (Python + Aptitude)";
  }
  if (dept === "Java Full Stack") {
    if (spec === "Front End") return "Front End (HTML / CSS / JavaScript)";
    if (spec === "Back End") return "Back End (Java Technical + Aptitude)";
    if (spec === "Full Stack") return "Full Stack (Java + Aptitude)";
  }
  if (dept === "General") {
    if (spec === "MECH") return "Mechanical Engineering (MECH)";
    if (spec === "DA/DS/BA") return "DA/DS/BA (Data Analytics / Data Science)";
    if (spec === "SAP") return "SAP ERP";
    if (spec === "Python Full Stack") return "Python Full Stack";
    if (spec === "Java Full Stack") return "Java Full Stack";
    if (spec === "Embedded") return "Embedded Systems";
    if (spec === "PLC / Automation") return "PLC / Automation";
    if (spec === "UI/UX / Digital Marketing") return "UI/UX / Digital Marketing";
    if (spec === "HTML / CSS / JavaScript") return "HTML / CSS / JavaScript (Web Development)";
    if (spec === "ECE / EEE") return "ECE / EEE (Electronics / Electrical)";
    if (spec === "CSE / IT") return "CSE / IT (Computer Science / IT)";
    if (spec === "Civil") return "Civil Engineering";
    if (spec === "Others") return "Others";
  }
  return spec;
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
      // Check if this specialization select has at least 1 valid option (beyond the placeholder)
      const hasOptions = item.select && item.select.options.length > 1;
      if (hasOptions) {
        if (item.group) item.group.style.display = "block";
        if (item.select) item.select.required = true;
      } else {
        if (item.group) item.group.style.display = "none";
        if (item.select) {
          item.select.required = false;
          item.select.value = "";
        }
      }
    } else {
      if (item.group) item.group.style.display = "none";
      if (item.select) {
        item.select.required = false;
        item.select.value = "";
      }
    }
  });
}

// Apply visibility configuration to department and specialization dropdowns
function applyVisibilityConfig(config) {
  if (!config || typeof config !== "object") config = {};
  const deptVis = config.departmentVisibility || {};
  const specVis = config.specializationVisibility || {};

  // 1. Rebuild Department Dropdown according to Admin visibility tick boxes
  if (deptSelect) {
    const currentDeptVal = deptSelect.value;
    deptSelect.innerHTML = `<option value="">Select your department</option>`;

    DEFAULT_DEPARTMENTS.forEach(dept => {
      // Only include if NOT hidden by admin
      if (deptVis[dept] !== false) {
        const opt = document.createElement("option");
        opt.value = dept;
        opt.textContent = dept;
        deptSelect.appendChild(opt);
      }
    });

    // Retain previously selected department if still available
    if (Array.from(deptSelect.options).some(o => o.value === currentDeptVal)) {
      deptSelect.value = currentDeptVal;
    } else {
      deptSelect.value = "";
    }
  }

  // 2. Rebuild each Specialization Dropdown according to Admin visibility tick boxes
  const deptSelectMap = [
    { key: "SAP", group: sapGroup, select: sapSubSelect, placeholder: "Select specialization" },
    { key: "DA/DS/BA", group: daDsBaGroup, select: daDsBaSubSelect, placeholder: "Select specialization" },
    { key: "Python Full Stack", group: pythonGroup, select: pythonSubSelect, placeholder: "Select specialization" },
    { key: "Java Full Stack", group: javaGroup, select: javaSubSelect, placeholder: "Select specialization" },
    { key: "MECH", group: mechGroup, select: mechSubSelect, placeholder: "Select specialization" },
    { key: "UI/UX / Digital Marketing", group: uiuxGroup, select: uiuxSubSelect, placeholder: "Select specialization" },
    { key: "General", group: generalGroup, select: generalSubSelect, placeholder: "Select your background department" }
  ];

  deptSelectMap.forEach(item => {
    const dept = item.key;
    const select = item.select;
    if (!select) return;

    // Get all specializations: defaults + custom - deleted
    const defaults = DEFAULT_SPECS[dept] || [];
    const custom = Array.isArray(config[dept]) ? config[dept] : [];
    const deleted = (config._deleted && Array.isArray(config._deleted[dept])) ? config._deleted[dept] : [];

    const merged = [...defaults];
    custom.forEach(c => {
      if (!merged.includes(c)) merged.push(c);
    });
    const nonDeleted = merged.filter(s => !deleted.includes(s));

    // Filter by visibility tick box (item is shown unless explicitly set to false)
    const activeSpecs = nonDeleted.filter(spec => {
      if (specVis[dept] && specVis[dept][spec] === false) {
        return false;
      }
      return true;
    });

    const previousVal = select.value;
    select.innerHTML = `<option value="">${item.placeholder}</option>`;

    activeSpecs.forEach(spec => {
      const opt = document.createElement("option");
      opt.value = spec;
      opt.textContent = getFriendlyLabel(dept, spec);
      select.appendChild(opt);
    });

    if (Array.from(select.options).some(o => o.value === previousVal)) {
      select.value = previousVal;
    } else {
      select.value = "";
    }
  });

  updateSpecializationVisibility();
}

// Load custom specializations and visibility config from Firestore
async function loadCustomSpecializations() {
  try {
    // Authenticate immediately so reading Firestore config never fails
    await ensureAnonymousLogin();
    const config = await getSpecializationsConfig(APP_CONFIG.TEST_ID);
    applyVisibilityConfig(config);
  } catch (err) {
    console.warn("Could not load custom specializations config, using defaults:", err);
    applyVisibilityConfig({});
  } finally {
    updateSpecializationVisibility();
  }
}

// Attach listeners
if (deptSelect) {
  deptSelect.addEventListener("change", updateSpecializationVisibility);
}

// Trigger initial load immediately
loadCustomSpecializations();
window.addEventListener("DOMContentLoaded", updateSpecializationVisibility);

// Subscribe to real-time updates so any specialization or visibility changes
// made by admin are immediately reflected without requiring a reload
try {
  listenToSpecializationsConfig(APP_CONFIG.TEST_ID, (config) => {
    applyVisibilityConfig(config);
  });
} catch (e) {
  console.warn("Real-time listener setup notice:", e);
}

// Form submission handler
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = (document.getElementById("studentName")?.value || "").trim();
    const phone = (document.getElementById("studentId")?.value || "").trim();
    const department = (deptSelect?.value || "").trim();
    const email = (document.getElementById("studentEmail")?.value || "").trim();

    // Check whether all required primary fields are filled
    if (!name || !phone || !department || !email) {
      messageEl.textContent = "Please fill in all the details.";
      return;
    }

    let finalDepartment = department;
    let specialization = "";

    const checkSubCategory = (subSelect, group, deptName) => {
      if (group && group.style.display !== "none") {
        const sub = (subSelect?.value || "").trim();
        if (!sub) {
          messageEl.textContent = `Please select your ${deptName} Specialization.`;
          return false;
        }
        finalDepartment = `${deptName} - ${sub}`;
        specialization = sub;
      } else {
        finalDepartment = deptName;
        specialization = "-";
      }
      return true;
    };

    if (department === "SAP") {
      if (!checkSubCategory(sapSubSelect, sapGroup, "SAP")) return;
    } else if (department === "DA/DS/BA") {
      if (!checkSubCategory(daDsBaSubSelect, daDsBaGroup, "DA/DS/BA")) return;
    } else if (department === "Python Full Stack") {
      if (!checkSubCategory(pythonSubSelect, pythonGroup, "Python Full Stack")) return;
    } else if (department === "Java Full Stack") {
      if (!checkSubCategory(javaSubSelect, javaGroup, "Java Full Stack")) return;
    } else if (department === "MECH") {
      if (!checkSubCategory(mechSubSelect, mechGroup, "MECH")) return;
    } else if (department === "UI/UX" || department === "UI/UX / Digital Marketing") {
      if (uiuxGroup && uiuxGroup.style.display !== "none") {
        const sub = (uiuxSubSelect?.value || "").trim();
        if (!sub) {
          messageEl.textContent = "Please select your UI/UX / Digital Marketing Specialization.";
          return;
        }
        finalDepartment = "UI/UX / Digital Marketing";
        specialization = sub;
      } else {
        finalDepartment = "UI/UX / Digital Marketing";
        specialization = "-";
      }
    } else if (department === "General") {
      if (generalGroup && generalGroup.style.display !== "none") {
        const sub = (generalSubSelect?.value || "").trim();
        if (!sub) {
          messageEl.textContent = "Please select your degree stream / department.";
          return;
        }
        finalDepartment = "General";
        specialization = sub;
      } else {
        finalDepartment = "General";
        specialization = "-";
      }
    } else {
      finalDepartment = department;
      specialization = "-";
    }

    messageEl.textContent = "Preparing your assessment...";

    try {
      // Ensure anonymous login before accessing Firestore
      await ensureAnonymousLogin();

      const test = await getTest(APP_CONFIG.TEST_ID);

      if (test.active === false) {
        messageEl.textContent = "This test is currently unavailable.";
        return;
      }

      // Save student details for the test
      saveStudent({
        name: name,
        studentId: phone,
        department: finalDepartment,
        specialization: specialization,
        email: email
      });

      // Clear any previous session test data
      sessionStorage.removeItem("answers");
      sessionStorage.removeItem("testStart");
      sessionStorage.removeItem("lastResult");
      sessionStorage.removeItem("tabSwitches");

      // Start the assessment
      location.href = "test.html";
    } catch (error) {
      console.error("Assessment start error:", error);
      messageEl.textContent = "Unable to start the assessment right now. Please check your internet connection and try again.";
    }
  });
}
