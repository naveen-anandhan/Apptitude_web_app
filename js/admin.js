import {
  ensureAnonymousLogin,
  getResults,
  getAllDepartmentQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  toggleQuestionInclusion,
  getSpecializationsConfig,
  saveSpecialization,
  deleteSpecialization,
  setDepartmentVisibility,
  setSpecializationVisibility,
  saveFullVisibilityConfig,
  DEFAULT_DEPARTMENTS,
  DEFAULT_SPECS
} from "./firebase.js?v=3.0";

import { APP_CONFIG } from "./config.js?v=3.0";
import { formatDate, escapeHtml } from "./common.js";

// --- DOM ELEMENTS ---
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const usernameInput = document.getElementById("adminUsername");
const passwordInput = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");
const adminMessage = document.getElementById("adminMessage");
const logoutBtn = document.getElementById("logoutBtn");

// Tabs
const tabQuestionsBtn = document.getElementById("tabQuestionsBtn");
const tabVisibilityBtn = document.getElementById("tabVisibilityBtn");
const tabQrBtn = document.getElementById("tabQrBtn");
const tabResultsBtn = document.getElementById("tabResultsBtn");

const tabQuestions = document.getElementById("tabQuestions");
const tabVisibility = document.getElementById("tabVisibility");
const tabQr = document.getElementById("tabQr");
const tabResults = document.getElementById("tabResults");

// Tab 1: Question Bank elements
const adminDeptSelect = document.getElementById("adminDeptSelect");
const adminSpecSelect = document.getElementById("adminSpecSelect");
const currentDeptVisibilityCheckbox = document.getElementById("currentDeptVisibilityCheckbox");
const currentDeptVisibilityText = document.getElementById("currentDeptVisibilityText");
const currentSpecVisibilityCheckbox = document.getElementById("currentSpecVisibilityCheckbox");
const currentSpecVisibilityText = document.getElementById("currentSpecVisibilityText");
const openAddSpecModalBtn = document.getElementById("openAddSpecModalBtn");
const deleteSpecBtn = document.getElementById("deleteSpecBtn");
const openAddQModalBtn = document.getElementById("openAddQModalBtn");

const metricTotalQ = document.getElementById("metricTotalQ");
const metricIncludedQ = document.getElementById("metricIncludedQ");
const metricStatusBadge = document.getElementById("metricStatusBadge");
const questionsContainer = document.getElementById("questionsContainer");

// Tab 2: Visibility Manager elements
const visMetricActiveDepts = document.getElementById("visMetricActiveDepts");
const visMetricActiveSpecs = document.getElementById("visMetricActiveSpecs");
const visMetricTotalSpecs = document.getElementById("visMetricTotalSpecs");
const enableAllVisBtn = document.getElementById("enableAllVisBtn");
const deptCardsGrid = document.getElementById("deptCardsGrid");

// Tab 3: QR Code elements
const qrcodeContainer = document.getElementById("qrcodeContainer");
const qrUrlInput = document.getElementById("qrUrlInput");
const copyQrUrlBtn = document.getElementById("copyQrUrlBtn");
const downloadQrBtn = document.getElementById("downloadQrBtn");
const printPosterBtn = document.getElementById("printPosterBtn");
const printQrImg = document.getElementById("printQrImg");
const printQrUrlText = document.getElementById("printQrUrlText");

// Question Modal
const questionModal = document.getElementById("questionModal");
const modalTitle = document.getElementById("modalTitle");
const editingQuestionId = document.getElementById("editingQuestionId");
const modalQuestionText = document.getElementById("modalQuestionText");
const modalOptA = document.getElementById("modalOptA");
const modalOptB = document.getElementById("modalOptB");
const modalOptC = document.getElementById("modalOptC");
const modalOptD = document.getElementById("modalOptD");
const modalIncludedCheckbox = document.getElementById("modalIncludedCheckbox");
const saveQuestionBtn = document.getElementById("saveQuestionBtn");
const cancelQModalBtn = document.getElementById("cancelQModalBtn");
const closeQModalBtn = document.getElementById("closeQModalBtn");
const correctChips = document.querySelectorAll(".correct-chips .chip-btn");

// Specialization Modal
const specModal = document.getElementById("specModal");
const specModalDeptLabel = document.getElementById("specModalDeptLabel");
const newSpecInput = document.getElementById("newSpecInput");
const saveSpecBtn = document.getElementById("saveSpecBtn");
const cancelSpecModalBtn = document.getElementById("cancelSpecModalBtn");
const closeSpecModalBtn = document.getElementById("closeSpecModalBtn");

// Results Elements
const resultsBody = document.getElementById("resultsBody");
const exportBtn = document.getElementById("exportBtn");
const resultsCount = document.getElementById("resultsCount");
const toastEl = document.getElementById("toast");

// --- STATE ---
let currentQuestions = [];
let currentResults = [];
let customSpecs = {};
let selectedCorrectIndex = 0;
let modalTargetDept = "";
let qrInstance = null;

// --- TOAST HELPER ---
function showToast(msg, duration = 3000) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  setTimeout(() => {
    toastEl.classList.add("hidden");
  }, duration);
}

// --- AUTHENTICATION ---
if (loginBtn) loginBtn.addEventListener("click", handleLogin);
if (passwordInput) {
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}
if (usernameInput) {
  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}

async function handleLogin() {
  const username = (usernameInput.value || "").trim().toLowerCase();
  const password = (passwordInput.value || "").trim();

  const validUsername = (APP_CONFIG.ADMIN_USERNAME || "Admin").toLowerCase();
  const validPassword = (APP_CONFIG.ADMIN_PASSWORD || "Admin");

  const isUserMatch = (username === validUsername || username === "admin");
  const isPassMatch = (
    password === validPassword ||
    password.toLowerCase() === "admin" ||
    password === "CHANGE_THIS_ADMIN_PASSWORD"
  );

  if (!isUserMatch || !isPassMatch) {
    adminMessage.textContent = "Invalid username or password. Please use Admin / Admin.";
    return;
  }

  adminMessage.textContent = "Connecting to Firebase...";
  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  try {
    await ensureAnonymousLogin();
    sessionStorage.setItem("pumo_admin_session", "true");
    adminMessage.textContent = "";
    loginSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
    await initDashboard();
  } catch (err) {
    console.error("Login error:", err);
    adminMessage.textContent = "Error connecting to Firebase: " + (err.message || "Unknown error");
    loginSection.classList.remove("hidden");
    dashboardSection.classList.add("hidden");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login to Admin Portal";
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("pumo_admin_session");
    loginSection.classList.remove("hidden");
    dashboardSection.classList.add("hidden");
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
    showToast("Logged out successfully");
  });
}

// Auto-login if session exists
window.addEventListener("DOMContentLoaded", async () => {
  if (sessionStorage.getItem("pumo_admin_session") === "true") {
    try {
      await ensureAnonymousLogin();
      loginSection.classList.add("hidden");
      dashboardSection.classList.remove("hidden");
      await initDashboard();
    } catch (err) {
      console.warn("Auto-login error:", err);
    }
  }
});

// --- TAB SWITCHING ---
function switchTab(target) {
  [tabQuestionsBtn, tabVisibilityBtn, tabQrBtn, tabResultsBtn].forEach(b => {
    if (b) b.classList.remove("active");
  });
  [tabQuestions, tabVisibility, tabQr, tabResults].forEach(s => {
    if (s) s.classList.add("hidden");
  });

  if (target === "questions") {
    if (tabQuestionsBtn) tabQuestionsBtn.classList.add("active");
    if (tabQuestions) tabQuestions.classList.remove("hidden");
  } else if (target === "visibility") {
    if (tabVisibilityBtn) tabVisibilityBtn.classList.add("active");
    if (tabVisibility) tabVisibility.classList.remove("hidden");
    renderDepartmentVisibilityGrid();
  } else if (target === "qr") {
    if (tabQrBtn) tabQrBtn.classList.add("active");
    if (tabQr) tabQr.classList.remove("hidden");
    renderQrCode(qrUrlInput ? qrUrlInput.value : "https://pumo-aptitude-test.web.app");
  } else if (target === "results") {
    if (tabResultsBtn) tabResultsBtn.classList.add("active");
    if (tabResults) tabResults.classList.remove("hidden");
    loadResults();
  }
}

if (tabQuestionsBtn) tabQuestionsBtn.addEventListener("click", () => switchTab("questions"));
if (tabVisibilityBtn) tabVisibilityBtn.addEventListener("click", () => switchTab("visibility"));
if (tabQrBtn) tabQrBtn.addEventListener("click", () => switchTab("qr"));
if (tabResultsBtn) tabResultsBtn.addEventListener("click", () => switchTab("results"));

// --- DASHBOARD INITIALIZATION ---
async function initDashboard() {
  await loadSpecializations();
  populateSpecializationDropdown();
  updateQuestionBankVisibilityToggles();
  renderDepartmentVisibilityGrid();
  initQrCodeTab();
  await loadCurrentQuestions();
}

async function loadSpecializations() {
  try {
    customSpecs = await getSpecializationsConfig(APP_CONFIG.TEST_ID);
    if (!customSpecs || typeof customSpecs !== "object") {
      customSpecs = {};
    }
    if (!customSpecs.departmentVisibility) {
      customSpecs.departmentVisibility = {};
    }
    if (!customSpecs.specializationVisibility) {
      customSpecs.specializationVisibility = {};
    }
  } catch (err) {
    console.warn("Could not load custom specs:", err);
    customSpecs = { departmentVisibility: {}, specializationVisibility: {} };
  }
}

function getSpecializationsForDept(dept) {
  const defaults = DEFAULT_SPECS[dept] || [dept];
  const custom = (customSpecs && Array.isArray(customSpecs[dept])) ? customSpecs[dept] : [];
  const deleted = (customSpecs && customSpecs._deleted && Array.isArray(customSpecs._deleted[dept])) ? customSpecs._deleted[dept] : [];
  const merged = [...defaults];
  custom.forEach(c => {
    if (!merged.includes(c)) merged.push(c);
  });
  return merged.filter(s => !deleted.includes(s));
}

function isDeptVisible(dept) {
  if (!customSpecs || !customSpecs.departmentVisibility) return true;
  return customSpecs.departmentVisibility[dept] !== false;
}

function isSpecVisible(dept, spec) {
  if (!customSpecs || !customSpecs.specializationVisibility) return true;
  if (!customSpecs.specializationVisibility[dept]) return true;
  return customSpecs.specializationVisibility[dept][spec] !== false;
}

// Populate the specialization select in Tab 1
function populateSpecializationDropdown() {
  const dept = adminDeptSelect.value;
  const specs = getSpecializationsForDept(dept);
  adminSpecSelect.innerHTML = "";
  if (specs.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "-- No specializations --";
    adminSpecSelect.appendChild(opt);
    if (deleteSpecBtn) deleteSpecBtn.disabled = true;
  } else {
    specs.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      const isVis = isSpecVisible(dept, s);
      opt.textContent = `${s} ${isVis ? "" : "(Hidden)"}`;
      adminSpecSelect.appendChild(opt);
    });
    if (deleteSpecBtn) deleteSpecBtn.disabled = false;
  }
  updateQuestionBankVisibilityToggles();
}

// Update the checkbox & status badge next to department & specialization in Tab 1
function updateQuestionBankVisibilityToggles() {
  const dept = adminDeptSelect ? adminDeptSelect.value : "";
  const spec = adminSpecSelect ? adminSpecSelect.value : "";

  // Department Visibility Checkbox
  if (currentDeptVisibilityCheckbox && currentDeptVisibilityText) {
    const isDeptVis = isDeptVisible(dept);
    currentDeptVisibilityCheckbox.checked = isDeptVis;
    if (isDeptVis) {
      currentDeptVisibilityText.className = "vis-status-pill vis-status-shown";
      currentDeptVisibilityText.textContent = "✓ Shown to User";
    } else {
      currentDeptVisibilityText.className = "vis-status-pill vis-status-hidden";
      currentDeptVisibilityText.textContent = "✕ Hidden from User";
    }
  }

  // Specialization Visibility Checkbox
  if (currentSpecVisibilityCheckbox && currentSpecVisibilityText) {
    if (!spec) {
      currentSpecVisibilityCheckbox.disabled = true;
      currentSpecVisibilityCheckbox.checked = false;
      currentSpecVisibilityText.className = "vis-status-pill vis-status-hidden";
      currentSpecVisibilityText.textContent = "No Spec";
    } else {
      currentSpecVisibilityCheckbox.disabled = false;
      const isSpecVis = isSpecVisible(dept, spec);
      currentSpecVisibilityCheckbox.checked = isSpecVis;
      if (isSpecVis) {
        currentSpecVisibilityText.className = "vis-status-pill vis-status-shown";
        currentSpecVisibilityText.textContent = "✓ Shown to User";
      } else {
        currentSpecVisibilityText.className = "vis-status-pill vis-status-hidden";
        currentSpecVisibilityText.textContent = "✕ Hidden from User";
      }
    }
  }
}

// Department dropdown change in Tab 1
if (adminDeptSelect) {
  adminDeptSelect.addEventListener("change", async () => {
    populateSpecializationDropdown();
    await loadCurrentQuestions();
  });
}

// Specialization dropdown change in Tab 1
if (adminSpecSelect) {
  adminSpecSelect.addEventListener("change", async () => {
    updateQuestionBankVisibilityToggles();
    await loadCurrentQuestions();
  });
}

// Toggle Dept Visibility Checkbox in Tab 1
if (currentDeptVisibilityCheckbox) {
  currentDeptVisibilityCheckbox.addEventListener("change", async (e) => {
    const dept = adminDeptSelect.value;
    const newStatus = e.target.checked;
    try {
      await setDepartmentVisibility(APP_CONFIG.TEST_ID, dept, newStatus);
      if (!customSpecs.departmentVisibility) customSpecs.departmentVisibility = {};
      customSpecs.departmentVisibility[dept] = newStatus;
      updateQuestionBankVisibilityToggles();
      renderDepartmentVisibilityGrid();
      showToast(newStatus ? `Department "${dept}" will now be shown to students.` : `Department "${dept}" is now hidden from students.`);
    } catch (err) {
      console.error("Dept toggle error:", err);
      e.target.checked = !newStatus;
      updateQuestionBankVisibilityToggles();
      showToast("Error updating department visibility: " + err.message);
    }
  });
}

// Toggle Spec Visibility Checkbox in Tab 1
if (currentSpecVisibilityCheckbox) {
  currentSpecVisibilityCheckbox.addEventListener("change", async (e) => {
    const dept = adminDeptSelect.value;
    const spec = adminSpecSelect.value;
    if (!spec) return;
    const newStatus = e.target.checked;
    try {
      await setSpecializationVisibility(APP_CONFIG.TEST_ID, dept, spec, newStatus);
      if (!customSpecs.specializationVisibility) customSpecs.specializationVisibility = {};
      if (!customSpecs.specializationVisibility[dept]) customSpecs.specializationVisibility[dept] = {};
      customSpecs.specializationVisibility[dept][spec] = newStatus;
      updateQuestionBankVisibilityToggles();
      populateSpecializationDropdown();
      adminSpecSelect.value = spec;
      renderDepartmentVisibilityGrid();
      showToast(newStatus ? `Specialization "${spec}" will now be shown to students.` : `Specialization "${spec}" is now hidden from students.`);
    } catch (err) {
      console.error("Spec toggle error:", err);
      e.target.checked = !newStatus;
      updateQuestionBankVisibilityToggles();
      showToast("Error updating specialization visibility: " + err.message);
    }
  });
}

// --- TAB 2: VISIBILITY MANAGER GRID ---
function renderDepartmentVisibilityGrid() {
  if (!deptCardsGrid) return;

  const departments = DEFAULT_DEPARTMENTS;
  let activeDeptCount = 0;
  let totalSpecsCount = 0;
  let activeSpecsCount = 0;

  deptCardsGrid.innerHTML = "";

  departments.forEach(dept => {
    const isDeptVis = isDeptVisible(dept);
    if (isDeptVis) activeDeptCount++;

    const specs = getSpecializationsForDept(dept);
    const activeSpecsInDept = specs.filter(s => isSpecVisible(dept, s)).length;
    totalSpecsCount += specs.length;
    activeSpecsCount += activeSpecsInDept;

    const card = document.createElement("div");
    card.className = `dept-vis-card ${isDeptVis ? "" : "is-dept-hidden"}`;
    card.id = `deptCard_${dept.replace(/\s+|\//g, "_")}`;

    // Header
    const header = document.createElement("div");
    header.className = "dept-vis-header";
    header.innerHTML = `
      <div>
        <h3 class="dept-vis-title">${escapeHtml(dept)}</h3>
        <span class="dept-vis-meta">${activeSpecsInDept} of ${specs.length} specializations active</span>
      </div>
      <label class="vis-toggle-wrap" title="Toggle visibility of ${escapeHtml(dept)} on candidate registration form">
        <input type="checkbox" class="vis-toggle-checkbox dept-toggle" data-dept="${escapeHtml(dept)}" ${isDeptVis ? "checked" : ""}>
        <span class="vis-status-pill ${isDeptVis ? "vis-status-shown" : "vis-status-hidden"}">
          ${isDeptVis ? "✓ Shown to User" : "✕ Hidden"}
        </span>
      </label>
    `;

    // Department Checkbox Handler
    const deptToggle = header.querySelector(".dept-toggle");
    deptToggle.addEventListener("change", async (e) => {
      const newStatus = e.target.checked;
      try {
        await setDepartmentVisibility(APP_CONFIG.TEST_ID, dept, newStatus);
        if (!customSpecs.departmentVisibility) customSpecs.departmentVisibility = {};
        customSpecs.departmentVisibility[dept] = newStatus;
        showToast(newStatus ? `Department "${dept}" is now shown to students.` : `Department "${dept}" is now hidden from students.`);
        renderDepartmentVisibilityGrid();
        updateQuestionBankVisibilityToggles();
      } catch (err) {
        console.error(err);
        e.target.checked = !newStatus;
        showToast("Error updating visibility: " + err.message);
      }
    });

    // Specializations List Container
    const specListContainer = document.createElement("div");
    specListContainer.className = "spec-list-container";

    if (specs.length === 0) {
      specListContainer.innerHTML = `
        <div style="font-size: 13px; color: #94a3b8; font-style: italic; padding: 8px 0;">
          No sub-specializations defined for this department.
        </div>
      `;
    } else {
      specs.forEach(spec => {
        const isSpecVis = isSpecVisible(dept, spec);
        const row = document.createElement("div");
        row.className = `spec-item-row ${isSpecVis ? "" : "is-spec-hidden"}`;

        const isDefault = (DEFAULT_SPECS[dept] || []).includes(spec);

        row.innerHTML = `
          <label class="spec-name-label" title="Tick to show/hide '${escapeHtml(spec)}' in student form">
            <input type="checkbox" class="vis-toggle-checkbox spec-toggle" data-dept="${escapeHtml(dept)}" data-spec="${escapeHtml(spec)}" ${isSpecVis ? "checked" : ""}>
            <span>${escapeHtml(spec)}</span>
          </label>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="vis-status-pill ${isSpecVis ? "vis-status-shown" : "vis-status-hidden"}">
              ${isSpecVis ? "Shown" : "Hidden"}
            </span>
            <button class="btn-delete-small delete-spec-btn" data-dept="${escapeHtml(dept)}" data-spec="${escapeHtml(spec)}" title="Delete ${escapeHtml(spec)}">🗑️</button>
          </div>
        `;

        // Specialization Toggle Handler
        const specToggle = row.querySelector(".spec-toggle");
        specToggle.addEventListener("change", async (e) => {
          const newStatus = e.target.checked;
          try {
            await setSpecializationVisibility(APP_CONFIG.TEST_ID, dept, spec, newStatus);
            if (!customSpecs.specializationVisibility) customSpecs.specializationVisibility = {};
            if (!customSpecs.specializationVisibility[dept]) customSpecs.specializationVisibility[dept] = {};
            customSpecs.specializationVisibility[dept][spec] = newStatus;
            showToast(newStatus ? `Specialization "${spec}" is now shown to students.` : `Specialization "${spec}" is now hidden from students.`);
            renderDepartmentVisibilityGrid();
            updateQuestionBankVisibilityToggles();
          } catch (err) {
            console.error(err);
            e.target.checked = !newStatus;
            showToast("Error updating specialization visibility: " + err.message);
          }
        });

        // Delete Spec Button Handler
        const delBtn = row.querySelector(".delete-spec-btn");
        delBtn.addEventListener("click", () => handleDeleteSpecDirect(dept, spec));

        specListContainer.appendChild(row);
      });
    }

    // Card Footer: Add Spec Button
    const footer = document.createElement("div");
    footer.style.marginTop = "auto";
    footer.style.paddingTop = "10px";
    footer.style.borderTop = "1px solid #f1f5f9";
    footer.innerHTML = `
      <button class="btn-outline add-spec-for-dept-btn" data-dept="${escapeHtml(dept)}" style="width: 100%; justify-content: center; font-size: 13px; padding: 7px 12px;">
        ➕ Add Specialization to ${escapeHtml(dept)}
      </button>
    `;

    const addBtn = footer.querySelector(".add-spec-for-dept-btn");
    addBtn.addEventListener("click", () => openAddSpecModal(dept));

    card.appendChild(header);
    card.appendChild(specListContainer);
    card.appendChild(footer);
    deptCardsGrid.appendChild(card);
  });

  // Update Summary Metrics
  if (visMetricActiveDepts) visMetricActiveDepts.textContent = `${activeDeptCount} / ${departments.length}`;
  if (visMetricActiveSpecs) visMetricActiveSpecs.textContent = activeSpecsCount;
  if (visMetricTotalSpecs) visMetricTotalSpecs.textContent = totalSpecsCount;
}

// "Enable All for Students" Button in Tab 2
if (enableAllVisBtn) {
  enableAllVisBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to show ALL departments and specializations to students on the registration page?");
    if (!confirmed) return;

    enableAllVisBtn.disabled = true;
    enableAllVisBtn.textContent = "Updating...";

    const deptVis = {};
    const specVis = {};

    DEFAULT_DEPARTMENTS.forEach(dept => {
      deptVis[dept] = true;
      specVis[dept] = {};
      const specs = getSpecializationsForDept(dept);
      specs.forEach(s => {
        specVis[dept][s] = true;
      });
    });

    try {
      await saveFullVisibilityConfig(APP_CONFIG.TEST_ID, deptVis, specVis);
      customSpecs.departmentVisibility = deptVis;
      customSpecs.specializationVisibility = specVis;
      renderDepartmentVisibilityGrid();
      updateQuestionBankVisibilityToggles();
      populateSpecializationDropdown();
      showToast("All departments & specializations are now shown to students!");
    } catch (err) {
      console.error("Enable all error:", err);
      showToast("Failed to enable all: " + err.message);
    } finally {
      enableAllVisBtn.disabled = false;
      enableAllVisBtn.textContent = "✓ Enable All for Students";
    }
  });
}

// Direct Delete Spec Helper
async function handleDeleteSpecDirect(dept, spec) {
  const confirmed = confirm(`Are you sure you want to delete specialization "${spec}" under department "${dept}"?\n\nThis will remove it from candidate registration dropdowns.`);
  if (!confirmed) return;

  try {
    await deleteSpecialization(APP_CONFIG.TEST_ID, dept, spec);
    await loadSpecializations();
    populateSpecializationDropdown();
    renderDepartmentVisibilityGrid();
    showToast(`Deleted specialization: "${spec}"`);
    if (adminDeptSelect.value === dept) {
      await loadCurrentQuestions();
    }
  } catch (err) {
    console.error("Delete spec error:", err);
    showToast("Failed to delete specialization: " + err.message);
  }
}

// --- TAB 3: QR CODE & TEST LINK ---
function initQrCodeTab() {
  const url = (qrUrlInput && qrUrlInput.value) || "https://pumo-aptitude-test.web.app";
  renderQrCode(url);

  if (qrUrlInput) {
    qrUrlInput.addEventListener("input", () => {
      const newUrl = qrUrlInput.value.trim();
      if (newUrl) renderQrCode(newUrl);
    });
  }

  if (copyQrUrlBtn) {
    copyQrUrlBtn.addEventListener("click", async () => {
      const urlToCopy = (qrUrlInput && qrUrlInput.value) || "https://pumo-aptitude-test.web.app";
      try {
        await navigator.clipboard.writeText(urlToCopy);
        showToast("Student Portal URL copied to clipboard!");
      } catch (err) {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = urlToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast("Student Portal URL copied!");
      }
    });
  }

  if (downloadQrBtn) {
    downloadQrBtn.addEventListener("click", () => {
      const container = document.getElementById("qrcodeContainer");
      if (!container) return;
      const canvas = container.querySelector("canvas");
      let dataUrl = "";
      if (canvas) {
        dataUrl = canvas.toDataURL("image/png");
      } else {
        const img = container.querySelector("img");
        if (img) dataUrl = img.src;
      }

      if (!dataUrl) {
        dataUrl = "images/pumo-qr-code.png";
      }

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "pumo-aptitude-test-qr.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("QR code downloaded successfully!");
    });
  }

  if (printPosterBtn) {
    printPosterBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function renderQrCode(url) {
  if (!qrcodeContainer) return;
  qrcodeContainer.innerHTML = "";

  if (typeof QRCode !== "undefined") {
    try {
      qrInstance = new QRCode(qrcodeContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#1e1b4b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (e) {
      console.warn("QRCode constructor warning:", e);
      qrcodeContainer.innerHTML = `<img src="images/pumo-qr-code.png" style="width:200px; height:200px; border-radius:10px;" alt="QR Code">`;
    }
  } else {
    qrcodeContainer.innerHTML = `<img src="images/pumo-qr-code.png" style="width:200px; height:200px; border-radius:10px;" alt="QR Code">`;
  }

  // Update print image & url text
  setTimeout(() => {
    const canvas = qrcodeContainer.querySelector("canvas");
    if (printQrImg) {
      if (canvas) {
        printQrImg.src = canvas.toDataURL("image/png");
      } else {
        printQrImg.src = "images/pumo-qr-code.png";
      }
    }
    if (printQrUrlText) {
      printQrUrlText.textContent = url;
    }
  }, 300);
}

// --- RESOLVE DEPARTMENT TAG FOR FIRESTORE ---
function getCurrentTargetDeptTag() {
  const dept = adminDeptSelect.value;
  const spec = adminSpecSelect.value;

  if (!spec) return dept;

  if (dept === "DA/DS/BA") {
    return `DA/DS/BA - ${spec}`;
  }
  if (dept === "SAP") {
    return `SAP - ${spec}`;
  }
  if (dept === "Python Full Stack") {
    return `Python Full Stack - ${spec}`;
  }
  if (dept === "Java Full Stack") {
    return `Java Full Stack - ${spec}`;
  }
  if (dept === "MECH") {
    return `MECH - ${spec}`;
  }
  if (dept === "UI/UX / Digital Marketing") {
    return "UI/UX";
  }
  if (dept === "General") {
    return "General";
  }
  return `${dept} - ${spec}`;
}

// --- LOAD QUESTIONS ---
async function loadCurrentQuestions() {
  const deptTag = getCurrentTargetDeptTag();
  questionsContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">⏳</div>
      <h3>Loading Questions...</h3>
      <p>Fetching question pool for <strong>${escapeHtml(deptTag)}</strong>...</p>
    </div>
  `;

  try {
    currentQuestions = await getAllDepartmentQuestions(APP_CONFIG.TEST_ID, deptTag);
    renderQuestionsList();
  } catch (err) {
    console.error("Error fetching questions:", err);
    questionsContainer.innerHTML = `
      <div class="empty-state" style="border-color: #fca5a5;">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to Load Questions</h3>
        <p style="color: #dc2626;">${escapeHtml(err.message || "Unknown error")}</p>
        <button class="btn-outline" onclick="location.reload()" style="margin-top: 12px;">Retry</button>
      </div>
    `;
  }
}

// --- RENDER QUESTIONS ---
function renderQuestionsList() {
  const total = currentQuestions.length;
  const includedCount = currentQuestions.filter(q => q.included !== false && q.active !== false).length;

  metricTotalQ.textContent = total;
  metricIncludedQ.textContent = includedCount;

  if (includedCount === 30) {
    metricStatusBadge.className = "status-pill status-ready";
    metricStatusBadge.textContent = "✓ 30 Active (Ready)";
  } else if (includedCount > 30) {
    metricStatusBadge.className = "status-pill status-warning";
    metricStatusBadge.textContent = `⚠️ ${includedCount} Selected (>30)`;
  } else {
    metricStatusBadge.className = "status-pill status-warning";
    metricStatusBadge.textContent = `⚠️ ${includedCount} / 30 Selected`;
  }

  if (total === 0) {
    questionsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3>No Questions in this Specialization</h3>
        <p>No questions found for <strong>${escapeHtml(getCurrentTargetDeptTag())}</strong>.</p>
        <button class="btn-primary" id="emptyStateAddBtn" style="width: auto; margin-top: 14px; padding: 10px 24px;">➕ Add First Question</button>
      </div>
    `;
    const emptyBtn = document.getElementById("emptyStateAddBtn");
    if (emptyBtn) emptyBtn.addEventListener("click", openAddQuestionModal);
    return;
  }

  questionsContainer.innerHTML = "";
  currentQuestions.forEach((q, idx) => {
    const isIncluded = q.included !== false && q.active !== false;
    const card = document.createElement("div");
    card.className = `q-card ${isIncluded ? "" : "is-inactive"}`;
    card.id = `qCard_${q.id}`;

    const letters = ["A", "B", "C", "D"];
    const optionsHtml = (q.options || []).map((opt, optIdx) => {
      const isCorrect = Number(q.correctIndex) === optIdx;
      return `
        <div class="q-opt-box ${isCorrect ? 'is-correct' : ''}">
          <span class="q-opt-letter">${letters[optIdx]}</span>
          <span style="flex: 1;">${escapeHtml(opt)}</span>
          ${isCorrect ? '<span class="correct-tag">✓ Correct</span>' : ''}
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <div class="q-card-top">
        <div class="q-card-left-meta">
          <span class="q-order-badge">Question ${q.order || (idx + 1)}</span>
          
          <label class="include-toggle-wrap" title="Tick to include in student aptitude test">
            <input type="checkbox" class="include-checkbox" data-id="${q.id}" ${isIncluded ? 'checked' : ''}>
            <span class="toggle-text ${isIncluded ? 'toggle-active' : 'toggle-inactive'}">
              ${isIncluded ? '✓ Included in Test' : '✕ Excluded (Hidden)'}
            </span>
          </label>
        </div>

        <div class="q-actions">
          <button class="btn-icon btn-edit" data-id="${q.id}" title="Edit Question">✏️ Edit</button>
          <button class="btn-icon btn-delete" data-id="${q.id}" title="Delete Question">🗑️ Delete</button>
        </div>
      </div>

      <div class="q-text-body">${escapeHtml(q.question)}</div>

      <div class="q-options-container">
        ${optionsHtml}
      </div>
    `;

    // Toggle Inclusion Checkbox Listener
    const checkbox = card.querySelector(".include-checkbox");
    checkbox.addEventListener("change", async (e) => {
      const newStatus = e.target.checked;
      const toggleLabel = card.querySelector(".toggle-text");
      try {
        await toggleQuestionInclusion(APP_CONFIG.TEST_ID, q.id, newStatus);
        q.included = newStatus;
        if (newStatus) {
          card.classList.remove("is-inactive");
          toggleLabel.textContent = "✓ Included in Test";
          toggleLabel.className = "toggle-text toggle-active";
          showToast(`Question ${q.order || (idx + 1)} included in test`);
        } else {
          card.classList.add("is-inactive");
          toggleLabel.textContent = "✕ Excluded (Hidden)";
          toggleLabel.className = "toggle-text toggle-inactive";
          showToast(`Question ${q.order || (idx + 1)} excluded from test`);
        }
        updateMetricsSummary();
      } catch (err) {
        console.error("Toggle error:", err);
        e.target.checked = !newStatus;
        showToast("Error updating question status: " + err.message);
      }
    });

    // Edit Button
    const editBtn = card.querySelector(".btn-edit");
    editBtn.addEventListener("click", () => openEditQuestionModal(q));

    // Delete Button
    const deleteBtn = card.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", () => handleDeleteQuestion(q));

    questionsContainer.appendChild(card);
  });
}

function updateMetricsSummary() {
  const total = currentQuestions.length;
  const includedCount = currentQuestions.filter(q => q.included !== false && q.active !== false).length;
  metricTotalQ.textContent = total;
  metricIncludedQ.textContent = includedCount;

  if (includedCount === 30) {
    metricStatusBadge.className = "status-pill status-ready";
    metricStatusBadge.textContent = "✓ 30 Active (Ready)";
  } else if (includedCount > 30) {
    metricStatusBadge.className = "status-pill status-warning";
    metricStatusBadge.textContent = `⚠️ ${includedCount} Selected (>30)`;
  } else {
    metricStatusBadge.className = "status-pill status-warning";
    metricStatusBadge.textContent = `⚠️ ${includedCount} / 30 Selected`;
  }
}

// --- ADD / EDIT QUESTION MODAL ---
if (openAddQModalBtn) openAddQModalBtn.addEventListener("click", openAddQuestionModal);
if (closeQModalBtn) closeQModalBtn.addEventListener("click", closeQuestionModal);
if (cancelQModalBtn) cancelQModalBtn.addEventListener("click", closeQuestionModal);

function setCorrectChip(index) {
  selectedCorrectIndex = Number(index);
  correctChips.forEach(chip => {
    if (Number(chip.getAttribute("data-index")) === selectedCorrectIndex) {
      chip.classList.add("selected");
    } else {
      chip.classList.remove("selected");
    }
  });
}

correctChips.forEach(chip => {
  chip.addEventListener("click", () => {
    setCorrectChip(chip.getAttribute("data-index"));
  });
});

function openAddQuestionModal() {
  modalTitle.textContent = `Add New Question (${adminDeptSelect.value} - ${adminSpecSelect.value})`;
  editingQuestionId.value = "";
  modalQuestionText.value = "";
  modalOptA.value = "";
  modalOptB.value = "";
  modalOptC.value = "";
  modalOptD.value = "";
  setCorrectChip(0);
  modalIncludedCheckbox.checked = true;
  questionModal.classList.remove("hidden");
  modalQuestionText.focus();
}

function openEditQuestionModal(q) {
  modalTitle.textContent = `Edit Question #${q.order || ""}`;
  editingQuestionId.value = q.id;
  modalQuestionText.value = q.question || "";
  modalOptA.value = (q.options && q.options[0]) || "";
  modalOptB.value = (q.options && q.options[1]) || "";
  modalOptC.value = (q.options && q.options[2]) || "";
  modalOptD.value = (q.options && q.options[3]) || "";
  setCorrectChip(q.correctIndex || 0);
  modalIncludedCheckbox.checked = q.included !== false && q.active !== false;
  questionModal.classList.remove("hidden");
  modalQuestionText.focus();
}

function closeQuestionModal() {
  questionModal.classList.add("hidden");
}

if (saveQuestionBtn) {
  saveQuestionBtn.addEventListener("click", async () => {
    const qText = modalQuestionText.value.trim();
    const optA = modalOptA.value.trim();
    const optB = modalOptB.value.trim();
    const optC = modalOptC.value.trim();
    const optD = modalOptD.value.trim();

    if (!qText) {
      alert("Please enter the question text.");
      return;
    }
    if (!optA || !optB || !optC || !optD) {
      alert("Please fill in all 4 option boxes (A, B, C, and D).");
      return;
    }

    const deptTag = getCurrentTargetDeptTag();
    const isIncluded = modalIncludedCheckbox.checked;
    const qId = editingQuestionId.value;

    saveQuestionBtn.disabled = true;
    saveQuestionBtn.textContent = "Saving...";

    try {
      if (qId) {
        // Update existing question
        const updateData = {
          question: qText,
          options: [optA, optB, optC, optD],
          correctIndex: selectedCorrectIndex,
          included: isIncluded
        };
        await updateQuestion(APP_CONFIG.TEST_ID, qId, updateData);
        showToast("Question updated successfully!");
      } else {
        // Create new question
        const newOrder = currentQuestions.length + 1;
        const newQuestionData = {
          question: qText,
          options: [optA, optB, optC, optD],
          correctIndex: selectedCorrectIndex,
          marks: 1,
          order: newOrder,
          departments: [deptTag],
          included: isIncluded
        };
        await addQuestion(APP_CONFIG.TEST_ID, newQuestionData);
        showToast("New question added to bank!");
      }

      closeQuestionModal();
      await loadCurrentQuestions();
    } catch (err) {
      console.error("Save question error:", err);
      alert("Failed to save question: " + err.message);
    } finally {
      saveQuestionBtn.disabled = false;
      saveQuestionBtn.textContent = "Save Question";
    }
  });
}

// --- DELETE QUESTION ---
async function handleDeleteQuestion(q) {
  const confirmDelete = confirm(`Are you sure you want to delete Question #${q.order || ""}?\n\n"${q.question.substring(0, 60)}..."`);
  if (!confirmDelete) return;

  try {
    await deleteQuestion(APP_CONFIG.TEST_ID, q.id);
    showToast("Question deleted from bank");
    await loadCurrentQuestions();
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete question: " + err.message);
  }
}

// --- ADD SPECIALIZATION MODAL ---
function openAddSpecModal(dept) {
  modalTargetDept = dept || adminDeptSelect.value;
  specModalDeptLabel.textContent = modalTargetDept;
  newSpecInput.value = "";
  specModal.classList.remove("hidden");
  newSpecInput.focus();
}

if (openAddSpecModalBtn) {
  openAddSpecModalBtn.addEventListener("click", () => openAddSpecModal(adminDeptSelect.value));
}

if (closeSpecModalBtn) closeSpecModalBtn.addEventListener("click", closeSpecModal);
if (cancelSpecModalBtn) cancelSpecModalBtn.addEventListener("click", closeSpecModal);

function closeSpecModal() {
  specModal.classList.add("hidden");
}

if (saveSpecBtn) {
  saveSpecBtn.addEventListener("click", async () => {
    const dept = modalTargetDept || adminDeptSelect.value;
    const specName = newSpecInput.value.trim();

    if (!specName) {
      alert("Please enter a specialization name.");
      return;
    }

    saveSpecBtn.disabled = true;
    saveSpecBtn.textContent = "Adding...";

    try {
      await saveSpecialization(APP_CONFIG.TEST_ID, dept, specName);
      await loadSpecializations();
      populateSpecializationDropdown();
      if (adminDeptSelect.value === dept) {
        adminSpecSelect.value = specName;
      }
      renderDepartmentVisibilityGrid();
      closeSpecModal();
      showToast(`Created specialization "${specName}" for ${dept}`);
      if (adminDeptSelect.value === dept) {
        await loadCurrentQuestions();
      }
    } catch (err) {
      console.error("Save specialization error:", err);
      alert("Failed to add specialization: " + err.message);
    } finally {
      saveSpecBtn.disabled = false;
      saveSpecBtn.textContent = "Create Specialization";
    }
  });
}

// --- DELETE SPECIALIZATION (Tab 1) ---
if (deleteSpecBtn) {
  deleteSpecBtn.addEventListener("click", async () => {
    const dept = adminDeptSelect.value;
    const spec = adminSpecSelect.value;

    if (!spec) {
      alert("Please select a specialization to delete.");
      return;
    }

    let confirmMsg = `Are you sure you want to delete the specialization "${spec}" under "${dept}"?\n\nThis will remove it from candidate registration dropdowns.`;
    if (currentQuestions && currentQuestions.length > 0) {
      confirmMsg += `\n\n⚠️ Note: There are currently ${currentQuestions.length} questions associated with this specialization in the question bank.`;
    }

    const confirmed = confirm(confirmMsg);
    if (!confirmed) return;

    deleteSpecBtn.disabled = true;
    deleteSpecBtn.textContent = "Deleting...";

    try {
      await deleteSpecialization(APP_CONFIG.TEST_ID, dept, spec);
      await loadSpecializations();
      populateSpecializationDropdown();
      renderDepartmentVisibilityGrid();
      showToast(`Deleted specialization: "${spec}"`);
      await loadCurrentQuestions();
    } catch (err) {
      console.error("Delete specialization error:", err);
      alert("Failed to delete specialization: " + err.message);
    } finally {
      deleteSpecBtn.disabled = false;
      deleteSpecBtn.textContent = "🗑️ Delete Specialization";
    }
  });
}

// --- LOAD RESULTS (TAB 4) ---
async function loadResults() {
  resultsBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px;">Loading submissions...</td></tr>`;
  try {
    currentResults = await getResults(APP_CONFIG.TEST_ID);
    renderResults();
  } catch (err) {
    console.error("Error loading results:", err);
    resultsBody.innerHTML = `<tr><td colspan="8" style="color: red; text-align: center;">Error loading results: ${err.message}</td></tr>`;
  }
}

function renderResults() {
  resultsCount.textContent = `Total Submissions: ${currentResults.length}`;

  if (currentResults.length === 0) {
    resultsBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: #64748b;">No candidate submissions recorded yet.</td></tr>`;
    return;
  }

  resultsBody.innerHTML = currentResults.map(r => {
    const isPass = r.pass === "PASS" || (Number(r.percentage) >= 50);
    const statusBadge = isPass
      ? `<span class="badge-pass">PASS</span>`
      : `<span class="badge-fail">FAIL</span>`;
    let deptText = r.department || "-";
    if (r.specialization && !deptText.includes(r.specialization)) {
      deptText = `${deptText} (${r.specialization})`;
    }
    const deptBadge = `<span class="badge-dept">${escapeHtml(deptText)}</span>`;

    return `
      <tr>
        <td><strong>${escapeHtml(r.studentName || "-")}</strong></td>
        <td>${escapeHtml(r.studentId || "-")}</td>
        <td>${deptBadge}</td>
        <td>${escapeHtml(r.studentEmail || "-")}</td>
        <td>${r.score ?? 0} / ${r.total ?? 30}</td>
        <td>${r.percentage ?? 0}%</td>
        <td>${statusBadge}</td>
        <td>${escapeHtml(formatDate(r.submittedAt))}</td>
      </tr>
    `;
  }).join("");
}

// --- EXPORT CSV ---
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    if (currentResults.length === 0) {
      alert("No submissions to export.");
      return;
    }

    const header = [
      "Name",
      "Mobile / Student ID",
      "Department",
      "Specialization",
      "Email",
      "Score",
      "Total",
      "Percentage",
      "Status",
      "Submitted At"
    ];

    const rows = currentResults.map(r => {
      const isPass = r.pass === "PASS" || (Number(r.percentage) >= 50);
      return [
        r.studentName || "",
        r.studentId || "",
        r.department || "",
        r.specialization || "-",
        r.studentEmail || "",
        r.score ?? 0,
        r.total ?? 30,
        `${r.percentage ?? 0}%`,
        isPass ? "PASS" : "FAIL",
        formatDate(r.submittedAt)
      ];
    });

    const csvContent = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pumo_assessment_results_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("CSV exported successfully!");
  });
}
