from pathlib import Path
import firebase_admin
from firebase_admin import credentials, firestore

TEST_ID = "aptitude-test-01"
PROJECT_FOLDER = Path(__file__).resolve().parent.parent
SERVICE_ACCOUNT_FILE = PROJECT_FOLDER / "serviceAccountKey.json"

if not firebase_admin._apps:
    cred = credentials.Certificate(str(SERVICE_ACCOUNT_FILE))
    firebase_admin.initialize_app(cred)

db = firestore.client()

def upload_questions(questions, default_department=None):
    questions_ref = db.collection("tests").document(TEST_ID).collection("questions")

    print()
    print("=" * 60)
    print("Uploading questions...")
    print("=" * 60)

    uploaded = 0
    for q in questions:
        depts = q.get("departments", [])
        if not depts and default_department:
            depts = [default_department]

        if not depts:
            print(f"Skipping '{q.get('question')}': No departments specified.")
            continue

        doc_data = {
            "question": q["question"],
            "options": q["options"],
            "correctIndex": int(q["correctIndex"]),
            "marks": int(q.get("marks", 1)),
            "order": int(q.get("order", 1)),
            "departments": depts
        }

        questions_ref.add(doc_data)
        uploaded += 1
        print(f"[{doc_data['order']:02d}] Uploaded: {q['question'][:50]}... -> {', '.join(depts)}")

    print("=" * 60)
    print(f"Successfully uploaded {uploaded} questions.")
    print("=" * 60)