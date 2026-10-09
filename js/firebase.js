import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);


export async function ensureAnonymousLogin() {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  const credential =
    await signInAnonymously(auth);

  return credential.user;
}


export async function getTest(testId) {
  const snap =
    await getDoc(
      doc(db, "tests", testId)
    );

  if (!snap.exists()) {
    throw new Error("Test not found.");
  }

  return {
    id: snap.id,
    ...snap.data()
  };
}


export async function getQuestions(
  testId,
  department
) {
  const questionsRef =
    collection(
      db,
      "tests",
      testId,
      "questions"
    );

  const q = query(
    questionsRef,
    where(
      "departments",
      "array-contains",
      department
    ),
    orderBy("order")
  );

  const snap =
    await getDocs(q);

  return snap.docs.map(
    d => ({
      id: d.id,
      ...d.data()
    })
  );
}


export async function saveResult(
  testId,
  result
) {
  const ref =
    await addDoc(
      collection(
        db,
        "tests",
        testId,
        "results"
      ),
      result
    );

  return ref.id;
}


export async function getResults(testId) {
  const q =
    query(
      collection(
        db,
        "tests",
        testId,
        "results"
      ),
      orderBy(
        "submittedAt",
        "desc"
      )
    );

  const snap =
    await getDocs(q);

  return snap.docs.map(
    d => ({
      id: d.id,
      ...d.data()
    })
  );
}


// --- ADMIN QUESTION MANAGEMENT & CONFIG HELPERS ---

export async function addQuestion(testId, questionData) {
  const ref = await addDoc(
    collection(db, "tests", testId, "questions"),
    questionData
  );
  return ref.id;
}

export async function updateQuestion(testId, questionId, questionData) {
  await updateDoc(
    doc(db, "tests", testId, "questions", questionId),
    questionData
  );
}

export async function deleteQuestion(testId, questionId) {
  await deleteDoc(
    doc(db, "tests", testId, "questions", questionId)
  );
}

export async function toggleQuestionInclusion(testId, questionId, included) {
  await updateDoc(
    doc(db, "tests", testId, "questions", questionId),
    { included: Boolean(included) }
  );
}

export async function getAllDepartmentQuestions(testId, department) {
  const questionsRef = collection(db, "tests", testId, "questions");
  try {
    const q = query(
      questionsRef,
      where("departments", "array-contains", department),
      orderBy("order")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  } catch (err) {
    console.warn("Index query notice, using array-contains and client sort:", err);
    const fallbackQ = query(
      questionsRef,
      where("departments", "array-contains", department)
    );
    const snap = await getDocs(fallbackQ);
    const docs = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    return docs.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  }
}

export async function getSpecializationsConfig(testId) {
  try {
    const snap = await getDoc(
      doc(db, "tests", testId, "config", "specializations")
    );
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn("Could not load specializations config:", err);
  }
  return {};
}

export async function saveSpecialization(testId, department, newSpecName) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  const snap = await getDoc(specDocRef);
  let currentData = snap.exists() ? snap.data() : {};
  let list = Array.isArray(currentData[department]) ? currentData[department] : [];
  if (!list.includes(newSpecName)) {
    list.push(newSpecName);
  }
  currentData[department] = list;
  await setDoc(specDocRef, currentData, { merge: true });
  return currentData;
}