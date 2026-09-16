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
  body.innerHTML = results.map(r => `
    <tr>
      <td>${escapeHtml(r.studentName)}</td>
      <td>${escapeHtml(r.studentId)}</td>
      <td>${escapeHtml(r.studentEmail)}</td>
      <td>${r.score} / ${r.total}</td>
      <td>${r.percentage}%</td>
      <td>${escapeHtml(formatDate(r.submittedAt))}</td>
    </tr>
  `).join("");
}

exportBtn.addEventListener("click", () => {
  const header = ["Name", "Student ID", "Email", "Score", "Total", "Percentage", "Submitted"];
  const rows = results.map(r => [
    r.studentName, r.studentId, r.studentEmail,
    r.score, r.total, r.percentage, formatDate(r.submittedAt)
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(csvEscape).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aptitude-results.csv";
  a.click();
  URL.revokeObjectURL(url);
});

function csvEscape(value) {
  const s = String(value ?? "");
  return `"${s.replaceAll('"', '""')}"`;
}
