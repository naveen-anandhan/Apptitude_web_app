import { getStudent } from "./common.js";

const student = getStudent();
const result = JSON.parse(
  sessionStorage.getItem("lastResult") || "null"
);

if (!student || !result) {
  location.href = "index.html";
} else {
  // Elements
  const resultHeading = document.getElementById("resultHeading");
  const candidateName = document.getElementById("candidateName");
  const candidateDept = document.getElementById("candidateDept");

  const scoreEl = document.getElementById("score");
  const percentageEl = document.getElementById("percentage");
  const correctCountEl = document.getElementById("correctCount");
  const wrongCountEl = document.getElementById("wrongCount");

  const statusBanner = document.getElementById("statusBanner");
  const passStatus = document.getElementById("passStatus");

  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const doneBtn = document.getElementById("doneBtn");
  const closeMessage = document.getElementById("closeMessage");

  const tabWrong = document.getElementById("tabWrong");
  const tabAll = document.getElementById("tabAll");
  const tabWrongCount = document.getElementById("tabWrongCount");
  const tabTotalCount = document.getElementById("tabTotalCount");
  const reviewList = document.getElementById("reviewList");

  // Populate Student & Scores
  const sName = student.name || result.studentName || "Candidate";
  const sDept = student.department || result.department || "General";
  const sSpec = student.specialization || result.specialization || "";
  const sId = student.studentId || result.studentId || "--";

  let displayDept = sDept;
  if (sSpec && !sDept.includes(sSpec)) {
    displayDept = `${sDept} (${sSpec})`;
  }

  if (candidateName) candidateName.textContent = sName;
  if (candidateDept) candidateDept.textContent = displayDept;
  if (resultHeading) {
    resultHeading.textContent = result.pass === "PASS" ? `Great Job, ${sName}!` : `Thank You, ${sName}!`;
  }

  const total = Number(result.total ?? 30);
  const score = Number(result.score ?? 0);
  const percentage = result.percentage ?? (total ? Math.round((score / total) * 100) : 0);

  const reviews = Array.isArray(result.questionsReview) ? result.questionsReview : [];
  const correctCount = Number(result.correctCount ?? reviews.filter(r => r.isCorrect).length);
  const wrongCount = Number(result.wrongCount ?? (reviews.length ? reviews.length - correctCount : 0));

  scoreEl.textContent = `${score} / ${total}`;
  percentageEl.textContent = `${percentage}%`;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;

  tabWrongCount.textContent = wrongCount;
  tabTotalCount.textContent = reviews.length || total;

  if (result.pass === "PASS") {
    statusBanner.className = "status-banner pass";
    passStatus.textContent = "ASSESSMENT STATUS: PASSED ✓";
  } else {
    statusBanner.className = "status-banner fail";
    passStatus.textContent = "ASSESSMENT STATUS: NEEDS IMPROVEMENT";
  }

  // Done button toggle
  doneBtn.addEventListener("click", () => {
    doneBtn.style.display = "none";
    closeMessage.classList.remove("hidden");
  });

  // Render question reviews
  let currentFilter = wrongCount > 0 ? "wrong" : "all";
  if (currentFilter === "all") {
    tabWrong.classList.remove("active");
    tabAll.classList.add("active");
  }

  function renderReviews() {
    reviewList.innerHTML = "";

    const listToShow = currentFilter === "wrong"
      ? reviews.filter(r => !r.isCorrect)
      : reviews;

    if (listToShow.length === 0) {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "empty-state";
      if (currentFilter === "wrong") {
        emptyDiv.innerHTML = `
          <div class="empty-state-icon">🎉</div>
          <h3>Outstanding Performance!</h3>
          <p>You answered all questions correctly. No incorrect questions to review.</p>
        `;
      } else {
        emptyDiv.innerHTML = `
          <p>No questions found in this assessment review.</p>
        `;
      }
      reviewList.appendChild(emptyDiv);
      return;
    }

    listToShow.forEach(item => {
      const card = document.createElement("div");
      card.className = `review-card ${item.isCorrect ? "card-is-correct" : "card-is-wrong"}`;

      let badgeHtml = "";
      if (item.isCorrect) {
        badgeHtml = `<span class="q-badge badge-correct">✓ Correct</span>`;
      } else if (item.selectedIdx === null) {
        badgeHtml = `<span class="q-badge badge-unanswered">⚠️ Not Answered</span>`;
      } else {
        badgeHtml = `<span class="q-badge badge-wrong">✗ Incorrect</span>`;
      }

      let comparisonHtml = "";
      if (item.isCorrect) {
        comparisonHtml = `
          <div class="ans-comparison">
            <div class="ans-row student-correct">
              <span class="ans-label">Your Answer:</span>
              <span class="ans-val">${escapeHtml(item.selectedText || "")} (Correct ✓)</span>
            </div>
          </div>
        `;
      } else if (item.selectedIdx === null) {
        comparisonHtml = `
          <div class="ans-comparison">
            <div class="ans-row student-wrong">
              <span class="ans-label">Your Answer:</span>
              <span class="ans-val">Not Answered (Skipped)</span>
            </div>
            <div class="ans-row correct-solution">
              <span class="ans-label">Correct Solution:</span>
              <span class="ans-val">Ans : ${escapeHtml(item.correctText || "")}</span>
            </div>
          </div>
        `;
      } else {
        comparisonHtml = `
          <div class="ans-comparison">
            <div class="ans-row student-wrong">
              <span class="ans-label">Your Answer:</span>
              <span class="ans-val">${escapeHtml(item.selectedText || "")} ❌</span>
            </div>
            <div class="ans-row correct-solution">
              <span class="ans-label">Correct Solution:</span>
              <span class="ans-val">Ans : ${escapeHtml(item.correctText || "")}</span>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="review-card-top">
          <span class="q-number">Question ${item.order}</span>
          ${badgeHtml}
        </div>
        <div class="q-text">${escapeHtml(item.question)}</div>
        ${comparisonHtml}
      `;

      reviewList.appendChild(card);
    });
  }

  // Filter tab events
  tabWrong.addEventListener("click", () => {
    currentFilter = "wrong";
    tabWrong.classList.add("active");
    tabAll.classList.remove("active");
    renderReviews();
  });

  tabAll.addEventListener("click", () => {
    currentFilter = "all";
    tabAll.classList.add("active");
    tabWrong.classList.remove("active");
    renderReviews();
  });

  // Initial render
  renderReviews();

  // Populate PDF Template data
  function preparePdfTemplate() {
    document.getElementById("pdfName").textContent = sName;
    document.getElementById("pdfId").textContent = sId;
    document.getElementById("pdfDept").textContent = displayDept;
    document.getElementById("pdfDate").textContent = new Date().toLocaleString();
    document.getElementById("pdfStatus").textContent = result.pass === "PASS" ? "PASS ✓" : "FAIL ✗";
    document.getElementById("pdfStatus").style.color = result.pass === "PASS" ? "#16a34a" : "#dc2626";
    document.getElementById("pdfScore").textContent = `${score} / ${total}`;

    document.getElementById("pdfTotalQ").textContent = reviews.length || total;
    document.getElementById("pdfCorrectQ").textContent = correctCount;
    document.getElementById("pdfWrongQ").textContent = wrongCount;
    document.getElementById("pdfPercentQ").textContent = `${percentage}%`;

    const pdfWrongSection = document.getElementById("pdfWrongSection");
    const pdfWrongList = document.getElementById("pdfWrongList");
    const pdfAllList = document.getElementById("pdfAllList");

    pdfWrongList.innerHTML = "";
    pdfAllList.innerHTML = "";

    const wrongQuestions = reviews.filter(r => !r.isCorrect);
    if (wrongQuestions.length === 0) {
      pdfWrongSection.style.display = "none";
    } else {
      pdfWrongSection.style.display = "block";
      wrongQuestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "pdf-q-item wrong";
        div.innerHTML = `
          <div class="pdf-q-title">Q${item.order}. ${escapeHtml(item.question)}</div>
          <div class="pdf-ans-line" style="color: #dc2626;"><strong>Your Answer:</strong> ${escapeHtml(item.selectedText || "Not Answered")} (Incorrect)</div>
          <div class="pdf-ans-line" style="color: #065f46;"><strong>Correct Answer:</strong> Ans : ${escapeHtml(item.correctText)}</div>
        `;
        pdfWrongList.appendChild(div);
      });
    }

    reviews.forEach(item => {
      const div = document.createElement("div");
      div.className = `pdf-q-item ${item.isCorrect ? "correct" : "wrong"}`;
      div.innerHTML = `
        <div class="pdf-q-title">
          Q${item.order}. ${escapeHtml(item.question)}
          <span style="font-weight: bold; color: ${item.isCorrect ? '#16a34a' : '#dc2626'}; float: right;">
            ${item.isCorrect ? "✓ Correct" : "✗ Incorrect"}
          </span>
        </div>
        <div class="pdf-ans-line"><strong>Candidate Answer:</strong> ${escapeHtml(item.selectedText || "Not Answered")}</div>
        <div class="pdf-ans-line"><strong>Ans:</strong> ${escapeHtml(item.correctText)}</div>
      `;
      pdfAllList.appendChild(div);
    });
  }

  // PDF Download Trigger
  downloadPdfBtn.addEventListener("click", async () => {
    downloadPdfBtn.disabled = true;
    const originalText = downloadPdfBtn.innerHTML;
    downloadPdfBtn.innerHTML = `<span>⏳ Generating PDF...</span>`;

    try {
      preparePdfTemplate();

      const template = document.getElementById("pdfReportTemplate");
      template.style.display = "block";

      const safeFileName = `PUMO_Assessment_Report_${sName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: safeFileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      if (window.html2pdf) {
        await window.html2pdf().set(opt).from(template).save();
      } else {
        // Fallback to browser print dialog
        window.print();
      }
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Unable to generate PDF automatically. Opening print view instead.");
      window.print();
    } finally {
      const template = document.getElementById("pdfReportTemplate");
      template.style.display = "none";
      downloadPdfBtn.disabled = false;
      downloadPdfBtn.innerHTML = originalText;
    }
  });

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}