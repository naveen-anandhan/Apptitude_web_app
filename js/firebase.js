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