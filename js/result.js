import { getStudent } from "./common.js";

const student = getStudent();

const result = JSON.parse(
  sessionStorage.getItem("lastResult") || "null"
);

if (!student || !result) {

  location.href = "index.html";

} else {

  document.getElementById("score").textContent =
    `${result.score} / ${result.total}`;

  document.getElementById("percentage").textContent =
    `${result.percentage}%`;

  document.getElementById("passStatus").textContent =
    result.pass === "PASS"
      ? "PASS"
      : "FAIL";

  const doneBtn = document.getElementById("doneBtn");
  const closeMessage = document.getElementById("closeMessage");

  doneBtn.addEventListener("click", () => {

    doneBtn.style.display = "none";

    closeMessage.classList.remove("hidden");

  });
}