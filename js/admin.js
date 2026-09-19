import { ensureAnonymousLogin, getResults } from "./firebase.js";
import { APP_CONFIG } from "./config.js";
import { formatDate, escapeHtml } from "./common.js";

const loginCard = document.getElementById("loginCard");
const dashboard = document.getElementById("dashboard");
const passwordInput = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("adminMessage");
const body = document.getElementById("resultsBody");
const exportBtn = document.getElementById("exportBtn");
const countEl = document.getElementById("resultsCount");

let results = [];

loginBtn.addEventListener("click", async () => {
  if (passwordInput.value !== APP_CONFIG.ADMIN_PASSWORD) {
    message.textContent = "Invalid password.";
    return;
  }

  if (APP_CONFIG.ADMIN_PASSWORD === "CHANGE_THIS_ADMIN_PASSWORD") {
    message.textContent = "Change ADMIN_PASSWORD in js/config.js before using this dashboard.";
    return;
  }

  try {
    message.textContent = "Loading results...";
    await ensureAnonymousLogin();
    results = await getResults(APP_CONFIG.TEST_ID);
    render();
    loginCard.classList.add("hidden");
    dashboard.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    message.textContent = "Unable to load results. Check Firebase configuration/rules.";
  }
});

function render() {
  if (countEl) {
    countEl.textContent = `Total Submissions: ${results.length}`;
  }

  body.innerHTML = results.map(r => {
    const isPass = r.pass === "PASS" || (Number(r.percentage) >= 50);
    const statusBadge = isPass
      ? `<span class="badge-pass">PASS</span>`
      : `<span class="badge-fail">FAIL</span>`;
    const deptBadge = r.department
      ? `<span class="badge-dept">${escapeHtml(r.department)}</span>`
      : "-";

    return `
      <tr>
        <td><strong>${escapeHtml(r.studentName)}</strong></td>
        <td>${escapeHtml(r.studentId)}</td>
        <td>${deptBadge}</td>
        <td>${escapeHtml(r.studentEmail)}</td>
        <td>${r.score} / ${r.total}</td>
        <td>${r.percentage}%</td>
        <td>${statusBadge}</td>
        <td>${escapeHtml(formatDate(r.submittedAt))}</td>
      </tr>
    `;
  }).join("");
}

exportBtn.addEventListener("click", () => {
  const header = [
    "Name",
    "Mobile / Student ID",
    "Department",
    "Email",
    "Score",
    "Total",
    "Percentage",
    "Status",
    "Submitted At"
  ];

  const rows = results.map(r => {
    const isPass = r.pass === "PASS" || (Number(r.percentage) >= 50);
    return [
      r.studentName,
      r.studentId,
      r.department || "",
      r.studentEmail,
      r.score,
      r.total,
      `${r.percentage}%`,
      isPass ? "PASS" : "FAIL",
      formatDate(r.submittedAt)
    ];
  });

  const csv = [header, ...rows]
    .map(row => row.map(csvEscape).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `aptitude-results-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

function csvEscape(value) {
  const s = String(value ?? "");
  return `"${s.replaceAll('"', '""')}"`;
}
