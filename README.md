# Free Aptitude Test Website

A simple MCQ aptitude-test website with:
- Student name, ID and email
- 4-option multiple-choice questions
- Countdown timer
- Previous/Next navigation
- Automatic score calculation
- Firebase Firestore result storage
- Optional email result through Google Apps Script
- Simple admin dashboard
- CSV export

## Architecture

Student Browser
  -> Firebase Authentication (anonymous)
  -> Firestore (questions + results)
  -> Google Apps Script (optional email sending)

The frontend can be hosted on GitHub Pages.

## Important security note

This starter project is intended for an internal/student assessment and uses Firebase anonymous authentication plus Firestore rules. Before production use, review the rules and add stronger admin authentication.

Never put a Gmail password or service-account private key in frontend JavaScript.

---

# 1. Create Firebase

1. Open Firebase Console: https://console.firebase.google.com/
2. Create a project.
3. Add a Web App.
4. Copy the Firebase configuration.
5. Enable Authentication -> Sign-in method -> Anonymous.
6. Create Firestore Database.
7. Put the values from your Firebase config into `js/firebase-config.js`.

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 2. Firestore data

Create a collection named `tests`.

Create document:

`aptitude-test-01`

Fields:

```text
title: "Aptitude Test 1"
durationMinutes: 20
active: true
```

Create a subcollection:

`tests/aptitude-test-01/questions`

Add question documents with:

```text
question: "What is 15% of 200?"
options: ["15", "20", "30", "40"]
correctIndex: 2
marks: 1
```

Add more questions in the same format.

## 3. Firestore rules

Copy `firestore.rules` into Firebase Console -> Firestore -> Rules.

This starter rule lets authenticated students read tests/questions and create result documents, but does not let students update/delete results.

## 4. Email results (optional)

The easiest free-ish setup for an internal project is Google Apps Script.

1. Go to https://script.google.com/
2. Create a new project.
3. Copy the contents of `email-service/Code.gs`.
4. Deploy -> New deployment -> Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Copy the Web App URL.
8. Put it into `js/config.js` as `EMAIL_SERVICE_URL`.

The script sends the student's score using the Gmail account that owns the Apps Script.

Google/Gmail quotas apply, so this is suitable for modest internal test volumes, not bulk marketing.

## 5. Run locally

Because browsers can block modules when opening `index.html` directly, use a local server.

If Python is installed:

```bash
python -m http.server 5500
```

Then open:

http://localhost:5500

VS Code users can also use the Live Server extension.

## 6. GitHub Pages

1. Create a GitHub repository.
2. Upload all files.
3. Enable Settings -> Pages.
4. Select the branch/folder.
5. Open the generated GitHub Pages URL.

Add the GitHub Pages domain to Firebase Authentication -> Settings -> Authorized domains.

## 7. Admin dashboard

Open:

`admin.html`

Change the admin password in `js/config.js` before using it.

Important: this is a simple UI gate, NOT secure authentication. For a real production system, replace it with Firebase Authentication + custom claims or another proper admin-authentication mechanism.

## 8. Customizing questions

Edit `seed-questions.json`, or add questions directly in Firestore.

Do not put correct answers in the browser's HTML. The correct answer is fetched from Firestore in this starter. For a high-stakes exam, a more secure server-side grading architecture is recommended because any client-side application can be inspected.

## 9. Project structure

```text
aptitude-test-website/
├── index.html
├── test.html
├── result.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── firebase-config.js
│   ├── firebase.js
│   ├── common.js
│   ├── index.js
│   ├── test.js
│   ├── result.js
│   └── admin.js
├── email-service/
│   └── Code.gs
├── firestore.rules
├── seed-questions.json
└── README.md
```
