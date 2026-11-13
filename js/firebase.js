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
  getDocFromServer,
  onSnapshot,
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

  try {
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

    return snap.docs
      .map(d => ({
        id: d.id,
        ...d.data()
      }))
      .filter(q => q.included !== false && q.active !== false);
  } catch (err) {
    console.warn("getQuestions index notice, using fallback query:", err);
    const fallbackQ = query(
      questionsRef,
      where(
        "departments",
        "array-contains",
        department
      )
    );
    const snap = await getDocs(fallbackQ);
    const docs = snap.docs
      .map(d => ({
        id: d.id,
        ...d.data()
      }))
      .filter(q => q.included !== false && q.active !== false);
    return docs.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  }
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

export const DEFAULT_DEPARTMENTS = [
  "General",
  "SAP",
  "Python Full Stack",
  "Java Full Stack",
  "DA/DS/BA",
  "Embedded",
  "MECH",
  "UI/UX / Digital Marketing",
  "PLC / Automation",
  "HTML / CSS / JavaScript"
];

export const DEFAULT_SPECS = {
  "DA/DS/BA": ["MySQL", "Python"],
  "SAP": ["SAP FICO", "SAP MM"],
  "Python Full Stack": ["Front End", "Back End", "Full Stack"],
  "Java Full Stack": ["Front End", "Back End", "Full Stack"],
  "MECH": ["Creo", "CATIA", "AutoCAD"],
  "UI/UX / Digital Marketing": ["Digital Marketing", "UI/UX Design", "Product Design"],
  "Embedded": ["Embedded Systems"],
  "PLC / Automation": ["PLC / Automation"],
  "HTML / CSS / JavaScript": ["Web Development"],
  "General": [
    "MECH",
    "DA/DS/BA",
    "SAP",
    "Python Full Stack",
    "Java Full Stack",
    "Embedded",
    "PLC / Automation",
    "UI/UX / Digital Marketing",
    "HTML / CSS / JavaScript",
    "ECE / EEE",
    "CSE / IT",
    "Civil",
    "Others"
  ]
};

export async function getSpecializationsConfig(testId) {
  const docRef = doc(db, "tests", testId, "config", "specializations");
  try {
    // Force immediate live fetch directly from Firestore server to bypass cached snapshot
    const snap = await getDocFromServer(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (serverErr) {
    console.warn("getDocFromServer failed, falling back to cached getDoc:", serverErr);
    try {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (err) {
      console.warn("Could not load specializations config:", err);
    }
  }
  return {};
}

// Real-time listener for instant sync
export function listenToSpecializationsConfig(testId, callback) {
  const docRef = doc(db, "tests", testId, "config", "specializations");
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback(snap.data());
      }
    },
    (err) => {
      console.warn("Real-time specializations listener notice:", err);
    }
  );
}

export async function saveSpecialization(testId, department, newSpecName) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  let currentData = {};
  try {
    const snap = await getDocFromServer(specDocRef);
    currentData = snap.exists() ? snap.data() : {};
  } catch {
    const snap = await getDoc(specDocRef);
    currentData = snap.exists() ? snap.data() : {};
  }

  let list = Array.isArray(currentData[department]) ? currentData[department] : [];
  if (!list.includes(newSpecName)) {
    list.push(newSpecName);
  }
  currentData[department] = list;

  // Make sure the department itself is marked visible
  if (!currentData.departmentVisibility) {
    currentData.departmentVisibility = {};
  }
  currentData.departmentVisibility[department] = true;

  // Make sure the new specialization is marked visible by default
  if (!currentData.specializationVisibility) {
    currentData.specializationVisibility = {};
  }
  if (!currentData.specializationVisibility[department]) {
    currentData.specializationVisibility[department] = {};
  }
  currentData.specializationVisibility[department][newSpecName] = true;

  // If this specialization was previously in _deleted, remove it
  if (currentData._deleted && Array.isArray(currentData._deleted[department])) {
    currentData._deleted[department] = currentData._deleted[department].filter(item => item !== newSpecName);
  }

  await setDoc(specDocRef, currentData, { merge: true });
  return currentData;
}

export async function deleteSpecialization(testId, department, specNameToDelete) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  const snap = await getDoc(specDocRef);
  let currentData = snap.exists() ? snap.data() : {};

  // Remove from custom list if present
  let list = Array.isArray(currentData[department]) ? currentData[department] : [];
  currentData[department] = list.filter(item => item !== specNameToDelete);

  // Remove from specializationVisibility
  if (currentData.specializationVisibility && currentData.specializationVisibility[department]) {
    delete currentData.specializationVisibility[department][specNameToDelete];
  }

  // Add to _deleted list so default specializations can also be excluded
  if (!currentData._deleted) {
    currentData._deleted = {};
  }
  if (!Array.isArray(currentData._deleted[department])) {
    currentData._deleted[department] = [];
  }
  if (!currentData._deleted[department].includes(specNameToDelete)) {
    currentData._deleted[department].push(specNameToDelete);
  }

  await setDoc(specDocRef, currentData, { merge: true });
  return currentData;
}

export async function setDepartmentVisibility(testId, department, isVisible) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  const snap = await getDoc(specDocRef);
  let currentData = snap.exists() ? snap.data() : {};
  if (!currentData.departmentVisibility) {
    currentData.departmentVisibility = {};
  }
  currentData.departmentVisibility[department] = Boolean(isVisible);
  await setDoc(specDocRef, currentData, { merge: true });
  return currentData;
}

export async function setSpecializationVisibility(testId, department, specName, isVisible) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  const snap = await getDoc(specDocRef);
  let currentData = snap.exists() ? snap.data() : {};
  if (!currentData.specializationVisibility) {
    currentData.specializationVisibility = {};
  }
  if (!currentData.specializationVisibility[department]) {
    currentData.specializationVisibility[department] = {};
  }
  currentData.specializationVisibility[department][specName] = Boolean(isVisible);
  await setDoc(specDocRef, currentData, { merge: true });
  return currentData;
}

export async function saveFullVisibilityConfig(testId, deptVisibility, specVisibility) {
  const specDocRef = doc(db, "tests", testId, "config", "specializations");
  await setDoc(specDocRef, {
    departmentVisibility: deptVisibility,
    specializationVisibility: specVisibility
  }, { merge: true });
}
