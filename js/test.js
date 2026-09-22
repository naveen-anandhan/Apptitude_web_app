import {
  ensureAnonymousLogin,
  getTest,
  getQuestions,
  saveResult
} from "./firebase.js";

import { APP_CONFIG } from "./config.js";

import { getStudent } from "./common.js";


const student = getStudent();

if (!student) {

  location.href = "index.html";

}


let test;

let questions = [];

let answers = {};

let current = 0;

let remainingSeconds = 0;

let timerInterval = null;

let submitting = false;


const titleEl =
  document.getElementById("testTitle");

const studentInfo =
  document.getElementById("studentInfo");

const questionNumber =
  document.getElementById("questionNumber");

const progressText =
  document.getElementById("progressText");

const progressBar =
  document.getElementById("progressBar");

const questionText =
  document.getElementById("questionText");

const optionsEl =
  document.getElementById("options");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const submitBtn =
  document.getElementById("submitBtn");

const timerEl =
  document.getElementById("timer");

const messageEl =
  document.getElementById("testMessage");


async function init() {

  try {

    await ensureAnonymousLogin();

    test =
      await getTest(
        APP_CONFIG.TEST_ID
      );


    questions =
      await getQuestions(
        APP_CONFIG.TEST_ID,
        student.department
      );


    if (!questions.length) {

      throw new Error(
        "No questions found."
      );

    }


    titleEl.textContent =
      test.title || "Aptitude Test";


    studentInfo.textContent =
      `${student.name} • ${student.studentId} • ${student.department}`;


    answers =
      JSON.parse(
        sessionStorage.getItem("answers") || "{}"
      );


    const startedAt =
      Number(
        sessionStorage.getItem("testStart")
      );


    if (startedAt) {

      remainingSeconds =
        Math.max(
          0,
          (test.durationMinutes * 60) -
          Math.floor(
            (Date.now() - startedAt) / 1000
          )
        );

    } else {

      sessionStorage.setItem(
        "testStart",
        String(Date.now())
      );


      remainingSeconds =
        test.durationMinutes * 60;

    }


    render();

    startTimer();


  } catch (error) {

    console.error(error);

    messageEl.textContent =
      error.message ||
      "Unable to load test.";

  }

}


function render() {

  const q =
    questions[current];


  questionNumber.textContent =
    `Question ${current + 1} of ${questions.length}`;


  progressText.textContent =
    `${Math.round(
      ((current + 1) / questions.length) * 100
    )}%`;


  progressBar.style.width =
    `${((current + 1) / questions.length) * 100}%`;


  questionText.textContent =
    q.question;


  optionsEl.innerHTML = "";


  q.options.forEach(
    (option, index) => {

      const div =
        document.createElement("div");


      div.className =
        "option" +
        (
          answers[q.id] === index
            ? " selected"
            : ""
        );


      div.textContent =
        `${String.fromCharCode(65 + index)}. ${option}`;


      div.addEventListener(
        "click",
        () => {

          answers[q.id] =
            index;


          sessionStorage.setItem(
            "answers",
            JSON.stringify(answers)
          );


          render();

        }
      );


      optionsEl.appendChild(div);

    }
  );


  prevBtn.disabled =
    current === 0;


  nextBtn.classList.toggle(
    "hidden",
    current === questions.length - 1
  );


  submitBtn.classList.toggle(
    "hidden",
    current !== questions.length - 1
  );

}


function startTimer() {

  updateTimer();


  timerInterval =
    setInterval(
      () => {

        remainingSeconds--;

        updateTimer();


        if (remainingSeconds <= 0) {

          clearInterval(
            timerInterval
          );


          submitTest(true);

        }

      },
      1000
    );

}


function updateTimer() {

  const min =
    Math.floor(
      remainingSeconds / 60
    );


  const sec =
    remainingSeconds % 60;


  timerEl.textContent =
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

}


prevBtn.addEventListener(
  "click",
  () => {

    if (current > 0) {

      current--;

      render();

    }

  }
);


nextBtn.addEventListener(
  "click",
  () => {

    if (
      current <
      questions.length - 1
    ) {

      current++;

      render();

    }

  }
);


submitBtn.addEventListener(
  "click",
  () => submitTest(false)
);


async function submitTest(autoSubmitted) {

  if (submitting) return;


  submitting = true;


  clearInterval(
    timerInterval
  );


  // Show that the Submit Test button was clicked
  if (!autoSubmitted) {

    submitBtn.textContent =
      "✓ Submitting...";


    submitBtn.style.background =
      "#16a34a";


    submitBtn.style.color =
      "white";

  }


  submitBtn.disabled = true;

  nextBtn.disabled = true;

  prevBtn.disabled = true;


  let score = 0;
  let total = 0;

  const questionsReview = questions.map((q, index) => {
    const marks = Number(q.marks ?? 1);
    total += marks;

    const selectedIdx = answers[q.id];
    const correctIdx = Number(q.correctIndex);
    const isAnswered = selectedIdx !== undefined && selectedIdx !== null;
    const isCorrect = isAnswered && selectedIdx === correctIdx;

    if (isCorrect) {
      score += marks;
    }

    return {
      order: Number(q.order ?? (index + 1)),
      question: q.question,
      options: q.options,
      selectedIdx: isAnswered ? selectedIdx : null,
      selectedText: isAnswered ? q.options[selectedIdx] : null,
      correctIdx: correctIdx,
      correctText: q.options[correctIdx],
      isCorrect: isCorrect,
      marks: marks
    };
  });

  const correctCount = questionsReview.filter(r => r.isCorrect).length;
  const wrongCount = questionsReview.length - correctCount;

  const percentage =
    total
      ? Math.round(
          (score / total) * 10000
        ) / 100
      : 0;

  // 50% or above = PASS
  const pass =
    percentage >= 50
      ? "PASS"
      : "FAIL";

  const result = {
    studentName:
      student.name,
    studentId:
      student.studentId,
    department:
      student.department,
    specialization:
      student.specialization || "",
    studentEmail:
      student.email,
    score,
    total,
    percentage,
    pass,
    correctCount,
    wrongCount,
    questionsReview,
    autoSubmitted,
    submittedAt:
      new Date().toISOString()
  };


  try {

    // Save result in Firebase
    // We wait for this because Firebase is the main result database.
    await saveResult(
      APP_CONFIG.TEST_ID,
      result
    );


    // Send result to Google Sheets in the background.
    // We do NOT wait for this, so the result page opens faster.
    // Send result to Google Sheets
    if (APP_CONFIG.EMAIL_SERVICE_URL) {

      // Map MECH specializations (Creo / CATIA) to 'MECH' for Google Sheet tab compatibility
      let sheetDept = student.department || "";
      let specialization = student.specialization || "";
      if (sheetDept.includes("MECH")) {
        sheetDept = "MECH";
        if (!specialization && student.department.includes(" - ")) {
          specialization = student.department.replace("MECH - ", "").trim();
        }
      }

      const sheetData =
        JSON.stringify({

          studentName:
            student.name,

          phoneNumber:
            student.studentId,

          department:
            sheetDept,

          specialization:
            specialization,

          email:
            student.email,

          score:
            `${score}/${total}`,

          pass:
            pass

        });


      try {

        // Use await fetch to ensure the Google Sheet request finishes before leaving the page
        await fetch(
          APP_CONFIG.EMAIL_SERVICE_URL,
          {
            method: "POST",

            mode: "no-cors",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },

            body:
              sheetData
          }
        );

      } catch (sheetError) {

        console.error(
          "Google Sheet error:",
          sheetError
        );

      }

    }


    sessionStorage.setItem(
      "lastResult",
      JSON.stringify(result)
    );


    sessionStorage.removeItem(
      "answers"
    );


    sessionStorage.removeItem(
      "testStart"
    );


    // Open result page immediately.
    location.href =
      "result.html";


  } catch (error) {

    console.error(error);


    messageEl.textContent =
      "Could not submit your result. Please contact the administrator.";


    submitting = false;


    // Restore Submit Test button if submission fails
    submitBtn.textContent =
      "Submit Test";


    submitBtn.style.background =
      "";


    submitBtn.style.color =
      "";


    submitBtn.disabled =
      false;


    nextBtn.disabled =
      false;


    prevBtn.disabled =
      false;

  }

}


init();