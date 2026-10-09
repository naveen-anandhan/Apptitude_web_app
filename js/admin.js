import {
  ensureAnonymousLogin,
  getResults,
  getAllDepartmentQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  toggleQuestionInclusion,
  getSpecializationsConfig,
  saveSpecialization
} from "./firebase.js?v=2.0";

import { APP_CONFIG } from "./config.js?v=2.0";
import { formatDate, escapeHtml } from "./common.js";

// --- DOM ELEMENTS ---
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const usernameInput = document.getElementById("adminUsername");
const passwordInput = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");
const adminMessage = document.getElementById("adminMessage");
const logoutBtn = document.getElementById("logoutBtn");

const tabQuestionsBtn = document.getElementById("tabQuestionsBtn");
const tabResultsBtn = document.getElementById("tabResultsBtn");
const tabQuestions = document.getElementById("tabQuestions");
const tabResults = document.getElementById("tabResults");

const adminDeptSelect = document.getElementById("adminDeptSelect");
const adminSpecSelect = document.getElementById("adminSpecSelect");
const openAddSpecModalBtn = document.getElementById("openAddSpecModalBtn");
const openAddQModalBtn = document.getElementById("openAddQModalBtn");

const metricTotalQ = document.getElementById("metricTotalQ");
const metricIncludedQ = document.getElementById("metricIncludedQ");
const metricStatusBadge = document.getElementById("metricStatusBadge");
const questionsContainer = document.getElementById("questionsContainer");

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

// Default department-to-specializations map
const DEFAULT_SPECS = {
  "DA/DS/BA": ["MySQL", "Python"],
  "SAP": ["SAP FICO", "SAP MM"],
  "Python Full Stack": ["Front End", "Back End", "Full Stack"],
  "Java Full Stack": ["Front End", "Back End", "Full Stack"],
  "MECH": ["Creo", "CATIA", "AutoCAD"],
  "UI/UX / Digital Marketing": ["Digital Marketing", "UI/UX Design", "Product Design"],
  "Embedded": ["Embedded Systems"],
  "PLC / Automation": ["PLC / Automation"],
  "HTML / CSS / JavaScript": ["Web Development"],
  "General": ["Quantitative & Logical"]
};

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
loginBtn.addEventListener("click", handleLogin);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});

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

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("pumo_admin_session");
  loginSection.classList.remove("hidden");
  dashboardSection.classList.add("hidden");
  usernameInput.value = "";
  passwordInput.value = "";
  showToast("Logged out successfully");
});

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
tabQuestionsBtn.addEventListener("click", () => {
  tabQuestionsBtn.classList.add("active");
  tabResultsBtn.classList.remove("active");
  tabQuestions.classList.remove("hidden");
  tabResults.classList.add("hidden");
});

tabResultsBtn.addEventListener("click", async () => {
  tabResultsBtn.classList.add("active");
  tabQuestionsBtn.classList.remove("active");
  tabResults.classList.remove("hidden");
  tabQuestions.classList.add("hidden");
  await loadResults();
});

// --- DASHBOARD INITIALIZATION ---
async function initDashboard() {
  await loadSpecializations();
  populateSpecializationDropdown();
  await loadCurrentQuestions();
}

async function loadSpecializations() {
  try {
    customSpecs = await getSpecializationsConfig(APP_CONFIG.TEST_ID);
  } catch (err) {
    console.warn("Could not load custom specs:", err);
    customSpecs = {};
  }
}

function getSpecializationsForDept(dept) {
  const defaults = DEFAULT_SPECS[dept] || [dept];
  const custom = (customSpecs && Array.isArray(customSpecs[dept])) ? customSpecs[dept] : [];
  const merged = [...defaults];
  custom.forEach(c => {
    if (!merged.includes(c)) merged.push(c);
  });
  return merged;
}

function populateSpecializationDropdown() {
  const dept = adminDeptSelect.value;
  const specs = getSpecializationsForDept(dept);
  adminSpecSelect.innerHTML = "";
  specs.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    adminSpecSelect.appendChild(opt);
  });
}

adminDeptSelect.addEventListener("change", async () => {
  populateSpecializationDropdown();
  await loadCurrentQuestions();
});

adminSpecSelect.addEventListener("change", async () => {
  await loadCurrentQuestions();
});

// --- RESOLVE DEPARTMENT TAG FOR FIRESTORE ---
function getCurrentTargetDeptTag() {
  const dept = adminDeptSelect.value;
  const spec = adminSpecSelect.value;

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
        e.target.checked = !newStatus; // Revert
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
openAddQModalBtn.addEventListener("click", openAddQuestionModal);
closeQModalBtn.addEventListener("click", closeQuestionModal);
cancelQModalBtn.addEventListener("click", closeQuestionModal);

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
openAddSpecModalBtn.addEventListener("click", () => {
  const dept = adminDeptSelect.value;
  specModalDeptLabel.textContent = dept;
  newSpecInput.value = "";
  specModal.classList.remove("hidden");
  newSpecInput.focus();
});

closeSpecModalBtn.addEventListener("click", closeSpecModal);
cancelSpecModalBtn.addEventListener("click", closeSpecModal);

function closeSpecModal() {
  specModal.classList.add("hidden");
}

saveSpecBtn.addEventListener("click", async () => {
  const dept = adminDeptSelect.value;
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
    adminSpecSelect.value = specName;
    closeSpecModal();
    showToast(`Created specialization: "${specName}"`);
    await loadCurrentQuestions();
  } catch (err) {
    console.error("Save specialization error:", err);
    alert("Failed to add specialization: " + err.message);
  } finally {
    saveSpecBtn.disabled = false;
    saveSpecBtn.textContent = "Create Specialization";
  }
});

// --- LOAD RESULTS (TAB 2) ---
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
